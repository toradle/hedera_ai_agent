import { z } from 'zod';
import type { Context } from '../../configuration';
import type { Tool } from '../../tools';
import { Client } from '@hashgraph/sdk';
import { accountBalanceQueryParameters } from '../../parameter-schemas/account-query.zod';
import BigNumber from 'bignumber.js';
import { getMirrornodeService } from '../../hedera-utils/mirrornode/hedera-mirrornode-utils';
import HederaParameterNormaliser from '../../hedera-utils/hedera-parameter-normaliser';

export const getHbarBalanceQueryPrompt = (_context: Context = {}) => `
This tool will return the HBAR balance in tinybar for a given Hedera account.
${_context.accountId ? '\nIf accountId is not provided, use empty string.' : ''}

It takes one argument:
- accountId (str, optional): The account ID to query.
`;

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
    console.log('Getting HBAR balance for account', normalisedParams.accountId);
    const mirrornodeService = getMirrornodeService(context.mirrornodeService!, client.ledgerId!);
    const balance: BigNumber = await mirrornodeService.getAccountHBarBalance(
      normalisedParams.accountId,
    );
    console.log('HBAR balance', balance.toString());
    return { accountId: normalisedParams.accountId, hbarBalance: balance.toString() };
  } catch (error) {
    console.error('Error getting HBAR balance', error);
    if (error instanceof Error) {
      return error.message;
    }
    return 'Failed to get HBAR balance';
  }
};

export const GET_HBAR_BALANCE_QUERY_TOOL = 'get_hbar_balance_query';

const tool = (context: Context): Tool => ({
  method: GET_HBAR_BALANCE_QUERY_TOOL,
  name: 'Get HBAR Balance',
  description: getHbarBalanceQueryPrompt(context),
  parameters: accountBalanceQueryParameters(context),
  execute: getHbarBalanceQuery,
});

export default tool;
