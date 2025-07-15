import { z } from 'zod';
import { Context } from './configuration';
import HederaAgentKit from '../hedera-agent-kit';
import createFungibleToken from './fungible-token/create-fungible-token';

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
  execute: (hederaAgentKit: HederaAgentKit, context: Context, params: any) => Promise<any>;
};

const tools = (context: Context): Tool[] => [
  createFungibleToken(context)
]

export default tools;
