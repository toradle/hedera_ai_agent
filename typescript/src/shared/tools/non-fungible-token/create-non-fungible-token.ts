import { z } from 'zod';
import type { Context } from '@/shared/configuration.js';
import type { Tool } from '@/shared/tools.js';
import HederaParameterNormaliser from '@/shared/hedera-utils/hedera-parameter-normaliser.js';
import { Client } from '@hashgraph/sdk';
import { handleTransaction } from '@/shared/strategies/tx-mode-strategy.js';
import { createNonFungibleTokenParameters } from '@/shared/parameter-schemas/hts.zod.js';
import HederaBuilder from '@/shared/hedera-utils/hedera-builder.js';
import { getMirrornodeService } from '@/shared/hedera-utils/mirrornode/hedera-mirrornode-utils.js';
import { PromptGenerator } from '@/shared/utils/prompt-generator.js';

const createNonFungibleTokenPrompt = (context: Context = {}) => {
  const contextSnippet = PromptGenerator.getContextSnippet(context);
  const treasuryAccountDesc = PromptGenerator.getAccountParameterDescription(
    'treasuryAccountId',
    context,
  );
  const usageInstructions = PromptGenerator.getParameterUsageInstructions();

  return `
${contextSnippet}

This tool creates a non-fungible token (NFT) on Hedera.

Parameters:
- tokenName (str, required): Name of the token
- tokenSymbol (str, required): Symbol of the token
- maxSupply (int, optional): Maximum NFT supply. Defaults to 100 if not provided
- ${treasuryAccountDesc}
${usageInstructions}
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
