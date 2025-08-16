# XRPL Knowledge Base

## XRPL Overview

id: xrpl-overview
keywords: xrpl,ripple,xrp ledger,overview,basics,architecture
The XRP Ledger (XRPL) is a decentralized, public blockchain purpose‑built for fast, low‑fee settlement of value and tokenized assets. It achieves ~seconds‑level finality using a federated Byzantine agreement (FBA) style consensus with Unique Node Lists (UNLs). Native XRP is used to pay transaction fees and to satisfy reserve requirements that prevent ledger bloat. XRPL supports:

- Native currency (XRP)
- Issued currencies (IOUs) via trust lines
- A built‑in order‑book DEX and a native AMM
- Time/condition‑locked escrow and payment channels
- Native NFTs (XLS‑20)
- Advanced account flags/controls (RequireAuth, DepositAuth, GlobalFreeze, etc.)

XRPL nodes run the `rippled` server. Clients typically use WebSocket or JSON‑RPC to query ledger state and submit signed transactions. Popular SDKs include `xrpl.js` (TS/JS) and ripple‑libs for other languages.

## Consensus & Network Topology

id: consensus-topology
keywords: consensus,unl,validators,fba,finality,ledgers
XRPL’s consensus is a variant of Federated Byzantine Agreement. Each server maintains a **Unique Node List (UNL)**—a curated set of validators it trusts for timely, correct consensus. In each round:

1. Nodes share candidate transaction sets.
2. They iteratively vote on which transactions to include.
3. When a supermajority (typically ≥80% of the configured UNL) agrees, a ledger is **validated**.

Properties:

- **Low latency:** ledgers close in seconds (network conditions vary).
- **Probabilistic‑to‑deterministic**: Once a ledger attains sufficient validations, it’s considered final.
- **Liveness under partial faults**: As long as a large overlap of honest validators exists across UNLs.

## Addresses & Accounts

id: addresses-accounts
keywords: r-address,x-address,classic address,destination tag,account,keys
XRPL distinguishes **classic addresses** and **X‑addresses**:

- **Classic address:** Base58Check string starting with `r…` (example form). Used with an optional **destination tag** (32‑bit unsigned integer) to identify sub‑accounts on exchanges/custodians.
- **X‑address:** Encodes classic address + destination tag + network id in one string. Helpful to avoid tag mistakes.

An **account** holds XRP, owns objects (trust lines, offers, NFTs, etc.), and has:

- **Public/private keypair** (for signing)
- **Sequence** (monotonic tx order)
- **Flags** and **domain** fields (optional)

## Fees & Reserves

id: fees-reserves
keywords: fees,drops,reserve,base reserve,owner reserve,anti-spam

- Fees are paid in **drops** (1 drop = 0.000001 XRP). Network load can raise the **minimum fee** dynamically.
- Every account must hold a **base reserve** of XRP (anti‑spam). Each owned object (trust line, offer, NFT page entry, etc.) adds an **owner reserve** increment.
- Reserves are protocol parameters and may change via amendments; do not hardcode fixed numbers in production. Always query the network for current values.

## Transactions & Signing

id: transactions-signing
keywords: transaction format,signing,sequence,fee,lastledgersequence,memos
Transactions are JSON objects with required fields like:

- `Account`, `TransactionType`, `Fee`, `Sequence`, `LastLedgerSequence`
- Type‑specific fields (e.g., `Amount`, `Destination` for Payments)
- Optional `Memos[]` (UTF‑8 blobs), `Flags`, `SigningPubKey`

**Flow:**

1. Build JSON.
2. Sign offline (single‑sig or multi‑sig) → binary blob.
3. Submit via `submit`/`submit_multisigned`.
4. Poll via `tx` until validated (or watch streams).

**Sequence & LastLedgerSequence** guard against replay and stale inclusion. If a tx misses `LastLedgerSequence`, it’s permanently expired; resubmit with a new Sequence.

