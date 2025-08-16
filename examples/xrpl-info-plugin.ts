// examples/xrpl-info-plugin.ts
import { BasePlugin } from '../src/plugins';
import type { GenericPluginContext, HederaTool } from '../src/plugins';
import { z } from 'zod';
import {
  BaseHederaQueryTool,
  BaseHederaQueryToolParams,
} from '../src/langchain/tools/common/base-hedera-query-tool';
import { HederaAgentKit } from '../src/agent/agent';
import fs from 'fs';
import path from 'path';

function loadCorpusFromMarkdown(filePath: string): Section[] {
  const raw = fs.readFileSync(filePath, 'utf-8');
  const sections: Section[] = [];

  // Split on level-1 headers (# Title)
  const blocks = raw
    .split(/\n(?=# )/g)
    .map((b) => b.trim())
    .filter(Boolean);

  for (const block of blocks) {
    const lines = block.split('\n');
    const titleLine = lines[0].replace(/^#\s+/, '').trim();

    let id = '';
    let keywords: string[] = [];
    let bodyStart = 1;

    // parse up to 5 meta lines like: id: foo, keywords: a,b,c
    for (let i = 1; i < Math.min(lines.length, 6); i++) {
      const line = lines[i].trim();
      if (!line || !line.includes(':')) {
        bodyStart = i;
        break;
      }
      const [k, ...rest] = line.split(':');
      const v = rest.join(':').trim();
      if (/^id$/i.test(k.trim())) id = v;
      if (/^keywords$/i.test(k.trim())) {
        keywords = v
          .split(',')
          .map((s) => s.trim().toLowerCase())
          .filter(Boolean);
      }
      bodyStart = i + 1;
    }

    const text = lines.slice(bodyStart).join('\n').trim();
    sections.push({
      id: id || titleLine.toLowerCase().replace(/\s+/g, '-'),
      title: titleLine,
      keywords,
      text,
    });
  }

  return sections;
}

// ---- Types ----
type Section = {
  id: string;
  title: string;
  keywords: string[];
  text: string;
};

// ---- Zod schema for xrpl_answer tool ----
const XrplAnswerSchema = z.object({
  question: z
    .string()
    .describe(
      'User question about XRPL (DEX/AMM, trust lines, fees, addresses, NFTs, Xaman, etc.)'
    ),
});

// ---- Tool implementation (HelloWorld-style) ----
class XrplAnswerTool extends BaseHederaQueryTool<typeof XrplAnswerSchema> {
  name = 'xrpl_answer';
  description =
    'Answer questions about the XRP Ledger (XRPL) from a curated internal knowledge base.';
  specificInputSchema = XrplAnswerSchema;
  namespace = 'xrpl';

  private corpus: Section[];

  constructor(params: BaseHederaQueryToolParams & { corpus: Section[] }) {
    super(params);
    this.corpus = params.corpus;
  }

  protected async executeQuery(
    args: z.infer<typeof XrplAnswerSchema>
  ): Promise<unknown> {
    const q = (args?.question ?? '').trim();
    if (!q) {
      return {
        success: true,
        answer: this.composeOverview(),
        sections: ['XRPL Overview'],
      };
    }
    const { answer, sections } = this.searchAndAnswer(q);
    return { success: true, answer, sections };
  }

  // ---- Internals ----
  private composeOverview(): string {
    const over = this.corpus.find((c) => c.id === 'xrpl-overview')!;
    const acc = this.corpus.find((c) => c.id === 'accounts-addresses')!;
    const dex = this.corpus.find((c) => c.id === 'dex-orderbook')!;
    const amm = this.corpus.find((c) => c.id === 'amm')!;
    const disc = this.corpus.find((c) => c.id === 'disclaimer')!;
    return [over.text, acc.text, dex.text, amm.text, disc.text].join('\n\n');
  }

  private searchAndAnswer(question: string): { answer: string; sections: string[] } {
    const tokens = this.tokenize(question);
    const scored = this.corpus
      .map((s) => ({ s, score: this.score(tokens, s) }))
      .sort((a, b) => b.score - a.score);

    const top = scored.slice(0, 3).filter((x) => x.score > 0);
    if (top.length === 0) {
      return { answer: this.composeOverview(), sections: ['XRPL Overview'] };
    }
    const sections = top.map((x) => x.s.title);
    const body = top.map((x) => `# ${x.s.title}\n${x.s.text}`).join('\n\n');
    const disclaimer = this.corpus.find((c) => c.id === 'disclaimer')!;
    const answer = `${body}\n\n—\n${disclaimer.text}`;
    return { answer, sections };
  }

  private tokenize(text: string): string[] {
    return text
      .toLowerCase()
      .replace(/[^\p{L}\p{N}\s-]+/gu, ' ')
      .split(/\s+/)
      .filter(Boolean);
  }

  private score(qt: string[], s: Section): number {
    let score = 0;
    const set = new Set(qt);
    for (const k of s.keywords) if (set.has(k)) score += 3;
    for (const t of qt) if (s.title.toLowerCase().includes(t)) score += 1;
    return score;
  }
}

// ---- Plugin wrapper (HelloWorld-style) ----
export class XrplInfoPlugin extends BasePlugin {
  id = 'xrpl-info';
  name = 'XRPL Info';
  description =
    'Answers questions about the XRP Ledger (XRPL): accounts, tokens, DEX/AMM, fees, NFTs, Xaman, etc.';
  version = '1.0.0';
  author = 'Toradle';
  namespace = 'xrpl';

  private tools: HederaTool[] = [];

  private corpus!: Section[];

  override async initialize(context: GenericPluginContext): Promise<void> {
    await super.initialize(context);
    this.context.logger.info('XrplInfoPlugin initialized');

    // Load external markdown corpus
    try {
      const mdPath = path.join(__dirname, '../knowledge/xrpl.md');
      if (!fs.existsSync(mdPath)) {
        throw new Error(`XRPL markdown not found at ${mdPath}`);
      }
      const loaded = loadCorpusFromMarkdown(mdPath);
      if (!loaded || loaded.length === 0) {
        throw new Error(`XRPL markdown loaded but empty: ${mdPath}`);
      }
      this.corpus = loaded;
      this.context.logger.info(`XRPL corpus loaded from markdown: ${mdPath} (sections=${loaded.length})`);
    } catch (e) {
      throw new Error(`Failed to load XRPL markdown corpus: ${(e as Error).message}`);
    }

    const hederaKit = context.config.hederaKit as HederaAgentKit;
    if (hederaKit) {
      this.tools = [new XrplAnswerTool({ hederaKit, corpus: this.corpus })];
    } else {
      this.context.logger.warn(
        'HederaKit not found in context, XRPL tools will not be available'
      );
    }
  }

  getTools(): HederaTool[] {
    return this.tools;
  }
}