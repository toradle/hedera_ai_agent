import { z } from 'zod';
import type { Context } from '../../configuration';
import type { Tool } from '../../tools';
import { Client } from '@hashgraph/sdk';
import { accountBalanceQueryParameters } from '../../parameter-schemas/account-query.zod';
import BigNumber from 'bignumber.js';
import { getMirrornodeService } from '../../hedera-utils/mirrornode/hedera-mirrornode-utils';

export const getHbarBalanceQueryPrompt = (_context: Context = {}) => `
This tool will return the HBAR balance in tinybar for a given Hedera account.

It takes one argument:
- accountId (str): The account ID to query.
`;

export const getHbarBalanceQuery = async (
  client: Client,
  context: Context,
  params: z.infer<ReturnType<typeof accountBalanceQueryParameters>>,
) => {
  console.log('Getting HBAR balance for account', params.accountId);
  try {
    const mirrornodeService = getMirrornodeService(context.mirrornodeConfig!);
    const balance: BigNumber = await mirrornodeService.getAccountHBarBalance(params.accountId);
    return { accountId: params.accountId, hbarBalance: balance.toString() };
  } catch (error) {
    console.error('Error getting HBAR balance', error);
    if (error instanceof Error) {
      return error.message;
    }
    return 'Failed to get HBAR balance';
  }
};

const tool = (context: Context): Tool => ({
  method: 'get_hbar_balance_query',
  name: 'Get HBAR Balance',
  description: getHbarBalanceQueryPrompt(context),
  parameters: accountBalanceQueryParameters(context),
  actions: {
    account: {
      getAccountBalance: true,
    },
  },
  execute: getHbarBalanceQuery,
});

export default tool;
