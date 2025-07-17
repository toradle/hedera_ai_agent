import { z } from 'zod';
import { Context } from './configuration';
import createFungibleToken from './tools/fungible-token/create-fungible-token';
import { Client } from '@hashgraph/sdk';
import getHbarBalanceQuery from './tools/queries/get-hbar-balance-query';
import getAccountTokenBalancesQuery from './tools/queries/get-account-token-balances-query';
import getAccountQuery from './tools/queries/get-account-query';
import getTopicMessagesQuery from './tools/queries/get-topic-messages-query';

export type Tool = {
  method: string;
  name: string;
  description: string;
  parameters: z.ZodObject<any, any>;
  execute: (client: Client, context: Context, params: any) => Promise<any>;
};

const tools = (context: Context): Tool[] => [
  createFungibleToken(context),
  getHbarBalanceQuery(context),
  getAccountQuery(context),
  getAccountTokenBalancesQuery(context),
  getTopicMessagesQuery(context),
];

export default tools;
