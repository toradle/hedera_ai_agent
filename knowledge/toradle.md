# Toradle Knowledge Base

## Overview

id: toradle-overview
keywords: toradle,overview,ai,crypto,trading,signals,assistant

Toradle is an AI-powered crypto trading assistant and execution hub. It delivers real-time **buy / sell / hold** insights, risk‑tiered tranche guidance, concise narrative explanations, and portfolio tracking. Toradle integrates directly with **XRPL** (on‑ledger DEX/AMM via Xaman) and offers centralized‑exchange execution through **Bybit**. It emphasizes discipline, clarity, and guard‑railed risk management to help users act consistently in volatile markets.

## Core Value Proposition

id: toradle-value
keywords: value proposition,benefits,discipline,automation,insights

### Actionable signals

Clear entries/exits with contextual notes (trend, quality/grade, momentum, cohort metrics).

### Risk tranches

Position sizing guidance (High / Optimal / Low) to scale in and out—reduces the “all‑in” trap.

### Execution where you trade

XRPL on‑ledger trades via **Xaman** and CEX trades via **Bybit** connection.

### Always‑on alerts

Web + Telegram notifications for fresh signals, fills, and risk changes.

### Portfolio intelligence

Auto‑tracking of positions and P&L with backtest overlays and KPI summaries.

## Signals & Analytics

id: toradle-signals
keywords: signals,analytics,grades,trend,backtesting,metrics

Toradle synthesizes multi‑source market data into a compact view per asset:

### Signal state

Latest buy/sell/hold, trend direction (upswing/downswing/range), and a **grade** indicating signal quality.

### Context

Ongoing position status, stop/invalidations (if configured), and tranche counts for progressive entries.

### Backtesting & cohorts

Average +/‑ ROI, CGR (Toradle vs. actual), win‑rate‑like aggregates by timeframe/asset.

### Latent momentum

Short‑window deltas (e.g., 5m) and 24h measures to frame timing vs. trend.

> Note: Historical metrics are indicative, not guarantees. Market behaviour changes.

## Risk Tranches & Position Sizing

id: toradle-tranches
keywords: tranches,risk,position sizing,allocation,scaling

Every signal includes suggested **tranche counts** for High / Optimal / Low risk modes. Tranches distribute entries and exits to improve discipline under volatility. Users can adapt tranche sizes to their risk budget.

## Hedera Integration

id: toradle-hedera
keywords: hedera,hedera agent kit,hcs,hashgraph,agentic,logging,audit

Toradle integrates with **Hedera** for agentic workflows and optional **Hedera Consensus Service (HCS)** logging:

- **Agentic flows**: Using the Hedera AI Agent Kit, Toradle tools/plugins expose deterministic actions (e.g., answering FAQs, preparing transactions, or orchestrating off‑chain calls) with typed schemas.
- **Audit trails (optional)**: Key user‑visible actions and summaries can be anchored to **HCS topics** for an immutable audit line (helpful for compliance or transparency use‑cases). The exact scope of logging is configurable.
- **Operational reliability**: Deterministic tool schemas and centralized configuration keep the runtime predictable and testable.

## XRPL Integration (Trading via Xaman)

id: toradle-xrpl
keywords: xrpl,xrp ledger,xumm,xaman,xapp,dex,amm,trust line,sign request

Toradle provides **on‑ledger trading** on **XRPL** through **Xaman** (formerly XUMM):

- **Connect Xaman**: Users connect their wallet and approve **sign requests** (payloads) for DEX and AMM operations.
- **DEX (order‑book)**: Create/cancel offers (`OfferCreate` / `OfferCancel`) across XRP and issued currencies.
- **AMM**: Where supported, construct deposits/withdrawals/swaps against XRPL native AMM pools (with fee/impact awareness).
- **Trust line setup**: Prepare `TrustSet` transactions (with sensible limits) to hold newly discovered issuer IOUs.
- **Post‑trade tracking**: Once a trade is validated on‑ledger, the acquired asset is **auto‑added to the in‑app portfolio** for ongoing P&L and exposure tracking.
- **XRPL market data**: Toradle enriches on‑ledger state with external sources (e.g., **GeckoTerminal** for pools/volumes and **xrppl.to/xrpl.to** for market/explorer data) to keep charts and summaries current.

