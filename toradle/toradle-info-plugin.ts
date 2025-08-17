// examples/toradle-info-plugin.ts
import { BasePlugin } from 'hedera-agent-kit';
import type { GenericPluginContext, HederaTool } from 'hedera-agent-kit';
import { z } from 'zod';
import {
  BaseHederaQueryTool,
  BaseHederaQueryToolParams,
} from 'hedera-agent-kit';
import { HederaAgentKit } from 'hedera-agent-kit';
import fs from 'fs';
import path from 'path';

// ---- Types ----
type CorpusSection = {
  id: string;
  title: string;
  text: string;
  keywords: string[];
};

// ---- Zod schema for the toradle.answer tool input ----
const ToradleAnswerSchema = z.object({
  question: z
    .string()
    .describe('User question about Toradle (features, signals, risk, integrations, etc.)'),
});

function loadCorpusFromMarkdown(filePath: string): CorpusSection[] {
  let raw = fs.readFileSync(filePath, 'utf-8');

  // Skip the top H1 (# ...) and only parse sections starting from the first ##
  const firstLevel2Index = raw.indexOf('\n## ');
  if (firstLevel2Index !== -1) {
    raw = raw.slice(firstLevel2Index + 1);
  }

  const sections: CorpusSection[] = [];

  const blocks = raw
    .split(/\n(?=##\s)/g) // split on level-2 headings used in knowledge files
    .map((b) => b.trim())
    .filter(Boolean);

  for (const block of blocks) {
    const lines = block.split('\n');
    const titleLine = lines[0].replace(/^##\s+/, '').trim();

    let id = '';
    let keywords: string[] = [];
    let bodyStart = 1;

    // parse up to 6 meta lines like: id: foo, keywords: a,b,c
    for (let i = 1; i < Math.min(lines.length, 7); i++) {
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

// ---- The actual tool implementation (follows the SayHelloTool pattern) ----
class ToradleAnswerTool extends BaseHederaQueryTool<typeof ToradleAnswerSchema> {
  name = 'toradle_answer';
  description = 'Answer questions about Toradle from a curated internal knowledge base.';
  specificInputSchema = ToradleAnswerSchema;
  namespace = 'toradle';

  private corpus: CorpusSection[];

  constructor(params: BaseHederaQueryToolParams & { corpus: CorpusSection[] }) {
    super(params);
    this.corpus = params.corpus;
  }

  protected async executeQuery(
    args: z.infer<typeof ToradleAnswerSchema>
  ): Promise<unknown> {
    const q = (args?.question ?? '').trim();
    if (!q) {
      return {
        success: true,
        answer: this.composeOverview(),
        sections: ['Overview', 'Signals & Analytics', 'Risk Tranches & Position Sizing', 'Disclaimers'],
      };
    }
    const { answer, sections } = this.searchAndAnswer(q);
    return { success: true, answer, sections };
  }

  // ---- Retrieval helpers (same logic as before, localized to the tool) ----
  private composeOverview(): string {
    const over = this.corpus.find((c) => c.id === 'toradle-overview');
    const sig = this.corpus.find((c) => c.id === 'toradle-signals');
    const risk = this.corpus.find((c) => c.id === 'toradle-tranches');
    const disc = this.corpus.find((c) => c.id === 'toradle-disclaimer');
    return [over?.text, sig?.text, risk?.text, disc?.text].filter(Boolean).join('\n\n');
  }

  private searchAndAnswer(question: string): { answer: string; sections: string[] } {
    const tokens = this.tokenize(question);
    const scored = this.corpus
      .map((s) => ({ s, score: this.score(tokens, s) }))
      .sort((a, b) => b.score - a.score);

    const top = scored.slice(0, 3).filter((x) => x.score > 0);
    if (top.length === 0) {
      return { answer: this.composeOverview(), sections: ['Overview'] };
    }

    const sections = top.map((x) => x.s.title);
    const body = top.map((x) => `## ${x.s.title}\n${x.s.text}`).join('\n\n');
    const disclaimer = this.corpus.find((c) => c.id === 'toradle-disclaimer');
    const answer = disclaimer ? `${body}\n\n—\n${disclaimer.text}` : body;
    return { answer, sections };
  }

  private tokenize(text: string): string[] {
    return text
      .toLowerCase()
      .replace(/[^\p{L}\p{N}\s-]+/gu, ' ')
      .split(/\s+/)
      .filter(Boolean);
  }

  private score(queryTokens: string[], section: CorpusSection): number {
    const set = new Set(queryTokens);
    let score = 0;
    for (const k of section.keywords) if (set.has(k)) score += 3;
    for (const t of queryTokens) if (section.title.toLowerCase().includes(t)) score += 1;
    return score;
  }
}

/**
 * Toradle Info Plugin — wires the tool using the same pattern as HelloWorldPlugin
 */
export class ToradleInfoPlugin extends BasePlugin {
  id = 'toradle-info';
  name = 'Toradle Info';
  description = 'Answers questions about Toradle using a curated, static knowledge base.';
  version = '1.0.0';
  author = 'Toradle';
  namespace = 'toradle';
  private tools: HederaTool[] = [];

  private corpus: CorpusSection[] = [];

  override async initialize(context: GenericPluginContext): Promise<void> {
    await super.initialize(context);
    this.context.logger.info('ToradleInfoPlugin initialized');

    // Load Toradle knowledge base from Markdown
    const mdPath = path.join(__dirname, '../knowledge/toradle.md');
    if (!fs.existsSync(mdPath)) {
      throw new Error(`Toradle knowledge file not found at ${mdPath}`);
    }
    const loaded = loadCorpusFromMarkdown(mdPath);
    if (!loaded || loaded.length === 0) {
      throw new Error('Toradle knowledge file is empty or failed to parse.');
    }
    this.corpus = loaded;

    const hederaKit = context.config.hederaKit as HederaAgentKit;
    if (hederaKit) {
      this.tools = [
        new ToradleAnswerTool({ hederaKit, corpus: this.corpus }),
      ];
    } else {
      this.context.logger.warn(
        'HederaKit not found in context, Toradle tools will not be available'
      );
    }
  }

  getTools(): HederaTool[] {
    return this.tools;
  }
}