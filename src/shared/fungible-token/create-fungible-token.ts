import HederaAgentKit from '../../hedera-agent-kit';
import { z } from 'zod';
import type { Context } from '../configuration';
import type { Tool } from '../tools';

export const createFungibleTokenPrompt = (_context: Context = {}) => `
This tool will create a fungible token on Hedera.

It takes four arguments:
- tokenName (str): The name of the token.
- tokenSymbol (str, optional): The symbol of the token.
- initialSupply (int, optional): The initial supply of the token.
- treasuryAccountId (str, optional): The treasury account of the token.
`;

export const createFungibleToken = async (
  hederaAgentKit: HederaAgentKit,
  context: Context,
  params: z.infer<ReturnType<typeof createFungibleTokenParameters>>
) => {
  try {
    const result = await hederaAgentKit.createFungibleToken(
      params,
      context
    );

    console.log("Result from create fungible token", result)

    return result;
  } catch (error) {
    console.log("Errored...")
    console.error(error)
    return 'Failed to create product';
  }
};

export const createFungibleTokenParameters = (_context: Context = {}) =>
  z.object({
    tokenName: z.string().describe('The name of the token.'),
    tokenSymbol: z
      .string()
      .describe('The symbol of the token.'),
    initialSupply: z
      .int()
      .optional()
      .describe('The initial supply of the token.'),
    treasuryAccountId: z
      .string()
      .optional()
      .describe('The treasury account of the token.'),

  });

const tool = (context: Context): Tool => ({
  method: 'create_fungible_token',
  name: 'Create Fungible Token',
  description: createFungibleTokenPrompt(context),
  parameters: createFungibleTokenParameters(context),
  actions: {
    fungibleToken: {
      create: true,
    },
  },
  execute: createFungibleToken,
});

export default tool;
