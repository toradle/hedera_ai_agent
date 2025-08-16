# Toradle Knowledge Base

## Overview

id: toradle-overview
keywords: toradle,overview,ai,crypto,trading,signals,assistant

Toradle is an AI-powered crypto trading assistant and execution hub. It delivers real-time **buy / sell / hold** insights, risk‑tiered tranche guidance, concise narrative explanations, and portfolio tracking. Toradle integrates directly with **Hedera Hashgraph** (on‑ledger DEX/AMM via Hashpack and Saucerswap), **XRPL** (on‑ledger DEX/AMM via Xaman) and offers centralized‑exchange execution through **Bybit**. It emphasizes discipline, clarity, and guard‑railed risk management to help users act consistently in volatile markets.

### What We Do

Toradle answers the three important questions that any retail trader needs to conduct a successful trade - What to trade, When to trade it and How to trade.

### How We Do It

Toradle’s approach is grounded in mathematical and statistical analysis rather than large language model (LLM) trends. This foundation allows for precise, data-driven signal generation that adapts dynamically to market conditions. The system is designed for flexibility, cost efficiency, and scalability, enabling users to access sophisticated trading insights without prohibitive costs or complexity.

### Why It Matters

In a rapidly evolving market, adaptability is crucial. Toradle’s cost-effective and scalable platform ensures that traders can respond quickly to changing conditions while maintaining disciplined risk management. This empowers retail traders to compete effectively and avoid common pitfalls of emotional or uninformed decision-making.

### Who Uses Toradle

Toradle primarily serves retail investors seeking an affordable, reliable trading assistant. With a subscription priced around $50/year, users gain access to actionable signals, portfolio tracking, and execution capabilities. Additionally, Bybit users benefit from a 50% fee cashback on trades executed through Toradle’s broker integration, enhancing value.

### What Makes Us Tick

Our core philosophy is that our Subscribers should not lose money.

### Future Possibilities

Looking ahead, Toradle envisions expanding into automated bot trading, offering mutual fund products, and launching Toradle Assured trades which will include insurance options to further protect subscribers’ investments.

## Core Value Proposition

id: toradle-value
keywords: value proposition,benefits,discipline,automation,insights

### Actionable signals

Clear entries/exits with contextual notes (trend, quality/grade, momentum, cohort metrics).

### Risk tranches

Position sizing guidance (High / Optimal / Low) to scale in and out—reduces the “all‑in” trap.

### Execution where you trade

XRPL on‑ledger trades via **Xaman** , Hedera Hashgraph trades via **Saucerswap** and **Hashpack** and CEX trades via **Bybit** connection.

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

### Trend Model

Toradle classifies market behavior across multiple timeframes and uses trend alignment to refine entries, exits, and tranche sizing. The model is quantitative and avoids subjective chart patterns.

### Timeframes

- **Short**: very near-term (e.g., 5m close) — used for timing entries/exits.
- **Medium**: swing horizon (e.g., 1h–4h) — checks follow-through and durability.
- **Long**: regime context (e.g., 1d) — defines backdrop and bias.

### Trend States

- **Uptrend**: Sustained higher highs and higher lows; positive gradient across medium/long windows with confirmation (e.g., N consecutive closes), and broad participation.
- **Upswing**: Short-term positive impulse within a neutral or positive regime. Often used for adds or first entries when grade and liquidity cooperate.
- **Downtrend**: Sustained lower highs and lower lows; negative gradient with confirmation and deteriorating participation.
- **Downswing**: Short-term negative impulse; often a pullback against an uptrend or continuation inside a downtrend.

### Detection Inputs (illustrative)

- Price structure (swing highs/lows) and rolling **slope/gradient** over fixed windows.
- **Volatility/dispersion**: expansion vs. compression.
- **Breadth/cohorts** across related assets or pairs.
- **Liquidity & volume** (XRPL pools/order books, Bybit depth/fills).
- **Confirmation rules**: require **N closes** beyond a threshold or **M minutes** of persistence to validate a regime.

### How Trend Affects Grades & Sizing

- **Grade boost** when a signal aligns with the dominant trend (e.g., Buy + Uptrend/Upswing).
- **Grade dampening** when a signal fights the regime (e.g., Buy during Downtrend/Downswing).
- Tranche guidance scales with trend alignment: more tranches in aligned states; fewer/none in adverse states.

### Execution Guidance by State (examples)

- **Uptrend + Upswing**: Favor adds/increments; use pullbacks for entries; widen take-profit ladders.
- **Uptrend + Downswing**: Prefer waiting for stabilization; scale smaller; avoid chasing.
- **Range**: Consider reduced sizing or mean-reversion tactics only if liquidity is sufficient; avoid breakout chasing until confirmation.
- **Downtrend / Downswing**: Avoid long entries; if shorting is available, treat as a separate, high-risk strategy with strict limits.

### Invalidation (discipline)

- Break of recent swing low (for longs) / swing high (for shorts), or a **gradient flip** against the position, triggers de-risking or exit according to tranche rules.

### Grade System

Each signal is assigned a grade (A, B, C, D) reflecting its quality and conviction level. Grades help users prioritize trades and manage risk:

