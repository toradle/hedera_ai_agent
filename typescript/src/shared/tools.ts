import { z } from 'zod';
import { Client } from '@hashgraph/sdk';
import { Context } from './configuration.js';
import createNonFungibleTokenTool, {
  CREATE_NON_FUNGIBLE_TOKEN_TOOL,
} from './tools/non-fungible-token/create-non-fungible-token.js';
import createFungibleTokenTool, {
  CREATE_FUNGIBLE_TOKEN_TOOL,
} from './tools/fungible-token/create-fungible-token.js';
import transferHbarTool, { TRANSFER_HBAR_TOOL } from './tools/account/transfer-hbar.js';
import airdropFungibleToken, {
  AIRDROP_FUNGIBLE_TOKEN_TOOL,
} from './tools/fungible-token/airdrop-fungible-token.js';
import submitTopicMessageTool, {
  SUBMIT_TOPIC_MESSAGE_TOOL,
} from './tools/consensus/submit-topic-message.js';
import getHbarBalanceQuery, {
  GET_HBAR_BALANCE_QUERY_TOOL,
} from './tools/queries/get-hbar-balance-query.js';
import getAccountTokenBalancesQuery, {
  GET_ACCOUNT_TOKEN_BALANCES_QUERY_TOOL,
} from './tools/queries/get-account-token-balances-query.js';
import getAccountQuery, { GET_ACCOUNT_QUERY_TOOL } from './tools/queries/get-account-query.js';
import getTopicMessagesQuery, {
  GET_TOPIC_MESSAGES_QUERY_TOOL,
} from './tools/queries/get-topic-messages-query.js';
import createTopicTool, { CREATE_TOPIC_TOOL } from './tools/consensus/create-topic.js';

export type Tool = {
  method: string;
  name: string;
  description: string;
  parameters: z.ZodObject<any, any>;
  execute: (client: Client, context: Context, params: any) => Promise<any>;
};

const tools = (context: Context): Tool[] => [
  createFungibleTokenTool(context),
  createNonFungibleTokenTool(context),
  transferHbarTool(context),
  airdropFungibleToken(context),
  createTopicTool(context),
  submitTopicMessageTool(context),
  getHbarBalanceQuery(context),
  getAccountQuery(context),
  getAccountTokenBalancesQuery(context),
  getTopicMessagesQuery(context),
];

export const ALL_TOOLS = [
  CREATE_FUNGIBLE_TOKEN_TOOL,
  CREATE_NON_FUNGIBLE_TOKEN_TOOL,
  TRANSFER_HBAR_TOOL,
  AIRDROP_FUNGIBLE_TOKEN_TOOL,
  CREATE_TOPIC_TOOL,
  SUBMIT_TOPIC_MESSAGE_TOOL,
  GET_HBAR_BALANCE_QUERY_TOOL,
  GET_ACCOUNT_QUERY_TOOL,
  GET_ACCOUNT_TOKEN_BALANCES_QUERY_TOOL,
  GET_TOPIC_MESSAGES_QUERY_TOOL,
];

export default tools;
