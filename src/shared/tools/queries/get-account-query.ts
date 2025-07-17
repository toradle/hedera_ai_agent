import { z } from 'zod';
import { Client } from '@hashgraph/sdk';
import { Context } from '../../configuration';
import { getMirrornodeService } from '../../hedera-utils/mirrornode/hedera-mirrornode-utils';
import { accountQueryParameters } from '../../parameter-schemas/account-query.zod';
import { Tool } from '../../tools';

export const getAccountQueryPrompt = (_context: Context = {}) => `
This tool will return the account information for a given Hedera account.

It takes one argument:
- accountId (str): The account ID to query.
`;

export const getAccountQuery = async (
  client: Client,
  context: Context,
  params: z.infer<ReturnType<typeof accountQueryParameters>>,
) => {
  console.log('Getting account query for account', params.accountId);
  try {
    const mirrornodeService = getMirrornodeService(context.mirrornodeConfig!);
    const account = await mirrornodeService.getAccount(params.accountId);
    return { accountId: params.accountId, account: account };
  } catch (error) {
    console.error('Error getting account query', error);
    if (error instanceof Error) {
      return error.message;
    }
    return 'Failed to get account query';
  }
};

const tool = (context: Context): Tool => ({
  method: 'get_account_query',
  name: 'Get Account Query',
  description: getAccountQueryPrompt(context),
  parameters: accountQueryParameters(context),
  actions: {
    accountQuery: {
      getAccountQuery: true,
    },
  },
  execute: getAccountQuery,
});

export default tool;
