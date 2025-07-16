import HederaAgentLangchainToolkit from '../langchain/toolkit';
import { ChatOpenAI } from '@langchain/openai';
import type { ChatPromptTemplate } from '@langchain/core/prompts';
import { pull } from 'langchain/hub';
import { AgentExecutor, createStructuredChatAgent } from 'langchain/agents';
import { Client } from '@hashgraph/sdk';
import { AgentMode } from "../shared/configuration";
import * as dotenv from 'dotenv';
dotenv.config();

const llm = new ChatOpenAI({
  model: 'gpt-4o-mini',
});

const client = Client.forTestnet();
//.setOperator(process.env.ACCOUNT_ID!, PrivateKey.fromStringED25519(process.env.PRIVATE_KEY!))

const hederaAgentToolkit = new HederaAgentLangchainToolkit({
  client,
  configuration: {
    actions: {
      fungibleToken: {
        create: true,
      },
    },
    context: {
      mode: AgentMode.RETURN_BYTES,
      accountId: '0.0.123123',
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

  const response = await agentExecutor.invoke({
    input: `
      Create a token called Hello World with symbol HELLO with treasury account 0.0.123123. 
    `,
  });

  console.log(response);
})();
