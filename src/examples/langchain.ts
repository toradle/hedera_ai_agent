import HederaAgentLangchainToolkit from '../langchain/toolkit';
import { ChatOpenAI } from '@langchain/openai';
import type { ChatPromptTemplate } from '@langchain/core/prompts';
import { pull } from 'langchain/hub';
import { AgentExecutor, createStructuredChatAgent } from 'langchain/agents';
import { Client, LedgerId } from '@hashgraph/sdk';
import { AgentMode } from '../shared/configuration';
import 'dotenv/config';

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
      accountQuery: {
        getAccountBalanceQuery: true,
        getAccountQuery: true,
        getAccountTokenBalancesQuery: true,
        getTopicMessagesQuery: true,
      },
    },
    context: {
      mode: AgentMode.RETURN_BYTES,
      accountId: '0.0.123123',
      mirrornodeConfig: {
        ledgerId: LedgerId.TESTNET,
      },
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

  // const response0 = await agentExecutor.invoke({
  //   input: `
  //    Which tools do you support?
  //   `,
  // });

  // console.log(response0);

  // const response = await agentExecutor.invoke({
  //   input: `
  //    Query the token balances for the hedera account 0.0.3038269.
  //   `,
  // });

  // console.log(response);

  // const response2 = await agentExecutor.invoke({
  //   input: `
  //    Query the token balances for the Hedera account 0.0.3038269 and token 0.0.3989799.
  //   `,
  // });

  // console.log(response2);

  // const response3 = await agentExecutor.invoke({
  //   input: `
  //    Query the account information for the hedera account 0.0.3038269.
  //   `,
  // });

  //console.log(response3);

  const response0 = await agentExecutor.invoke({
    input: `
      Get the topic messages for the topic 0.0.6363003. 
    `,
  });

  console.log(response0);
})();
