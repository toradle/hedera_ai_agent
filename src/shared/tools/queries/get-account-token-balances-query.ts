import { z } from 'zod';
import { Context } from '@/shared/configuration';
import { getMirrornodeService } from '../../hedera-utils/mirrornode/hedera-mirrornode-utils';
import { accountTokenBalancesQueryParameters } from '../../parameter-schemas/account-query.zod';
import { Client } from '@hashgraph/sdk';
import { Tool } from '@/shared/tools';
import HederaParameterNormaliser from '../../hedera-utils/hedera-parameter-normaliser';

export const getAccountTokenBalancesQueryPrompt = (_context: Context = {}) => `
This tool will return the token balances for a given Hedera account.
${_context.accountId ? '\n If accountId is not provided, this accountId will be used.' : ''}

It takes two arguments:
- accountId (str): The account ID to query.
- tokenId (str, optional): The token ID to query for. If not provided, all token balances will be returned.
`;

export const getAccountTokenBalancesQuery = async (
  client: Client,
  context: Context,
  params: z.infer<ReturnType<typeof accountTokenBalancesQueryParameters>>,
) => {
  try {
    const normalisedParams = HederaParameterNormaliser.normaliseAccountTokenBalancesParams(
      params,
      context,
      client,
    );
    console.log('Getting account token balances for account', normalisedParams.accountId);
    const mirrornodeService = getMirrornodeService(context.mirrornodeService!, client.ledgerId!);
    const tokenBalances = await mirrornodeService.getAccountTokenBalances(
      normalisedParams.accountId,
      normalisedParams.tokenId,
    );
    return { accountId: normalisedParams.accountId, tokenBalances: tokenBalances };
  } catch (error) {
    console.error('Error getting account token balances', error);
    if (error instanceof Error) {
      return error.message;
    }
    return 'Failed to get account token balances';
  }
};

export const GET_ACCOUNT_TOKEN_BALANCES_QUERY_TOOL = 'get_account_token_balances_query';

const tool = (context: Context): Tool => ({
  method: GET_ACCOUNT_TOKEN_BALANCES_QUERY_TOOL,
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
