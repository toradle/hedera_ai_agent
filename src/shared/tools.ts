import { z } from 'zod';
import { Context } from './configuration';
import nonFungibleTokenTool from './tools/non-fungible-token/create-non-fungible-token';
import fungibleTokenTool from './tools/fungible-token/create-fungible-token';
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
  fungibleTokenTool(context),
  nonFungibleTokenTool(context),
]

export default tools;
