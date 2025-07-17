// optional to use methods in here

import { Client } from '@hashgraph/sdk';
import { Context } from '../configuration';
import { createFungibleTokenParameters } from '../parameter-schemas/hts.zod';
import z from 'zod';
import {
  accountBalanceQueryParameters,
  accountTokenBalancesQueryParameters,
} from '../parameter-schemas/account-query.zod';

export default class HederaParameterNormaliser {
  static normaliseCreateFungibleTokenParams(
    params: z.infer<ReturnType<typeof createFungibleTokenParameters>>,
    context: Context,
    client: Client,
  ) {
    const treasuryAccountId =
      params.treasuryAccountId || context.accountId || client.operatorAccountId?.toString();

    if (!treasuryAccountId) {
      throw new Error('Must include treasury account ID');
    }
    return {
      ...params,
      treasuryAccountId,
    };
  }

  static normaliseHbarBalanceParams(
    params: z.infer<ReturnType<typeof accountBalanceQueryParameters>>,
    context: Context,
    client: Client,
  ) {
    const accountId = params.accountId || context.accountId || client.operatorAccountId?.toString();
    if (!accountId) {
      throw new Error('Account ID is required');
    }
    return {
      ...params,
      accountId,
    };
  }

  static normaliseAccountTokenBalancesParams(
    params: z.infer<ReturnType<typeof accountTokenBalancesQueryParameters>>,
    context: Context,
    client: Client,
  ) {
    const accountId = params.accountId || context.accountId || client.operatorAccountId?.toString();
    if (!accountId) {
      throw new Error('Account ID is required');
    }
    return {
      ...params,
      accountId,
    };
  }
}
