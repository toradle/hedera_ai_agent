import { z } from 'zod';
import { Client } from '@hashgraph/sdk';
import { Context } from './configuration';
import createNonFungibleTokenTool from './tools/non-fungible-token/create-non-fungible-token';
import createFungibleTokenTool from './tools/fungible-token/create-fungible-token';
import transferHbarTool from './tools/account/transfer-hbar';
import airdropFungibleToken from './tools/fungible-token/airdrop-fungible-token';
import submitTopicMessageTool from './tools/consensus/submit-topic-message';
import getHbarBalanceQuery from './tools/queries/get-hbar-balance-query';
import getAccountTokenBalancesQuery from './tools/queries/get-account-token-balances-query';
import getAccountQuery from './tools/queries/get-account-query';
import getTopicMessagesQuery from './tools/queries/get-topic-messages-query';
import createTopicTool from './tools/consensus/create-topic';

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

export default tools;
