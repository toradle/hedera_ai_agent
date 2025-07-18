import { z } from 'zod';
import type { Context } from '@/shared/configuration.js';
import type { Tool } from '@/shared/tools.js';
import HederaParameterNormaliser from '@/shared/hedera-utils/hedera-parameter-normaliser.js';
import { Client } from '@hashgraph/sdk';
import { handleTransaction } from '@/shared/strategies/tx-mode-strategy.js';
import { createFungibleTokenParameters } from '@/shared/parameter-schemas/hts.zod.js';
import HederaBuilder from '@/shared/hedera-utils/hedera-builder.js';
import { getMirrornodeService } from '@/shared/hedera-utils/mirrornode/hedera-mirrornode-utils.js';

const createFungibleTokenPrompt = (context: Context = {}) => {
  const contextInfo = context.accountId
    ? `context:
  - operator Account: ${context.accountId}. This is the user's account and will be referred to as "my account".`
    : `context:
  - operator Account: not defined.
`;

  return `
  ${contextInfo}

This tool creates a fungible token on Hedera.

It accepts the following arguments:
- tokenName (str): The name of the token.
- tokenSymbol (str, optional): The symbol of the token.
- initialSupply (int, optional): The initial supply of the token.
- supplyType (str, optional): The supply type of the token. Can be "finite" or "infinite". Defaults to "finite".
- maxSupply (int, optional): The maximum supply of the token. Only applicable if supplyType is "finite". Defaults to 1,000,000 if not specified.
- decimals (int, optional): The number of decimals the token supports. Defaults to 0.
- treasuryAccountId (str, optional): The Hedera account that will act as the treasury. Defaults to the operator account.

Key:
- supplyKey (boolean): If user wants to set supply key set to true, otherwise false.
`;
};

const createFungibleToken = async (
  client: Client,
  context: Context,
  params: z.infer<ReturnType<typeof createFungibleTokenParameters>>,
) => {
  try {
    const mirrornodeService = getMirrornodeService(context.mirrornodeService!, client.ledgerId!);
    const normalisedParams = await HederaParameterNormaliser.normaliseCreateFungibleTokenParams(
      params,
      context,
      client,
      mirrornodeService,
    );
    const tx = HederaBuilder.createFungibleToken(normalisedParams);
    const result = await handleTransaction(tx, client, context);
    console.log('Result from create fungible token', result);
    return result;
  } catch (error) {
    if (error instanceof Error) {
      return error.message;
    }
    return 'Failed to create fungible token';
  }
};

export const CREATE_FUNGIBLE_TOKEN_TOOL = 'create_fungible_token';

const tool = (context: Context): Tool => ({
  method: CREATE_FUNGIBLE_TOKEN_TOOL,
  name: 'Create Fungible Token',
  description: createFungibleTokenPrompt(context),
  parameters: createFungibleTokenParameters(context),
  execute: createFungibleToken,
});

export default tool;
