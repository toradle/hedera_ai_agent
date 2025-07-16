import HederaAgentLangchainToolkit from '../langchain/toolkit';
import { ChatOpenAI } from '@langchain/openai';
import type { ChatPromptTemplate } from '@langchain/core/prompts';
import { pull } from 'langchain/hub';
import { AgentExecutor, createStructuredChatAgent } from 'langchain/agents';
import { Client, PrivateKey } from '@hashgraph/sdk';
import { AgentMode } from '@/shared/configuration';
import * as dotenv from 'dotenv';

dotenv.config();

const llm = new ChatOpenAI({
  model: 'gpt-4o-mini',
});

const client = Client.forTestnet().setOperator(
  process.env.ACCOUNT_ID!,
  PrivateKey.fromStringED25519(process.env.PRIVATE_KEY!),
);

const hederaAgentToolkit = new HederaAgentLangchainToolkit({
  client,
  configuration: {
    actions: {
      fungibleToken: {
        create: true,
        airdrop: true,
        transfer: true,
      },
      nonFungibleToken: {
        create: true,
      },
      account: {
        transfer: true,
      },
      consensus: {
        createTopic: true,
        submitTopicMessage: true,
      },
    },
    context: {
      mode: AgentMode.AUTONOMOUS,
      // accountId: '0.0.123123', // TODO: accountId should be passed only if the AgentMode is non-custodial?
    },
  },
});

(async (): Promise<void> => {
  const prompt = await pull<ChatPromptTemplate>('hwchase17/structured-chat-agent');

  const tools = hederaAgentToolkit.getTools();

  const agent = await createStructuredChatAgent({
    llm,
    tools,
    prompt,
  });

  const agentExecutor = new AgentExecutor({
    agent,
    tools,
    returnIntermediateSteps: true,
  });

  // EXAMPLE PROMPT FOR FT CREATION
  // const response = await agentExecutor.invoke({
  //   input: `
  //     Create a token called Hello World with symbol HELLO with treasury account 0.0.123123.
  //   `,
  // });

  // EXAMPLE PROMPT FOR NFT CREATION
  // const response = await agentExecutor.invoke({
  //   input: `
  //     Create a nft token called Hello World with symbol HELLO.
  //   `,
  // });

  // const response = await agentExecutor.invoke({
  //   input: `
  //     Transfer 0.1 HBAR to account 0.0.123123. Add memo to transaction 'testing the tx'
  //   `,
  // });

  // EXAMPLE PROMPT FOR FT AIRDROP
  // const response = await agentExecutor.invoke({
  //   input: `
  //       Airdrop 100 tokens 0.0.5445171 to account 0.0.123123.
  //   `,
  // })

  // EXAMPLE PROMPT FOR TOKEN TRANSFER
  // const response = await agentExecutor.invoke({
  //   input: `
  //     Transfer 10 tokens of token ID 0.0.5445171 to account 0.0.6360769. Add memo 'Happy Birthday!'
  //   `,
  // });

  // EXAMPLE PROMPT FOR TOPIC CREATION
  // const response = await agentExecutor.invoke({
  //   input: `
  //     Create topic with memo 'Hello World'. Set the admin key. Set submit key to 0x134b3a67bfab5fc4c32f1412839f24f95436a6145006400c1e523372107d99a2.
  //   `,
  // });

  // EXAMPLE PROMPT FOR TOPIC MESSAGE SUBMISSION
  const response = await agentExecutor.invoke({
    input: `
      Submit message "hello, HCS!" to topic 0.0.6361367.
    `,
  });

  console.log(response);
})();