## Bybit Brokerage & CEX Execution (50% Fee Cashback)

id: toradle-bybit
keywords: bybit,broker,execution,api keys,fees,cashback,50%

Toradle operates as a **broker with Bybit** and supports **direct trade execution** on Bybit through a secure account connection:

- **Connect your Bybit account**: Users link their Bybit account to Toradle (e.g., via Bybit API keys configured with **trading‑only** permissions). Keys are stored and transmitted securely.
- **Trade from Toradle**: Place orders on Bybit directly from Toradle’s UI while using Toradle signals, tranche guidance, and risk context.
- **50% fee cashback**: Users receive **50% cashback on trading fees** for every executed trade via Toradle’s Bybit broker integration. *Terms, eligibility, and covered products may apply; details may be updated—refer to Toradle’s promotions page for the latest.*
- **Order/position sync**: Executions, fills, and cancellations are reflected in Toradle’s portfolio views with P&L, exposure, and history.

> Security note: Use separate API keys per integration, restrict IPs if possible, and avoid withdrawal permissions.

## Portfolio & P&L

id: toradle-portfolio
keywords: portfolio,positions,tracking,pnl,exposure,auto add

### Auto add

New assets acquired via XRPL or Bybit execution are automatically added to the user’s portfolio.

### Unified view

Holdings across XRPL and Bybit are summarized with balances, average price, unrealized P&L, and allocation.

### Signals‑aware

Open positions are annotated with current signal state and tranche progress.

## Alerts & Delivery

id: toradle-alerts
keywords: alerts,telegram,web,push,real time

### Web notifications

For fresh signals, fills, and risk changes.

### Telegram (optional)

Broadcast formatted trade alerts and confirmations to user‑subscribed channels or bots.

### Granular controls

Per‑asset or per‑portfolio subscriptions; quiet hours.

## Market Data & Coverage

id: toradle-data
keywords: data,aggregation,geckoterminal,xrppl.to,exchanges,liquidity

### XRPL focus

GeckoTerminal (pools/volumes/price) and xrppl.to/xrpl.to (market/explorer metadata) power XRPL coverage, combined with on‑ledger order‑books and AMM pools.

### CEX data

Quotes, depth, and recent trades from Bybit (and other exchanges where supported) for execution‑quality context.

### Normalization

A unified model reconciles disparate symbols, issuers, and pools so charts and KPIs stay consistent.

## Security & Privacy

id: toradle-security
keywords: security,api keys,encryption,privacy,compliance

### API keys

Encrypted at rest and in transit; principle of least privilege (trading only; no withdrawals).

### Wallet safety

Toradle never sees XRPL private keys; Xaman handles user signing client‑side.

### Operational controls

Idempotent requests, correlation IDs, monitoring for failed submissions/fills.

### Compliance & logging

Optional HCS anchoring for critical user actions; configurable data retention.

## Disclaimers

id: toradle-disclaimer
keywords: disclaimer,not financial advice,risks

Toradle provides analytics and tooling; it is **not financial advice**. Crypto markets are volatile. Backtests and historical metrics are **not guarantees** of future results. Users should do their own research and select risk tranches and allocations appropriate to their circumstances. Promotions (including fee cashbacks) may change; always check the latest terms on Toradle.

## Contact & Support

id: toradle-support
keywords: support,contact,help,documentation

- **Website/App**: toradle.com / toradle.xyz
- **Community & updates**: Telegram, X/Twitter, Discord (as announced in‑app)
- **Docs**: In‑app help center and developer snippets for Xaman flows

## Company

id: toradle-company
keywords: company,toradle technologies,registration,uae

## Toradle Technologies FZ‑LLC**

Registered address: ADDRESS FDRK1642, Compass Building, Al Shohada Road, AL Hamra Industrial Zone‑FZ, Ras Al Khaimah, United Arab Emirates.

> For legal, compliance, and promotional terms (e.g., Bybit brokerage benefits), refer to the latest official documents published by Toradle.
