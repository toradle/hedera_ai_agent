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
npm i hedera-agent-kit           # or yarn / pnpm
```

**Requirements** 
- Node.js v20 or higher

**Dependencies**
* Hedera [Hashgraph SDK](https://github.com/hiero-ledger/hiero-sdk-js) and API
* [Langchain Tools](https://js.langchain.com/docs/concepts/tools/) 
* zod 
* dotenv

### 2 – Configure: Add Environment Variables
Copy `typescript/examples/langchain/.env.example` to `typescript/examples/langchain/.env`:
yt
```bash
cd typescript/examples/langchain
cp .env.example .env
```

Add in your [Hedera API](https://portal.hedera.com/dashboard) and [OPENAPI](https://platform.openai.com/api-keys) Keys

```env
ACCOUNT_ID= 0.0.xxxxx
PRIVATE_KEY= 302e...
OPENAI_API_KEY= sk-proj-...
```

### 3 – Run the Example Tool Calling Agent 
With the tool-calling-agent, you can experiment with and call the [available tools](docs/TOOLS.md) in the Hedera Agent Kit for the operator account (the account you are using in the .env file). This example tool-calling-agent uses GPT 4-o-mini that is a simple template you can use with other LLMs.


1. First, go into the directory where the example is and run `npm install`

```bash
cd typescript/examples/langchain
npm install
```
2. Then, run the example

```bash
cd ../..
npm run langchain:tool-calling-agent
```

> You may want to install `ts-node` globally to run the examples using: `npm install -g ts-node`

3. interact with the agent. First, tell the agent who you are (your name) and try out some of the interactions by asking questions: 
  *  _What can you help me do with Hedera?_ 
  * _What's my current HBAR balance?_ 
  * _Create a new topic called 'Daily Updates_ 
  * _Submit the message 'Hello World' to topic 0.0.12345_ 
  * _Create a fungible token called 'MyToken' with symbol 'MTK'_ 
  * _Check my balance and then create a topic for announcements_ 
  * _Create a token with 1000 initial supply and then submit a message about it to topic 0.0.67890_ 
  

### 4 – Run the Structured Chat Agent 


---

## Key Features
This version of the Hedera Agent Kit, known as v3, is a complete rewrite of the original version. It is designed to be more flexible and easier to use, with a focus on developer experience. It enables direct API execution through a simple HederaAgentAPI class, with an individual LangChain tools call for each example.


---

## Core Concepts

#### Agent Execution Modes
This tool has two execution modes with AI agents;  autonomous excution and return bytes. If you set:
 * `mode: AgentMode.RETURN_BYTE` the transaction will be executed, and the bytes to execute the Hedera transaction will be returned. 
 * `mode: AgentMode.AUTONOMOUS` the transaction will be executed autonomously, using the accountID set (the operator account can be set in the client with `.setOperator(process.env.ACCOUNT_ID!`)

#### Hedera Transaction Tools
The Hedera Agent Kit provides a set of tools to execute transactions on the Hedera network, which we will be expanding in the future. To requset more fundtionality, please [open an issue]().

**Available Tools**
* Transfer HBAR
* Create a Topic
* Submit a message to a Topic
* Create a Fungible Token
* Create a Non-Fungible Token
* Airdrop Fungible Tokens
* Transfer Fungible Tokens

See the implementation details in [docs/TOOLS.md](docs/TOOLS.md)

#### Hedera Mirror Node Query Tools
The Hedera network is made up of two types of nodes: consensus nodes and mirror nodes. Mirror nodes are free to query, and maintain a copy of the state of the network for users to query. 

This toolkit provides a set of tools to query the state of the network, including accounts, tokens, and transactions. To requset more fundtionality, please [open an issue]().

The Hedera Agent Kit provides a set of tools to execute query these nodes:

* Get Account Query
* Get HBAR Balance Query
* Get Account Token Balances Query
* Get Topic Messages Query

See the implementation details in [docs/TOOLS.md](docs/TOOLS.md)
#### Conversational Agent


## Agent Kit Tools
👉 See [docs/TOOLS.md](docs/TOOLS.md) for the full catalogue & usage examples.

---
## Creating Tools

## Local Development & Contributing
```bash
git clone https://github.com/hedera-dev/hedera-agent-kit.git
cd hedera-agent-kit
npm install
cp typescript/examples/langchain/.env.example your/file/path/.env   # add your keys
```
Please read [CONTRIBUTING.md](./CONTRIBUTING.md) and sign your commits under the DCO.

## License
Apache 2.0

## Credits
Special thanks to the developer of the [Stripe Agent Toolkit](https://github.com/stripe/agent-toolkit) who provided the inspiration for the architecture and patterns used in this project.