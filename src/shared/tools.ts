import { z } from 'zod';
import { Context } from './configuration';
import createFungibleToken from './tools/queries/create-fungible-token';
import { Client } from '@hashgraph/sdk';
import getHbarBalance from './tools/fungible-token/get-hbar-balance';

export type Tool = {
  method: string;
  name: string;
  description: string;
  parameters: z.ZodObject<any, any>;
  actions: {
    [key: string]: {
      [action: string]: boolean;
    };
  };
  execute: (client: Client, context: Context, params: any) => Promise<any>;
};

const tools = (context: Context): Tool[] => [
  createFungibleToken(context),
  getHbarBalance(context)
]

export default tools;