- **Grade A**: Highest conviction. Strong probability alignment, robust supporting metrics, and consistent backtest performance. These signals represent the best trade opportunities.
- **Grade B**: High conviction, but with slightly less consistency than Grade A. Still considered reliable and often profitable under disciplined execution.
- **Grade C**: Medium conviction. These signals may work but lack strong supporting metrics or consistency. They require more cautious risk management.
- **Grade D**: Lowest conviction. Weak supporting data and higher variance. Generally not recommended except for highly risk‑tolerant users or testing strategies.
- **Grade F**: Extremely low conviction. No supporting metrics, high volatility, or strongly negative backtest outcomes. These are effectively "do not trade" signals unless used for experimentation.
- **Grade F-**: The absolute worst signal category. Represents the weakest probability alignment and the most adverse supporting data. Strongly advised to avoid trading on these signals.

Grades do not guarantee outcomes; they provide a structured framework for evaluating signal strength, helping users scale risk exposure appropriately.

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

## Trade Times

Toradle identifies optimal trading windows to maximize trade effectiveness. The timing of entries and exits significantly impacts trade outcomes, and Toradle’s analytics highlight these windows to help users act when conditions are most favorable. This timing insight complements signal quality and risk tranching to optimize overall trade performance.

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

### Hedera Hashgraph focus

GeckoTerminal (pools/volumes/price) and Saucerswap (market/explorer metadata) power Hedera Hashgraph coverage, combined with on‑ledger order‑books and AMM pools.

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

### XRPL Wallet safety

Toradle never sees XRPL private keys; Xaman handles user signing client‑side.

### Hedera Hashgraph Wallet safety

Toradle never sees Hedera Hashgraph private keys; Hashpack handles user signing client‑side.

### Bybit safety

Toradle never has access to users’ Bybit account credentials or private keys. When you connect your Bybit account, Bybit issues a secure authorization code (OAuth-style token) which is stored in our database. This code only grants Toradle permission to execute trades and fetch account information on your behalf; it does not expose your login credentials or withdrawal rights.

### Operational controls

Idempotent requests, correlation IDs, monitoring for failed submissions/fills.

### Compliance & logging

Optional HCS anchoring for critical user actions; configurable data retention.

## Disclaimers

id: toradle-disclaimer
keywords: disclaimer,not financial advice,risks

Toradle provides analytics and tooling; it is **not financial advice**. Crypto markets are volatile. Backtests and historical metrics are **not guarantees** of future results. Users should do their own research and select risk tranches and allocations appropriate to their circumstances. Promotions (including fee cashbacks) may change; always check the latest terms on Toradle.

## How to Use Toradle

Toradle guides users through a disciplined trading process:

1. Interpret signals carefully, paying attention to signal state and grades.
2. Choose appropriate risk tranches (High, Optimal, Low) to scale entries and exits.
3. Connect Bybit and/or Hedera Hashgraph wallets via Hashpack and/or XRPL wallets via Xaman to enable seamless trade execution.
4. Act with discipline, leveraging alerts and portfolio tracking to maintain consistent risk management.

This structured approach helps users avoid impulsive decisions and trade more effectively.

## Token Analysis

Toradle provides token-level analysis including average ROI, Compound Growth Rate (CGR), and breakdowns of positive and negative trades. This granular insight allows users to evaluate token performance over time and make informed decisions based on historical trends and cohort analytics.

## Contact & Support

id: toradle-support
keywords: support,contact,help,documentation

- **Website/App**: [toradle.com](https://toradle.com)
- **Community (Telegram)**: [@toradle_community](https://t.me/toradle_community)
- **Updates (X/Twitter)**: [@toradle](https://x.com/toradle)
- **Discord**: (as announced in-app)

## Company

id: toradle-company
keywords: company,toradle technologies,registration,uae

## Company Philosophy

Our core philosophy is that our Subscribers should not lose money.

Registered address: Dubai

> For legal, compliance, and promotional terms (e.g., Bybit brokerage benefits), refer to the latest official documents published by Toradle.

## Glossary & Definitions

id: toradle-definitions
keywords: glossary, definitions, metrics, ROI, CGR, backtest, SQN, Sharpe, Sortino, Calmar

- **CGR (Cumulative Growth Rate)**: Growth rate over a given period, compounding all trades.
- **CGR Toradle**: Cumulative growth if following Toradle’s trade advisories.
- **CGR Actual**: Cumulative growth if holding the asset from the start of the period without trading.
- **ROI (Return on Investment)**: The net profit or loss from trades, expressed as a percentage of the invested amount.
- **Current Position**: The current value of an open trade compared to the entry price.

### Backtest Metrics

- **SQN (System Quality Number)**: A measure of trading system performance that considers average trade returns and variability.
- **Calmar Ratio**: Annualized return divided by maximum drawdown, used to assess risk-adjusted performance.
- **Profit Factor**: Ratio of gross profits to gross losses; a measure of profitability.
- **Sharpe Ratio**: Risk-adjusted return metric; average excess return per unit of volatility.
- **Sortino Ratio**: Variation of Sharpe that penalizes only downside volatility.
- **Expectancy %**: Average expected return per trade over many trades.
- **Win Rate %**: Percentage of trades that end in profit.
- **Accuracy %**: How often Toradle’s signals correctly predict trade direction.

### Trade & Equity Stats

- **Return Ann %**: Annualized return percentage.
- **Volatility Ann %**: Annualized volatility percentage.
- **Equity Start**: Starting portfolio value in backtest.
- **Equity Peak**: Highest portfolio value reached.
- **Equity Final**: Ending portfolio value.
- **Best Trade [%]**: Largest profit percentage achieved in a single trade.
- **Worst Trade [%]**: Largest loss percentage in a single trade.
- **Avg. Duration**: Average holding period of trades.
- **Max. Duration**: Longest holding period of a trade.
- **Number of Buys** — Represents how many buy calls were issued during a trade or over a selected period. Useful when combined with the tranche system to understand risk allocation.
