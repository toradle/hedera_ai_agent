import { z } from 'zod';
import type { Context } from '../../configuration';
import type { Tool } from '../../tools';
import HederaParameterNormaliser from '../../hedera-utils/hedera-parameter-normaliser';
import { Client } from '@hashgraph/sdk';
import { handleTransaction } from '../../strategies/tx-mode-strategy';
import { createFungibleTokenParameters } from '../../parameter-schemas/hts.zod';
import HederaBuilder from '../../hedera-utils/hedera-builder';

export const createFungibleTokenPrompt = (_context: Context = {}) => `
This tool will create a fungible token on Hedera.

It takes four arguments:
- tokenName (str): The name of the token.
- tokenSymbol (str, optional): The symbol of the token.
- initialSupply (int, optional): The initial supply of the token.
- treasuryAccountId (str, optional): The treasury account of the token.
`;

export const createFungibleToken = async (
  client: Client,
  context: Context,
  params: z.infer<ReturnType<typeof createFungibleTokenParameters>>,
) => {
  try {
    const normalisedParams = HederaParameterNormaliser.normaliseCreateFungibleTokenParams(
      params,
      context,
      client,
    );
    const tx = HederaBuilder.createFungibleToken(normalisedParams);
    const result = await handleTransaction(tx, client, context);
    console.log('Result from create fungible token', result);
    return result;
  } catch (error) {
    if (error instanceof Error) {
      return error.message;
    }
    return 'Failed to create product'; // TODO: make this a more specific error
  }
};

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
