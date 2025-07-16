import { z } from 'zod';
import type { Context } from '../../configuration';
import type { Tool } from '../../tools';
import HederaParameterNormaliser from '../../hedera-utils/hedera-parameter-normaliser';
import { Client } from '@hashgraph/sdk';
import { handleTransaction } from '../../strategies/tx-mode-strategy';
import { createNonFungibleTokenParameters } from '../../parameter-schemas/hts.zod';
import HederaBuilder from '../../hedera-utils/hedera-builder';

const createNonFungibleTokenPrompt = (_context: Context = {}) => `
This tool will create a non-fungible token on Hedera.

It takes four arguments:
- tokenName (str): The name of the token.
- tokenSymbol (str, optional): The symbol of the token.
- maxSupply (int, optional): The max supply of the NFT token.
- treasuryAccountId (str, optional): The treasury account of the token.
`;



const createNonFungibleToken = async (
  client: Client,
  context: Context,
  params: z.infer<ReturnType<typeof createNonFungibleTokenParameters>>
) => {
  try {
    const normalisedParams = HederaParameterNormaliser.normaliseCreateNonFungibleTokenParams(params, context, client)
    const tx = HederaBuilder.createNonFungibleToken(normalisedParams)
    const result = await handleTransaction(tx, client, context)
    console.log("Result from create non-fungible token", result)
    return result
  } catch (error) {
    if (error instanceof Error) {
      return error.message
    }
    return 'Failed to create non-fungible token'; // TODO: make this a more specific error
  }
}



const tool = (context: Context): Tool => ({
  method: 'create_non_fungible_token',
  name: 'Create Non-Fungible Token',
  description: createNonFungibleTokenPrompt(context),
  parameters: createNonFungibleTokenParameters(context),
  actions: {
    nonFungibleToken: {
      create: true,
    },
  },
  execute: createNonFungibleToken,
});

export default tool;
