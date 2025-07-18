# Hedera Agent Kit

![npm version](https://badgen.net/npm/v/hedera-agent-kit)
![license](https://badgen.net/github/license/hedera-dev/hedera-agent-kit)
![build](https://badgen.net/github/checks/hedera-dev/hedera-agent-kit)

> Build Hedera-powered AI agents **in under a minute**.

## 📋 Contents

- [🚀 60-Second Quick-Start](#-60-second-quick-start)
- [Key Features](#key-features)
- [Core Concepts](#core-concepts)
- [Available Hedera Tools](#available-hedera-tools)
- [Creating Tools](#creating-tools)
- [Local Development & Contributing](#local-development--contributing)
- [License & Credits](#license)   

---

## 🚀 60-Second Quick-Start

### 1 – Install
```bash
npm install hedera-agent-kit           # or yarn / pnpm
```

**Requirements** 
- Node.js v20 or higher


### 2 – Configure: Add Environment Variables
Create a `.env` next to your script:
```env
OPENAI_API_KEY=sk-...
HEDERA_ACCOUNT_ID=0.0.xxx
HEDERA_PRIVATE_KEY=302e020100300506032b6570...
HEDERA_NETWORK=testnet
```

### 3 – Minimal "Hello-Hedera"


### 4 – Conversational Agent Demo

### 5 – Tool Example

---

## Key Features
This version of the Hedera Agent Kit, known as v3, is a complete rewrite of the original version. It is designed to be more flexible and easier to use, with a focus on developer experience. It enables direct API execution through a simple HederaAgentAPI class

---

## Core Concepts
| Concept | Purpose |
|---------|---------|
| **`HederaAgentKit`** | Core engine bundling tools & network clients |
| **Operational Modes** | `autonomous` (execute)<br>`returnBytes` (return bytes).

---

## Available Hedera Tools
- create_fungible_token
- create_non_fungible_token
- transfer_hbar_tool
- airdrop_fungible_token
- transfer_fungible_token

### Hedera Transaction Tools


### Query Tools
Query tools are for (free) interactions with Hedera mirror nodes

👉 See [docs/TOOLS.md](docs/TOOLS.md) for the full catalogue & usage examples.

---
## Creating Tools
---

## Local Development & Contributing
```bash
git clone https://github.com/hedera-dev/hedera-agent-kit.git
cd hedera-agent-kit
npm install
cp .env.example .env   # add your keys
```
Please read [CONTRIBUTING.md](./CONTRIBUTING.md) and sign your commits under the DCO.

## License
Apache 2.0

## Credits
Special thanks to the developer of the [Stripe Agent Toolkit](https://github.com/stripe/agent-toolkit) who provided the inspiration for the architecture and patterns used in this project.