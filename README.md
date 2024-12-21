# Hedera Agent Kit

Welcome to the **Hedera Agent Kit**! This project aims to provide a LangChain-compatible toolkit for interacting with the Hedera Network. The focus is on a minimal, easy-to-use set of functions, while staying flexible for future enhancements.

## Overview

- **Agent Interaction**: Make on-chain calls to Hedera (e.g., create tokens, post messages to consensus).
- **Lightweight**: Designed to get you started quickly with a minimal set of features.
- **Community-Driven**: We encourage developers of all skill levels to contribute.

## Features

1. **Native Hedera Token Service**: Create and manage fungible tokens with minimal parameters.
2. **Native Hedera Consensus Service**: Post messages to topics, read them in real time.
3. **Upcoming (Roadmap)**: Simple swapping on DEXs, advanced token features, and more.

## Getting Started

1. **Clone** the repo:

```bash
git clone https://github.com/jaycoolh/hedera-agent-kit.git
```

2. Install dependencies:

```bash
cd hedera-agent-kit
npm install
```

3. Configure environment variables (e.g., `OPENAI_API_KEY`, `HEDERA_ACCOUNT_ID`, `HEDERA_PRIVATE_KEY`) in a `.env` file.

4. Test the kit:

```bash
 npm run test
```

## Contributing

We welcome contributions! Please see our [CONTRIBUTING.md](https://github.com/jaycoolh/hedera-agent-kit/blob/main/CONTRIBUTING.md) for details on our process, how to get started, and how to sign your commits under the DCO.

## Roadmap

For details on upcoming features, check out our [ROADMAP.md](https://github.com/jaycoolh/hedera-agent-kit/blob/main/ROADMAP.md). If you’d like to tackle one of the tasks, look at the open issues on GitHub or create a new one if you don’t see what you’re looking for.

## License

Apache 2.0
