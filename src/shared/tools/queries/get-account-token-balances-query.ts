import { z } from 'zod';
import { Context } from '@/shared/configuration';
import { getMirrornodeService } from '../../hedera-utils/mirrornode/hedera-mirrornode-utils';
import { accountTokenBalancesQueryParameters } from '../../parameter-schemas/account-query.zod';
import { Client } from '@hashgraph/sdk';
import { Tool } from '@/shared/tools';

export const getAccountTokenBalancesQueryPrompt = (_context: Context = {}) => `
This tool will return the token balances for a given Hedera account.

It takes two arguments:
- accountId (str): The account ID to query.
- tokenId (str, optional): The token ID to query for. If not provided, all token balances will be returned.
`;

export const getAccountTokenBalancesQuery = async (
  client: Client,
  context: Context,
  params: z.infer<ReturnType<typeof accountTokenBalancesQueryParameters>>,
) => {
  console.log('Getting account token balances for account', params.accountId);
  try {
    const mirrornodeService = getMirrornodeService(context.mirrornodeConfig!);
    const tokenBalances = await mirrornodeService.getAccountTokenBalances(
      params.accountId,
      params.tokenId,
    );
    return { accountId: params.accountId, tokenBalances: tokenBalances };
  } catch (error) {
    console.error('Error getting account token balances', error);
  }
};

const tool = (context: Context): Tool => ({
  method: 'get_account_token_balances_query',
  name: 'Get Account Token Balances',
  description: getAccountTokenBalancesQueryPrompt(context),
  parameters: accountTokenBalancesQueryParameters(context),
  actions: {
    accountQuery: {
      getAccountTokenBalancesQuery: true,
    },
  },
  execute: getAccountTokenBalancesQuery,
});

export default tool;