```ts
// xrpl.js example: prepare & sign a Payment
import xrpl from 'xrpl'

const client = new xrpl.Client('wss://s1.ripple.com')
await client.connect()

const wallet = xrpl.Wallet.fromSeed('s████████████████████████████')

const tx = {
  TransactionType: 'Payment',
  Account: wallet.address,
  Destination: 'r████████████████████████████',
  Amount: xrpl.xrpToDrops('10'), // 10 XRP in drops
}

const prepared = await client.autofill(tx)
const signed = wallet.sign(prepared)
const res = await client.submitAndWait(signed.tx_blob)
console.log(res)
```

## Memos, Destination Tags & Invoice IDs

id: memos-tags
keywords: memo,destination tag,invoice id,metadata

- **Memos:** arbitrary metadata attached to transactions. Some exchanges parse structured fields.
- **Destination Tag:** identifies sub‑accounts on a custodial destination. Always include if required by the recipient.
- **InvoiceID:** 256‑bit identifier for correlating payments with off‑ledger invoices.

## Multisigning & Signer Lists

id: multisign
keywords: multisig,signer list,quorum
XRPL supports native multi‑signature:

- Owner sets a **SignerList** with signers and weights.
- A tx is valid when **sum(weights) ≥ quorum**.
- Submit with `submit_multisigned`.

Benefits: shared control, organizational approvals, hardware wallet combos.

## Issued Currencies (IOUs) & Trust Lines

id: issued-currencies
keywords: iou,trust line,issuer,gateway,limit,quality in,out
XRPL supports tokenized assets (“**Issued Currencies**”, ICs) issued by specific accounts.

- To **hold** an IC, the holder opens a **trust line** (via `TrustSet`) to the issuer/currency pair.
- Trust lines carry:
  - **Limit** (max balance you’re willing to hold)
  - **QualityIn/Out** (transfer rates for pathfinding)
  - **Authorized/NoRipple/Freeze** flags depending on issuer policies

**Rippling:** balances can propagate across linked trust lines when enabled—useful for market making and payments across IOUs of the same currency.

## Issuer Controls & Compliance Flags

id: issuer-controls
keywords: requireauth,globalfreeze,default ripple,disallowxrp,blacklist,freeze
Issuer accounts can set flags which influence how their IOUs move:

- **RequireAuth:** trust lines must be authorized by the issuer before holding its IOU.
- **GlobalFreeze:** stop all movement of the issuer’s IOUs (emergency control).
- **DefaultRipple:** enables rippling by default on new trust lines.
- **NoFreeze/Per‑line Freeze:** ability (or inability) to freeze specific lines.
- **DisallowXRP (advisory):** signals that an account does not want to receive XRP directly (wallets may still allow it).

## Payments & Pathfinding

id: payments-pathfinding
keywords: payment,path,autobridging,partial payment,deliveredamount
Payments can be **direct** (XRP→XRP) or involve **paths** across IOUs and order books.

- **Pathfinding:** the network computes viable routes (e.g., USD.issuerA → XRP → EUR.issuerB) using **order books** and **trust lines**.
- **Autobridging:** internally bridges illiquid IOU/IOU trades through XRP to improve pricing.
- **Partial Payment:** with the `tfPartialPayment` flag, a payment can deliver less than the requested `Amount`; always read **`DeliveredAmount`** from the tx metadata to know how much actually arrived.

## Built‑in Order‑Book DEX

id: orderbook-dex
keywords: dex,offers,orderbook,offer create,offer cancel,autobridging
XRPL has a native DEX based on **offers** stored on‑ledger:

- `OfferCreate`: place a bid/ask between two assets (XRP or IOUs).
- `OfferCancel`: remove an offer by ID.
- Offers are matched during ledger close; crossing offers execute atomically.
- Prices are expressed as **quality** (ratio of TakerPays/TakerGets). Precision is high; beware rounding.

