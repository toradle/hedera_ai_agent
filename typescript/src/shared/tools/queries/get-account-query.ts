import { z } from 'zod';
import { Client } from '@hashgraph/sdk';
import { Context } from '@/shared/configuration.js';
import { getMirrornodeService } from '@/shared/hedera-utils/mirrornode/hedera-mirrornode-utils.js';
import { accountQueryParameters } from '@/shared/parameter-schemas/account-query.zod.js';
import { Tool } from '@/shared/tools.js';

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
    const mirrornodeService = getMirrornodeService(context.mirrornodeService!, client.ledgerId!);
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

export const GET_ACCOUNT_QUERY_TOOL = 'get_account_query';

const getAccountQueryTool = (context: Context): Tool => ({
  method: GET_ACCOUNT_QUERY_TOOL,
  name: 'Get Account Query',
  description: getAccountQueryPrompt(context),
  parameters: accountQueryParameters(context),
  execute: getAccountQuery,
});

export default getAccountQueryTool;
