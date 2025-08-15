// src/plugins/ToradleInfoPlugin.ts
import { BasePlugin } from 'hedera-agent-kit';
import type { BasePluginContext, HederaTool } from 'hedera-agent-kit';

type QAInput = { question: string };

type CorpusSection = {
  id: string;
  title: string;
  text: string;
  keywords: string[];
};

export class ToradleInfoPlugin extends BasePlugin<BasePluginContext> {
  id = 'toradle-info';
  name = 'Toradle Info';
  description = 'Answers questions about Toradle using a curated, static knowledge base.';
  version = '1.0.0';
  author = 'Toradle';

  // --- Curated Toradle knowledge (edit safely) ---
  private corpus: CorpusSection[] = [
    {
      id: 'overview',
      title: 'What is Toradle?',
      keywords: ['toradle', 'overview', 'platform', 'ai', 'signals', 'trading'],
      text: [
        'Toradle is an AI-powered crypto trading assistant that helps users act with discipline under volatility.',
        'It generates real-time buy/sell/hold insights, risk-tiered tranche guidance, and concise summaries per asset.',
        'Core ideas: actionable signals, lightweight explanations, and guard-railed risk management.'
      ].join(' ')
    },
    {
      id: 'signals',
      title: 'Signals & Analytics',
      keywords: ['signals', 'buy', 'sell', 'hold', 'grades', 'trend', 'backtest', 'metrics'],
      text: [
        'Toradle tracks trend state, latest signals, grade/quality indicators, and trade context (e.g., ongoing position status).',
        'Backtesting and cohort metrics surface average positive/negative ROI, CGR comparisons, and win-rate style stats by asset/timeframe.'
      ].join(' ')
    },
    {
      id: 'risk',
      title: 'Risk Tranches',
      keywords: ['risk', 'tranche', 'position sizing', 'allocation'],
      text: [
        'Signals include tranche counts for High/Optimal/Low risk modes, guiding how many scaled entries to consider.',
        'This helps users phase entries/exits instead of going all-in, improving discipline during volatility.'
      ].join(' ')
    },
    {
      id: 'alerts',
      title: 'Alerts & Delivery',
      keywords: ['alerts', 'realtime', 'telegram', 'web', 'xapp', 'xaman', 'xrpl'],
      text: [
        'Signals can be surfaced on the web app and broadcast to external channels like Telegram.',
        'A specialized Xaman (XRPL) xApp can show XRP-ecosystem assets with focused UX while the main site remains multi-chain.'
      ].join(' ')
    },
    {
      id: 'integrations',
      title: 'Integrations & Architecture',
      keywords: ['hedera', 'ai agent kit', 'hcs', 'on-chain', 'data', 'postgres', 'neo4j', 'rag'],
      text: [
        'Toradle integrates with the Hedera AI Agent Kit for agentic workflows and message auditability via HCS where appropriate.',
        'Analytics summaries per coin live in Postgres; optional graph/RAG (e.g., Neo4j) can power “top coins by metric” queries.',
        'For market data, Toradle aggregates multiple providers and DEX venues; wallets & trades can be linked for opt-in tracking.'
      ].join(' ')
    },
    {
      id: 'gamification',
      title: 'Gamification',
      keywords: ['leaderboard', 'bots', 'points', 'strategy', 'game'],
      text: [
        'Users can configure AI trading bots, compare performance on leaderboards, and earn points/badges.',
        'This encourages exploration of risk-aware strategies and repeatable process over impulse.'
      ].join(' ')
    },
    {
      id: 'disclaimer',
      title: 'Disclaimers',
      keywords: ['disclaimer', 'not financial advice', 'risk'],
      text: [
        'Toradle provides analytics and tooling; it is not financial advice. Crypto markets are volatile.',
        'Users should do their own research and manage risk according to their circumstances.'
      ].join(' ')
    }
  ];

  // --- Tool wiring ---
  getTools(): HederaTool[] {
    const tool = {
      name: 'toradle.answer',
      description: 'Answer questions about Toradle based on a maintained internal knowledge base.',
      // Adjust field names if your HederaTool expects `parameters` or `schema` instead.
      inputSchema: {
        type: 'object',
        properties: {
          question: {
            type: 'string',
            description: 'User question about Toradle (features, signals, risk, integrations, etc.)'
          }
        },
        required: ['question'],
        additionalProperties: false
      },
      // Adjust to `run` or your framework’s handler key if needed.
      execute: async (args: QAInput): Promise<{ answer: string; sections: string[] }> => {
        const q = (args?.question ?? '').trim();
        if (!q) {
          return {
            answer: this.composeOverview(),
            sections: ['What is Toradle?', 'Signals & Analytics', 'Risk Tranches', 'Disclaimers']
          };
        }
        const { answer, sections } = this.searchAndAnswer(q);
        return { answer, sections };
      }
    } as unknown as HederaTool;

    return [tool];
  }

  // --- Helpers ---
  private composeOverview(): string {
    const over = this.corpus.find(c => c.id === 'overview')!;
    const sig = this.corpus.find(c => c.id === 'signals')!;
    const risk = this.corpus.find(c => c.id === 'risk')!;
    const disc = this.corpus.find(c => c.id === 'disclaimer')!;
    return [over.text, sig.text, risk.text, disc.text].join('\n\n');
  }

  private searchAndAnswer(question: string): { answer: string; sections: string[] } {
    const tokens = this.tokenize(question);
    const scored = this.corpus
      .map(s => ({ s, score: this.score(tokens, s) }))
      .sort((a, b) => b.score - a.score);

    const top = scored.slice(0, 3).filter(x => x.score > 0);
    const sections = top.map(x => x.s.title);

    if (top.length === 0) {
      // Fallback: overview
      return { answer: this.composeOverview(), sections: ['What is Toradle?'] };
    }

    // Compose a concise, direct answer:
    const body = top.map(x => `# ${x.s.title}\n${x.s.text}`).join('\n\n');
    const disclaimer = this.corpus.find(c => c.id === 'disclaimer')!;
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

  private score(queryTokens: string[], section: CorpusSection): number {
    // Simple scoring: keyword overlap (weighted) + token overlap
    const set = new Set(queryTokens);
    let score = 0;
    for (const k of section.keywords) {
      if (set.has(k)) score += 3;
    }
    for (const t of queryTokens) {
      if (section.title.toLowerCase().includes(t)) score += 1;
    }
    return score;
  }
}