```ts
// Place a simple offer: sell 100 USD.ISSUER for XRP
const offer = await client.autofill({
  TransactionType: 'OfferCreate',
  Account: wallet.address,
  TakerGets: { currency: 'USD', issuer: 'rISSUER…', value: '100' },
  TakerPays: xrpl.xrpToDrops('200'), // you request 200 XRP
})
const signedOffer = wallet.sign(offer)
await client.submitAndWait(signedOffer.tx_blob)
```

## AMM (Automated Market Maker)

id: amm
keywords: amm,liquidity pool,lp tokens,continuous auction,arbitrage,fee vote
XRPL also supports a **native AMM** alongside the order‑book DEX.

Core ideas:

- Each pool holds **two assets** (XRP and/or IOUs) and mints **LP tokens** to depositors.
- Swaps charge a protocol fee; LPs earn pro‑rata.
- A **continuous auction** lets arbitrageurs compete to rebalance pools; proceeds benefit LPs.
- Governance parameters (e.g., trading fee) can be **voted** by LPs depending on amendment rules.

Common operations (transaction types vary by amendment revision):

- **Deposit/Withdraw**: add/remove one or both assets; receive/burn LP tokens.
- **Swap**: exchange asset A for B through the pool.
- **Auction bid**: compete for arbitrage slot to capture price divergence.

## Escrow (Time/Condition Locks)

id: escrow
keywords: escrow,timelock,hashlock,escrowcreate,escrowfinish
`EscrowCreate` locks XRP until a **time** or **condition** (hash preimage). Funds are released with `EscrowFinish` when conditions are met, or returned with `EscrowCancel` after expiration.

Use cases: conditional payouts, trust‑minimized holds.

## Payment Channels (Streaming)

id: payment-channels
keywords: payment channel,paychan,claim,high throughput,streaming
**Payment Channels** enable high‑throughput micropayments off‑ledger with on‑ledger settlement:

- Open with `PaymentChannelCreate` (fund XRP into the channel).
- Receiver obtains **claims** off‑ledger signed by the sender incrementing a cumulative amount.
- Final settlement uses `PaymentChannelClaim` to redeem the latest claim.

## Checks (Deferred Pull Payments)

id: checks
keywords: checkcreate,checkcash,checkcancel,pull payment
**Checks** allow a sender to post an authorization that a recipient later **cashes** (pull model):

- `CheckCreate` (sender)
- `CheckCash` (recipient pulls funds)
- `CheckCancel` (cancel if uncashed by expiration)

## Deposit Authorization & Preauthorization

id: deposit-auth
keywords: depositauth,depositpreauth,opt-in
Accounts may require **DepositAuth** so they only accept funds they explicitly approve.

- `DepositPreauth` lets an account **preauthorize** another account to deposit without interactive approval.

## NFTs (XLS‑20)

id: nfts
keywords: xls-20,nftmint,nftburn,nftcreateoffer,nftacceptoffer,royalties
XLS‑20 introduces **native NFTs** with protocol‑level features:

- **Mint/Burn**: `NFTokenMint`, `NFTokenBurn`
- **Offers & Trades**: `NFTokenCreateOffer`, `NFTokenCancelOffer`, `NFTokenAcceptOffer`
- **Royalties**: optional transfer fee model set by the issuer/minter
- **Brokered mode**: third‑party can broker trades with two offers

```ts
// Mint a basic NFT (XLS-20)
const mint = await client.autofill({
  TransactionType: 'NFTokenMint',
  Account: wallet.address,
  URI: xrpl.convertStringToHex('ipfs://Qm…'),
  Flags: 0,
  NFTokenTaxon: 0,
})
const signedMint = wallet.sign(mint)
await client.submitAndWait(signedMint.tx_blob)
```

## Tooling & APIs

id: tooling-apis
keywords: xrpl.js,rippled,websocket,json-rpc,streams,data api
**Servers:** `rippled` exposes JSON‑RPC & WebSocket.

**Common WebSocket methods:**

