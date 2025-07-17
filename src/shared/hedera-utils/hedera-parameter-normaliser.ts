// optional to use methods in here

import {
  airdropFungibleTokenParameters,
  createFungibleTokenParameters,
  createFungibleTokenParametersNormalised,
  createNonFungibleTokenParameters,
  createNonFungibleTokenParametersNormalised,
} from '../parameter-schemas/hts.zod';
import { transferHbarParameters } from '@/shared/parameter-schemas/has.zod';
import {
  createTopicParameters,
  createTopicParametersNormalised,
  submitTopicMessageParameters,
} from '@/shared/parameter-schemas/hcs.zod';
import { Client } from '@hashgraph/sdk';
import { Context } from '../configuration';
import z from 'zod';
import {
  accountBalanceQueryParameters,
  accountTokenBalancesQueryParameters,
} from '../parameter-schemas/account-query.zod';
import { IHederaMirrornodeService } from '@/shared/hedera-utils/mirrornode/hedera-mirrornode-service.interface';

export default class HederaParameterNormaliser {
  static async normaliseCreateFungibleTokenParams(
    params: z.infer<ReturnType<typeof createFungibleTokenParameters>>,
    context: Context,
    client: Client,
    mirrorNode: IHederaMirrornodeService,
  ) {
    const accountId = context.accountId || client.operatorAccountId?.toString();
    if (!accountId) throw new Error('Account ID must be defined');

    const normalized: z.infer<ReturnType<typeof createFungibleTokenParametersNormalised>> = {
      ...params,
    };

    const treasuryAccountId = params.treasuryAccountId ?? accountId;

    if (!treasuryAccountId) {
      throw new Error('Must include treasury account ID');
    }

    const supplyType = params.supplyType ?? 'finite';
    const decimals = params.decimals ?? 0;
    const maxSupply =
      supplyType === 'finite' ? (params.maxSupply ?? 1_000_000 * 10 ** params.decimals) : undefined;
    const initialSupply = params.initialSupply ? params.initialSupply * 10 ** params.decimals : 0;

    const publicKey =
      (await mirrorNode.getAccount(accountId).then(r => r.accountPublicKey)) ??
      client.operatorPublicKey?.toStringDer();

    if (params.isSupplyKey) {
      normalized.supplyKey = publicKey;
    }

    return {
      ...normalized,
      treasuryAccountId,
      supplyType,
      maxSupply,
      decimals,
      initialSupply,
    };
  }

  static async normaliseCreateNonFungibleTokenParams(
    params: z.infer<ReturnType<typeof createNonFungibleTokenParameters>>,
    context: Context,
    client: Client,
    mirrorNode: IHederaMirrornodeService,
  ) {
    const accountId = context.accountId || client.operatorAccountId?.toString();
    if (!accountId) throw new Error('Account ID must be defined');

    const treasuryAccountId = params.treasuryAccountId || accountId;
    if (!treasuryAccountId) throw new Error('Must include treasury account ID');

    const publicKey =
      (await mirrorNode.getAccount(accountId).then(r => r.accountPublicKey)) ??
      client.operatorPublicKey?.toStringDer();

    const normalized: z.infer<ReturnType<typeof createNonFungibleTokenParametersNormalised>> = {
      ...params,
      treasuryAccountId,
      supplyKey: publicKey,
    };

    return normalized;
  }

  static normaliseTransferHbar(
    params: z.infer<ReturnType<typeof transferHbarParameters>>,
    context: Context,
    client: Client,
  ) {
    const sourceAccountId =
      params.sourceAccountId ?? context.accountId ?? client.operatorAccountId?.toString();
    if (!sourceAccountId) {
      throw new Error('Must include source account ID');
    }

    return {
      ...params,
      sourceAccountId,
    };
  }

  static async normaliseAirdropFungibleTokenParams(
    params: z.infer<ReturnType<typeof airdropFungibleTokenParameters>>,
    context: Context,
    client: Client,
    mirrorNode: IHederaMirrornodeService,
  ) {
    const sourceAccountId =
      params.sourceAccountId ?? context.accountId ?? client.operatorAccountId?.toString();

    if (!sourceAccountId) {
      throw new Error('Must include source account ID');
    }

    const tokenDecimals = parseInt((await mirrorNode.getTokenDetails(params.tokenId)).decimals, 10);

    const normalisedRecipients = params.recipients.map(recipient => ({
      accountId: recipient.accountId,
      amount: Number(recipient.amount) * 10 ** tokenDecimals,
    }));

    return {
      ...params,
      sourceAccountId,
      recipients: normalisedRecipients,
    };
  }

  static async normaliseCreateTopicParams(
    params: z.infer<ReturnType<typeof createTopicParameters>>,
    context: Context,
    client: Client,
    mirrorNode: IHederaMirrornodeService,
  ) {
    const accountId = context.accountId || client.operatorAccountId?.toString();
    if (!accountId) throw new Error('Account ID must be defined');

    const publicKey =
      (await mirrorNode.getAccount(accountId).then(r => r.accountPublicKey)) ??
      client.operatorPublicKey?.toStringDer();

    const normalised: z.infer<ReturnType<typeof createTopicParametersNormalised>> = { ...params };

    if (params.isSubmitKey) {
      if (!publicKey) {
        throw new Error('Could not determine default account ID for submit key');
      }
      normalised.submitKey = publicKey;
    }

    return normalised;
  }

  static normaliseSubmitTopicMessageParams(
    params: z.infer<ReturnType<typeof submitTopicMessageParameters>>,
    context: Context,
    client: Client,
  ) {
    const sender = params.sender || context.accountId || client.operatorAccountId?.toString();

    return {
      ...params,
      sender,
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
