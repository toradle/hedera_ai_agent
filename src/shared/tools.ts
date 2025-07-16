import { z } from 'zod';
import { Context } from './configuration';
import createFungibleToken from './tools/fungible-token/create-fungible-token';
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
  createFungibleToken(context)
]

export default tools;