- `account_info`, `account_lines`, `account_objects`, `account_tx`
- `book_offers`, `amm_info`, `amm_assets`
- `ledger`, `ledger_entry`
- `path_find` (or `ripple_path_find`), `server_info`
- `submit`, `submit_multisigned`, `tx`
- Streams: `transactions`, `ledger`, `manifests` for real‑time updates

**SDK:** `xrpl.js` wraps signing, autofill (fee, sequence, last ledger), and binary codecs.

## Error Handling & Gotchas

id: errors-gotchas
keywords: partial payment,deliveredamount,path dry,tefPAST_SEQ,terQUEUED

- Always read `meta.DeliveredAmount` for Payments (esp. with Partial Payment), not the requested `Amount`.
- `tecPATH_DRY`: no viable path/liquidity. Adjust paths or amounts.
- `tefPAST_SEQ`: sequence already used; refresh state and rebuild.
- `terQUEUED`: tx queued; it may apply on a later ledger.
- Do not assume constant reserves/fees; query `server_info`/`ledger` parameters.

## Security & Best Practices

id: security
keywords: hardware wallet,seeds,signing,rate limits,operational security

- Keep seeds/secret keys offline; prefer hardware wallets for significant value.
- Use **multisig** for org funds; separate duties.
- Validate destination tags before sending to exchanges.
- Monitor amendment status and server load to adjust fee bidding.
- When building services, implement robust tx tracking (submitted → tentative → validated) and idempotency.

## Xaman (XUMM) & xApps

id: xumm-xapps
keywords: xumm,xaman,xapp,payload,sign request,oauth
**Xaman** is a non‑custodial XRPL wallet with an **xApp** platform that lets web apps request signatures and guide users through XRPL flows.

-### Core concepts

- **Payloads (Sign Requests):** Apps create payloads that include `txjson` (the transaction JSON) and optional `custom_meta` such as your own correlation IDs. Users review & sign directly in Xaman.
- **Lifecycle:** `created → opened → signed/declined/expired`.
- **Transport:** Deep links, QR codes, and mobile hand‑off are supported. Apps can subscribe to payload status updates via the Xumm SDK/WebSocket or poll API endpoints.
- **Security:** Users hold their own keys; the app never sees secrets. For high‑value operations, prefer hardware‑backed wallets.
- **Scopes & UX:** Good for flows like trust line setup, DEX/AMM trades, NFT ops, or account settings.

### Building a payload (high‑level)

1) Construct the **transaction JSON** (`txjson`) you want the user to sign (e.g., `Payment`, `OfferCreate`, `TrustSet`, AMM ops, NFT ops).
2) Include UX hints (e.g., a readable description) and optional `custom_meta.identifier` for correlating callbacks.
3) Present the payload to the user (deep link / QR). Track its status until resolved.

### Typical status signals to handle

- **opened:** User has opened the request.
- **signed:** Request approved; you get the signed payload and transaction hash after submission.
- **declined:** User rejected the request.
- **expired:** Request timed out (create a fresh one).

### xApps vs. regular web apps

- **xApp:** Runs inside Xaman’s embedded webview with extra integration primitives (navigation, storage, account context). Ideal when your primary users are already inside Xaman.
- **Regular web app + Xumm SDK:** Keep your own site/app and hand off signing to Xaman when needed.

### Best practices

- Provide **clear human‑readable summaries** alongside `txjson` so users understand the action.
- Validate **destination tags** and issuer accounts.
- Prefer **external‑browser auth** or native wallet auth patterns for third‑party services; avoid heavy inline OAuth inside the wallet webview for reliability.
- Make payloads **idempotent** on your backend using your own correlation ID.

## Glossary

id: glossary
keywords: definitions,terms,glossary

- **Drop**: 1e‑6 XRP.
- **UNL**: Unique Node List, your trusted validator set.
- **Rippling**: balance propagation across trust lines for same‑currency IOUs.
- **Offer**: on‑ledger order in the DEX.
- **LP Token**: receipt token representing your share of an AMM pool.
- **DeliveredAmount**: actual amount delivered in a Payment (esp. Partial Payment).

