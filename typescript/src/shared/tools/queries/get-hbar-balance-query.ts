import { z } from 'zod';
import type { Context } from '@/shared/configuration';
import type { Tool } from '@/shared/tools';
import { Client } from '@hashgraph/sdk';
import { accountBalanceQueryParameters } from '@/shared/parameter-schemas/account-query.zod';
import BigNumber from 'bignumber.js';
import { getMirrornodeService } from '@/shared/hedera-utils/mirrornode/hedera-mirrornode-utils';
import HederaParameterNormaliser from '@/shared/hedera-utils/hedera-parameter-normaliser';
import { PromptGenerator } from '@/shared/utils/prompt-generator';

export const getHbarBalanceQueryPrompt = (context: Context = {}) => {
  const contextSnippet = PromptGenerator.getContextSnippet(context);
  const accountDesc = PromptGenerator.getAccountParameterDescription('accountId', context);
  const usageInstructions = PromptGenerator.getParameterUsageInstructions();

  return `
${contextSnippet}

This tool will return the HBAR balance in tinybar for a given Hedera account.

Parameters:
- ${accountDesc}
${usageInstructions}
`;
};

export const getHbarBalanceQuery = async (
  client: Client,
  context: Context,
  params: z.infer<ReturnType<typeof accountBalanceQueryParameters>>,
) => {
  try {
    const normalisedParams = HederaParameterNormaliser.normaliseHbarBalanceParams(
      params,
      context,
      client,
    );
    const mirrornodeService = getMirrornodeService(context.mirrornodeService!, client.ledgerId!);
    const balance: BigNumber = await mirrornodeService.getAccountHBarBalance(
      normalisedParams.accountId,
    );
    return { accountId: normalisedParams.accountId, hbarBalance: balance.toString() };
  } catch (error) {
    if (error instanceof Error) {
      return error.message;
    }
    return 'Failed to get HBAR balance';
  }
};

export const GET_HBAR_BALANCE_QUERY_TOOL = 'get_hbar_balance_query_tool';

const tool = (context: Context): Tool => ({
  method: GET_HBAR_BALANCE_QUERY_TOOL,
  name: 'Get HBAR Balance',
  description: getHbarBalanceQueryPrompt(context),
  parameters: accountBalanceQueryParameters(context),
  execute: getHbarBalanceQuery,
});

export default tool;
