// toradle/xrpl-info-plugin.ts
import type { IPlugin, HederaTool, BasePluginContext } from 'hedera-agent-kit';

type QAInput = { question: string };

type Section = {
  id: string;
  title: string;
  keywords: string[];
  text: string;
};

export class XrplInfoPlugin implements IPlugin<BasePluginContext> {
  id = 'xrpl-info';
  name = 'XRPL Info';
  description = 'Answers questions about the XRP Ledger (XRPL): accounts, tokens, DEX/AMM, fees, NFTs, Xaman, etc.';
  version = '1.0.0';
  author = 'Toradle';

  private ctx?: BasePluginContext;

  async initialize(ctx: BasePluginContext): Promise<void> {
    this.ctx = ctx;
  }

  // ---- Curated XRPL corpus (edit/update safely) ----
  private corpus: Section[] = [
    {
      id: 'xrpl-overview',
      title: 'XRPL Overview',
      keywords: ['xrpl', 'ripple', 'xrp ledger', 'consensus', 'validators', 'ledger'],
      text: [
        'The XRP Ledger (XRPL) is a decentralized, public blockchain optimized for fast, low-fee payments and asset issuance.',
        'It uses a federated Byzantine agreement consensus with validator UNLs (unique node lists) to confirm ledgers in seconds.',
        'Native asset: XRP (for fees and reserve requirements). Issued tokens (IOUs) are supported via trust lines.'
      ].join(' ')
    },
    {
      id: 'accounts-addresses',
      title: 'Accounts & Addresses',
      keywords: ['account', 'r-address', 'x-address', 'classic address', 'destination tag', 'seed', 'keypair', 'reserve'],
      text: [
        'Classic XRPL addresses begin with “r…”. X-addresses encode the classic address + optional destination tag + network in one string.',
        'Accounts maintain XRP balances and own objects like trust lines and offers. A base reserve (in XRP) is required to keep an account active and to hold objects.'
      ].join(' ')
    },
    {
      id: 'fees-reserve',
      title: 'Fees & Reserve',
      keywords: ['fee', 'reserve', 'network load'],
      text: [
        'Transaction fees are small (in drops of XRP) and adjust with network load.',
        'Reserves: an account must hold a base reserve plus increments for each owned ledger object (e.g., trust lines, offers).'
      ].join(' ')
    },
    {
      id: 'issued-currencies',
      title: 'Issued Currencies & Trust Lines',
      keywords: ['issued currency', 'trustline', 'issuer', 'gateway', 'rippling', 'freeze'],
      text: [
        'XRPL supports “Issued Currencies” (IOUs) like USD/EUR/USDT issued by specific accounts (“issuers”).',
        'Holding an issued currency requires a trust line to that issuer/currency pair. Trust lines define limits and rippling behavior.'
      ].join(' ')
    },
    {
      id: 'dex-orderbook',
      title: 'Built-in DEX (Order Books)',
      keywords: ['dex', 'orderbook', 'offer', 'autobridging', 'pathfinding', 'amm'],
      text: [
        'XRPL has a built-in order-book DEX. Users place Offers to buy/sell XRP or issued tokens.',
        'Autobridging paths through XRP can improve pricing. Pathfinding chooses routes across multiple order books.'
      ].join(' ')
    },
    {
      id: 'amm',
      title: 'AMM on XRPL',
      keywords: ['amm', 'liquidity pool', 'lp', 'continuous auction'],
      text: [
        'An Automated Market Maker (AMM) is available on XRPL as a native feature alongside order books.',
        'AMMs hold two-asset pools; LPs earn trading fees. XRPL AMM design includes a continuous auction mechanism to mitigate arbitrage.'
      ].join(' ')
    },
    {
      id: 'payments-escrow-channels',
      title: 'Payments, Escrow & Payment Channels',
      keywords: ['payment', 'escrow', 'escrow finish', 'payment channel', 'streaming'],
      text: [
        'XRPL supports fast Payments, time- or condition-locked Escrows, and Payment Channels for high-throughput streaming-like payments.'
      ].join(' ')
    },
    {
      id: 'nfts',
      title: 'NFTs (XLS-20)',
      keywords: ['nft', 'xls-20', 'mint', 'brokered mode'],
      text: [
        'XLS-20 adds native NFTs on XRPL: minting, burning, transfers, royalties, and brokered operations are supported at protocol level.'
      ].join(' ')
    },
    {
      id: 'xumm-xaman',
      title: 'Xaman (XUMM) & xApps',
      keywords: ['xumm', 'xaman', 'xapp', 'sign request', 'payload'],
      text: [
        'Xaman (formerly XUMM) is a non-custodial XRPL wallet with an xApp platform.',
        'Apps can request signatures via payloads; users see, approve, and sign in the wallet. Sandbox xApps allow dev testing.'
      ].join(' ')
    },
    {
      id: 'tooling-apis',
      title: 'Tooling & APIs',
      keywords: ['xrpl.js', 'rippled', 'websocket', 'json-rpc', 'data api'],
      text: [
        'Common tooling: xrpl.js (JavaScript SDK), rippled server JSON-RPC & WebSocket APIs.',
        'Public nodes and full-history providers offer ledger/state queries, order books, AMM pools, and transaction submission.'
      ].join(' ')
    },
    {
      id: 'security',
      title: 'Security & Best Practices',
      keywords: ['seed', 'secret', 'hardware wallet', 'destination tag', 'memo'],
      text: [
        'Keep secrets offline or in secure modules; prefer hardware wallets for large value.',
        'Use destination tags where required by exchanges. Verify issuer accounts for IOUs and be mindful of rippling settings.'
      ].join(' ')
    },
    {
      id: 'disclaimer',
      title: 'Disclaimer',
      keywords: ['not financial advice', 'risk'],
      text: [
        'This information is for general guidance only and not financial advice. Always verify details and manage risk appropriately.'
      ].join(' ')
    }
  ];