## References & Further Reading

id: references
keywords: docs,reference,amendments,whitepaper

- Official XRPL Dev Docs (APIs, tx formats, ledgers, amendments)
- `xrpl.js` repository and code samples
- rippled server docs (admin/config, peer protocols)
- Community resources on AMM, DEX, NFTs, and compliance patterns

## Toradle on XRPL: Xaman Integration, DEX Trading & Market Data

id: toradle-xaman-dex
keywords: toradle,xrpl,xaman,xumm,xapp,dex,amm,offercreate,trustset,geckoterminal,xrppl.to,xrpl.to,markets,data,tracking

**Toradle** integrates deeply with XRPL and **Xaman** to deliver actionable trading flows and complete market coverage for XRPL assets.

### What Toradle implements on XRPL

- **Xaman integration:** Toradle creates **sign requests (payloads)** for XRPL actions so users can review & sign in the Xaman wallet.
- **DEX trading:** Toradle prepares on‑ledger orders for the **built‑in DEX** using `OfferCreate` / `OfferCancel` and can guide users through **path‑finding** swaps where appropriate (including `Payment` with paths or AMM swaps per amendment availability).
- **AMM flows:** Where supported, Toradle can help construct deposits, withdrawals, and swaps against XRPL **AMM pools**, including fee/impact estimates.
- **Trust line setup:** For newly discovered or illiquid assets, Toradle can prepare `TrustSet` transactions (with sensible limits and flags) so users can hold issuer IOUs.

### Market coverage & data sources

- **All XRPL coins/tokens:** Toradle tracks the universe of XRPL issued currencies and their active markets (order‑books and AMM pools where applicable).
- **Aggregated market data:** Toradle ingests and reconciles data from:
  - **GeckoTerminal** — prices, volumes, pools/markets, and trend metrics where available.
  - **xrppl.to (xrpl.to)** — XRPL market/explorer data to complement order‑book/pool views and token metadata.
- **On‑ledger signals:** Toradle correlates external market data with on‑ledger state (offers, trades, trust lines, AMM pool info) to improve accuracy and context.

### Example XRPL actions Toradle may propose via Xaman

- **Place or cancel an order** on the DEX (`OfferCreate`, `OfferCancel`).
- **Swap via AMM** (deposit/withdraw/swap) where protocol amendments/features are available.
- **Path‑assisted payment** (`Payment` with paths/SendMax) to achieve a desired asset conversion.
- **Open a trust line** (`TrustSet`) to a reputable issuer before trading their IOU.

### Trading on Toradle (XRPL DEX + Xaman)

- **Connect Xaman & execute trades on-site:** Toradle’s web app exposes XRPL DEX actions directly in the UI. Users connect their **Xaman** wallet, review a human‑readable summary, and approve **OfferCreate/OfferCancel** (and AMM swaps where available) via Xaman sign requests.
- **Automatic portfolio tracking:** After a trade is **validated on-ledger**, Toradle detects the confirmation (via tx hash or subscription) and **auto-adds the acquired asset** to the user’s in‑app portfolio. From there, holdings are tracked with price, P&L, and position context, leveraging on‑ledger signals and aggregated market data (GeckoTerminal, xrppl.to/xrpl.to) to keep charts and summaries up to date.

### Reliability & UX

- **User‑first safety:** Clear, plain‑language summaries for every sign request and obvious indication of issuer accounts and destination tags.
- **Idempotent backend:** Every request carries an internal correlation ID so retries don’t duplicate actions.
- **Webview hygiene:** Authentication with third‑party services is done via **external browser** or native wallet patterns for stability; avoid heavyweight inline OAuth in the xApp webview.

> Note: Toradle provides analytics and tooling; it is not financial advice. Always verify issuer accounts, review path quotes, and assess risk before signing any transaction.
