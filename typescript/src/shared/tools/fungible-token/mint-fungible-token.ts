import { z } from 'zod';
import type { Context } from '@/shared/configuration';
import type { Tool } from '@/shared/tools';
import HederaParameterNormaliser from '@/shared/hedera-utils/hedera-parameter-normaliser';
import { Client } from '@hashgraph/sdk';
import { handleTransaction } from '@/shared/strategies/tx-mode-strategy';
import { mintFungibleTokenParameters } from '@/shared/parameter-schemas/hts.zod';
import HederaBuilder from '@/shared/hedera-utils/hedera-builder';
import { getMirrornodeService } from '@/shared/hedera-utils/mirrornode/hedera-mirrornode-utils';
import { PromptGenerator } from '@/shared/utils/prompt-generator';

const mintFungibleTokenPrompt = (context: Context = {}) => {
  const contextSnippet = PromptGenerator.getContextSnippet(context);
  const usageInstructions = PromptGenerator.getParameterUsageInstructions();

  return `
${contextSnippet}

This tool will mint a given amount (supply) of an existing fungible token on Hedera.

Parameters:
- tokenId (str, required): The id of the token
- amount (number, required): The amount to be minted
${usageInstructions}

Example: "Mint 1 of 0.0.6458037" means minting the amount of 1 of the token with id 0.0.6458037.
`;
};

const mintFungibleToken = async (
  client: Client,
  context: Context,
  params: z.infer<ReturnType<typeof mintFungibleTokenParameters>>,
) => {
  try {
    const mirrornodeService = getMirrornodeService(context.mirrornodeService!, client.ledgerId!);
    const normalisedParams = await HederaParameterNormaliser.normaliseMintFungibleTokenParams(
      params,
      context,
      mirrornodeService,
    );
    const tx = HederaBuilder.mintFungibleToken(normalisedParams);
    const result = await handleTransaction(tx, client, context);
    return result;
  } catch (error) {
    if (error instanceof Error) {
      return error.message;
    }
    return 'Failed to mint fungible token';
  }
};

export const MINT_FUNGIBLE_TOKEN_TOOL = 'mint_fungible_token_tool';

const tool = (context: Context): Tool => ({
  method: MINT_FUNGIBLE_TOKEN_TOOL,
  name: 'Mint Fungible Token',
  description: mintFungibleTokenPrompt(context),
  parameters: mintFungibleTokenParameters(context),
  execute: mintFungibleToken,
});

export default tool;
