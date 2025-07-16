import { z } from 'zod';
import type { Context } from '../../configuration';
import type { Tool } from '../../tools';
import { Client } from '@hashgraph/sdk';
import { accountBalanceQueryParameters } from '../../parameter-schemas/account-query.zod';
import BigNumber from 'bignumber.js';
import { getMirrornodeService } from '@/shared/hedera-utils/mirrornode/hedera-mirrornode-utils';

export const getHbarBalancePrompt = (_context: Context = {}) => `
This tool will return the HBAR balance for a given Hedera account.

It takes one argument:
- accountId (str): The account ID to query.
`;



export const getHbarBalance = async (
  client: Client,
  context: Context,
  params: z.infer<ReturnType<typeof accountBalanceQueryParameters>>
) => {
  try {
    const mirrornodeService = getMirrornodeService(context.mirrornodeConfig!);
    const balance: BigNumber = await mirrornodeService.getAccountHBarBalance(params.accountId);
    return { accountId: params.accountId, hbarBalance: balance.toString() };
  } catch (error) {
    if (error instanceof Error) {
      return error.message;
    }
    return 'Failed to get HBAR balance';
  }
};

const tool = (context: Context): Tool => ({
  method: 'get_hbar_balance',
  name: 'Get HBAR Balance',
  description: getHbarBalancePrompt(context),
  parameters: accountBalanceQueryParameters(context),
  actions: {
    balance: {
      read: true,
    },
  },
  execute: getHbarBalance,
});

export default tool;
