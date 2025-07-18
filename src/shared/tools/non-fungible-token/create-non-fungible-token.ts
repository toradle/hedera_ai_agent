import { z } from 'zod';
import type { Context } from '../../configuration';
import type { Tool } from '../../tools';
import HederaParameterNormaliser from '../../hedera-utils/hedera-parameter-normaliser';
import { Client } from '@hashgraph/sdk';
import { handleTransaction } from '../../strategies/tx-mode-strategy';
import { createNonFungibleTokenParameters } from '../../parameter-schemas/hts.zod';
import HederaBuilder from '../../hedera-utils/hedera-builder';
import { getMirrornodeService } from '../../hedera-utils/mirrornode/hedera-mirrornode-utils';

const createNonFungibleTokenPrompt = (context: Context = {}) => {
  const contextInfo = context.accountId
    ? `context:
  - operator Account: ${context.accountId}. This is the user's account and will be referred to as "my account".`
    : `context:
  - operator Account: not defined.
`;

  return `
${contextInfo}

This tool creates a non-fungible token (NFT) on Hedera.

Arguments:
- tokenName (str): Name of the token.
- tokenSymbol (str): Symbol of the token.
- maxSupply (int, optional): Maximum NFT supply. Defaults to 100 if not provided.
- treasuryAccountId (str, optional): Token treasury account. Defaults to operator account if not specified.
`;
};

const createNonFungibleToken = async (
  client: Client,
  context: Context,
  params: z.infer<ReturnType<typeof createNonFungibleTokenParameters>>,
) => {
  try {
    const mirrornodeService = getMirrornodeService(context.mirrornodeService!, client.ledgerId!);
    const normalisedParams = await HederaParameterNormaliser.normaliseCreateNonFungibleTokenParams(
      params,
      context,
      client,
      mirrornodeService,
    );
    const tx = HederaBuilder.createNonFungibleToken(normalisedParams);
    const result = await handleTransaction(tx, client, context);
    console.log('Result from create non-fungible token', result);
    return result;
  } catch (error) {
    if (error instanceof Error) {
      return error.message;
    }
    return 'Failed to create non-fungible token';
  }
};

export const CREATE_NON_FUNGIBLE_TOKEN_TOOL = 'create_non_fungible_token';

const tool = (context: Context): Tool => ({
  method: CREATE_NON_FUNGIBLE_TOKEN_TOOL,
  name: 'Create Non-Fungible Token',
  description: createNonFungibleTokenPrompt(context),
  parameters: createNonFungibleTokenParameters(context),
  execute: createNonFungibleToken,
});

export default tool;