  // ---- Tools ----
  getTools(): HederaTool[] {
    const tool = {
      name: 'xrpl.answer',
      description: 'Answer questions about the XRP Ledger (XRPL) from a curated internal knowledge base.',
      inputSchema: {
        type: 'object',
        properties: {
          question: {
            type: 'string',
            description: 'User question about XRPL (DEX/AMM, trust lines, fees, addresses, NFTs, Xaman, etc.)'
          }
        },
        required: ['question'],
        additionalProperties: false
      },
      execute: async (args: QAInput): Promise<{ answer: string; sections: string[] }> => {
        const q = (args?.question ?? '').trim();
        if (!q) {
          return { answer: this.composeOverview(), sections: ['XRPL Overview'] };
        }
        const { answer, sections } = this.searchAndAnswer(q);
        return { answer, sections };
      }
    } as unknown as HederaTool;

    return [tool];
  }

  // ---- Internals ----
  private composeOverview(): string {
    const over = this.corpus.find(c => c.id === 'xrpl-overview')!;
    const acc = this.corpus.find(c => c.id === 'accounts-addresses')!;
    const dex = this.corpus.find(c => c.id === 'dex-orderbook')!;
    const amm = this.corpus.find(c => c.id === 'amm')!;
    const disc = this.corpus.find(c => c.id === 'disclaimer')!;
    return [over.text, acc.text, dex.text, amm.text, disc.text].join('\n\n');
  }

  private searchAndAnswer(question: string): { answer: string; sections: string[] } {
    const tokens = this.tokenize(question);
    const scored = this.corpus
      .map(s => ({ s, score: this.score(tokens, s) }))
      .sort((a, b) => b.score - a.score);

    const top = scored.slice(0, 3).filter(x => x.score > 0);
    if (top.length === 0) {
      return { answer: this.composeOverview(), sections: ['XRPL Overview'] };
    }
    const sections = top.map(x => x.s.title);
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

  private score(qt: string[], s: Section): number {
    let score = 0;
    const set = new Set(qt);
    for (const k of s.keywords) if (set.has(k)) score += 3;
    for (const t of qt) if (s.title.toLowerCase().includes(t)) score += 1;
    return score;
  }
}