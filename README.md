# Hedera Agent Kit

![npm version](https://badgen.net/npm/v/hedera-agent-kit)
![license](https://badgen.net/github/license/hedera-dev/hedera-agent-kit)
![build](https://badgen.net/github/checks/hedera-dev/hedera-agent-kit)

> Build Hedera-powered AI agents **in under a minute**.

## 📋 Contents

- [🚀 60-Second Quick-Start](#-60-second-quick-start)
- [Key Features](#key-features)
- [Core Concepts](#core-concepts)
- [Handling Conversations](#handling-conversations)
- [Creating Custom Plugins](#creating-custom-plugins)
- [Advanced Usage](#advanced-usage)
- [Available Tools](#️available-tools)
- [Architecture Diagram](#architecture-diagram)
- [Local Development & Contributing](#local-development--contributing)
- [License & Credits](#license)

---

## 🚀 60-Second Quick-Start

### 1 – Install
```bash
npm install hedera-agent-kit           # or yarn / pnpm
```


### 2 – Add Environment Variables
Create a `.env` next to your script:
```env
OPENAI_API_KEY=sk-...
HEDERA_ACCOUNT_ID=0.0.xxx
HEDERA_PRIVATE_KEY=302e020100300506032b6570...
HEDERA_NETWORK=testnet
```

### 3 – Minimal "Hello-Hedera"
```ts
import { ? } from 'hedera-agent-kit';
import * as dotenv from 'dotenv';
dotenv.config();

(async () => {
  const signer = new ServerSigner(process.env.HEDERA_ACCOUNT_ID!, process.env.HEDERA_PRIVATE_KEY!, 'testnet');
  ...
  await agent.initialize();
  const res = await agent.processMessage('What is my HBAR balance?');
  console.log(res.message);
})();
```

### 4 – Interactive Demos
```bash
git clone https://github.com/hedera-dev/hedera-agent-kit.git
cd hedera-agent-kit
npm install
cp .env.example .env   # add your keys
# Autonomous (agent signs & pays)
npm run demo:auto
# Human-in-the-loop (agent returns transaction bytes, user signs in wallet)
npm run demo:human  # Requires USER_ACCOUNT_ID and USER_PRIVATE_KEY env vars for human signer
```

---

## Key Features
- Are the next things correct?
- Comprehensive toolset (Hedera Token Service, Hedera Consensus Service, Hedera Account Service, Hedera Smart Contract Service)
- Extensible plugin system (see how to create your own plugnins [here]()
- Simplified @hashgraph/sdk interaction

---

## Core Concepts
| Concept | Purpose |
|---------|---------|
| **`HederaAgentKit`** | Core engine bundling tools & network clients |
| **Operational Modes** | `autonomous` (execute)<br>`returnBytes` (return bytes).

---

## Handling Conversations
### Processing a Prompt
```ts
?
```

### Response Types
- Text only
- `transactionBytes` → present to wallet / sign

### Chat-History Tips
* ?

<details>
<summary>📋 Full Flow Example</summary>

```ts
import { ? } from 'hedera-agent-kit';
import prompts from 'prompts';
?
```
</details>

---

## Creating Custom Plugins

Check out our [Plugin Development Guide](https://github.com/hedera-dev/hedera-agent-kit/blob/main/docs/PLUGINS.md)

## Advanced Usage
| Topic | Summary |
|-------|---------|
| Using `HederaAgentKit` directly | Programmatic control with service builders |
| Plugin System | Load custom tools from local dirs or npm packages |

<details>
<summary>Direct Kit Usage</summary>

```ts
import {
  HederaAgentKit,
  ServerSigner,
} from 'hedera-agent-kit';
import { Hbar } from '@hashgraph/sdk';

async function useKitDirectly() {
  const signer = new ServerSigner(
    process.env.HEDERA_ACCOUNT_ID!,
    process.env.HEDERA_PRIVATE_KEY!,
    'testnet'
  );
  const kit = new HederaAgentKit(signer, undefined, 'autonomous');
  await kit.initialize();

  // Transfer HBAR
  const transferResult = await kit
    .accounts()
    .transferHbar({
      transfers: [
        { accountId: '0.0.RECIPIENT', amount: new Hbar(1) },
        { accountId: signer.getAccountId().toString(), amount: new Hbar(-1) },
      ],
      memo: 'Direct kit HBAR transfer',
    })
    .execute();
  console.log('Transfer result:', transferResult);

  // Create a token
  const createTokenResult = await kit
    .hts()
    .createFungibleToken({
      name: 'My Token',
      symbol: 'TKN',
      decimals: 2,
      initialSupply: 1000,
      maxSupply: 10000,
      memo: 'My first token',
    })
    .execute();
  console.log('Token created:', createTokenResult);
}
```
</details>

<details>
<summary>Plugin Loading</summary>

```ts
import {
  HederaConversationalAgent,
  ServerSigner,
} from 'hedera-agent-kit';

import { HelloWorldPlugin } from './examples/hello-world-plugin'; // or your own plugin

async function useCustomPlugin() {
  const signer = new ServerSigner(
    process.env.HEDERA_ACCOUNT_ID!,
    process.env.HEDERA_PRIVATE_KEY!,
    'testnet'
  );

  // Create the kit with plugin configuration
  const kit = new HederaConversationalAgent(
    signer,
    openAIApiKey: openaiApiKey,
    openAIModelName: 'gpt-4o-mini',
    pluginConfig: {
      plugins: [
        new HelloWorldPlugin()
      ]
    }
  );

  await kit.initialize();

  // Now the kit has all your plugin tools available
  const tools = kit.getAggregatedLangChainTools();
  console.log(
    'Available tools including plugins:',
    tools.map((t) => t.name)
  );
}
```
</details>

---

## Available Hedera Tools
Service categories:
1. Account Management
2. HBAR Transfers
3. Token Service (HTS)
4. Consensus Service (HCS)
6. Smart Contracts

👉 See [docs/TOOLS.md](docs/TOOLS.md) for the full catalogue & usage examples.

---

## Architecture Diagram
```mermaid
graph TD;
    ?
    end
```

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