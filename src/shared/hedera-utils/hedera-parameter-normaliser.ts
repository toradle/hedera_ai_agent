// optional to use methods in here

import { airdropFungibleTokenParameters, createFungibleTokenParameters, createNonFungibleTokenParameters, transferTokenParameters } from '../parameter-schemas/hts.zod';
import { transferHbarParameters } from '@/shared/parameter-schemas/has.zod';
import { createTopicParameters } from '@/shared/parameter-schemas/hcs.zod';
import { Client } from '@hashgraph/sdk';
import { Context } from '../configuration';
import z from 'zod';

export default class HederaParameterNormaliser {
  static normaliseCreateFungibleTokenParams(params: z.infer<ReturnType<typeof createFungibleTokenParameters>>, context: Context, client: Client,
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

  static normaliseCreateNonFungibleTokenParams(params: z.infer<ReturnType<typeof createNonFungibleTokenParameters>>, context: Context, client: Client) {
    const treasuryAccountId = params.treasuryAccountId || context.accountId || client.operatorAccountId?.toString()
    if (!treasuryAccountId) {
      throw new Error("Must include treasury account ID")
    }

    return {
      ...params,
      treasuryAccountId,
    }
  }

  static normaliseTransferHbar(params: z.infer<ReturnType<typeof transferHbarParameters>>, context: Context, client: Client) {
    const sourceAccountId = params.sourceAccountId || context.accountId || client.operatorAccountId?.toString();
    if (!sourceAccountId) {
      throw new Error("Must include source account ID")
    }

    return {
      ...params,
      sourceAccountId,
    }
  }

  static normaliseAirdropFungibleTokenParams(params: z.infer<ReturnType<typeof airdropFungibleTokenParameters>>, context: Context, client: Client) {
    const sourceAccountId = params.sourceAccountId || context.accountId || client.operatorAccountId?.toString();
    if (!sourceAccountId) {
      throw new Error("Must include source account ID")
    }

    return {
      ...params,
      sourceAccountId,
    }
  }

  static normaliseTransferTokenParams(params: z.infer<ReturnType<typeof transferTokenParameters>>, context: Context, client: Client) {
    const sourceAccountId = params.sourceAccountId || context.accountId || client.operatorAccountId?.toString();
    if (!sourceAccountId) {
      throw new Error("Must include source account ID")
    }

    return {
      ...params,
      sourceAccountId,
    }
  }

  static normaliseCreateTopicParams(params: z.infer<ReturnType<typeof createTopicParameters>>, context: Context, client: Client) {
    const defaultAccountPublicKey = client.operatorPublicKey?.toStringDer(); // TODO: fetch public key for the context.accountId
    const result = { ...params };

    // Only add keys if the corresponding boolean flag is true and the key was not passed in the user prompt
    if (params.isAdminKey && !params.adminKey) {
      if (!defaultAccountPublicKey) {
        throw new Error("Could not determine default account ID for admin key");
      }
      result.adminKey = defaultAccountPublicKey;
    }

    if (params.isSubmitKey && !params.submitKey) {
      if (!defaultAccountPublicKey) {
        throw new Error("Could not determine default account ID for submit key");
      }
      result.submitKey = defaultAccountPublicKey;
    }

    return result;
  }
}