import HederaAgentLangchainToolkit from "../langchain/toolkit";
import { ChatOpenAI } from "@langchain/openai";
import type { ChatPromptTemplate } from "@langchain/core/prompts";
import { pull } from "langchain/hub";
import { AgentExecutor, createStructuredChatAgent } from "langchain/agents";
import { Client, LedgerId, PrivateKey } from "@hashgraph/sdk";
import { AgentMode } from "../shared/configuration";

require("dotenv").config();

const llm = new ChatOpenAI({
  model: 'gpt-4o-mini',
});

const client = Client.forTestnet()
client.ledgerId
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
      accountId: "0.0.123123",
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

  const response = await agentExecutor.invoke({
    input: `
     Get the balance of the account0.0.6360977. 
    `,
  });

  console.log(response);
})();
