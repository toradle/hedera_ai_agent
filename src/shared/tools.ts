import { z } from 'zod';
import { Context } from './configuration';
import createNonFungibleTokenTool from './tools/non-fungible-token/create-non-fungible-token';
import createFungibleTokenTool from './tools/fungible-token/create-fungible-token';
import transferHbarTool from './tools/account/transfer-hbar';
import { Client } from '@hashgraph/sdk';

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
  createFungibleTokenTool(context),
  createNonFungibleTokenTool(context),
  transferHbarTool(context),
]

export default tools;
