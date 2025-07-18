// optional to use methods in here

import {
  airdropFungibleTokenParameters,
  airdropFungibleTokenParametersNormalised,
  createFungibleTokenParameters,
  createFungibleTokenParametersNormalised,
  createNonFungibleTokenParameters,
  createNonFungibleTokenParametersNormalised,
} from '@/shared/parameter-schemas/hts.zod.js';
import {
  transferHbarParameters,
  transferHbarParametersNormalised,
} from '@/shared/parameter-schemas/has.zod.js';
import {
  createTopicParameters,
  createTopicParametersNormalised,
  submitTopicMessageParametersNormalised,
} from '@/shared/parameter-schemas/hcs.zod.js';
import { Client, Hbar, PublicKey, TokenSupplyType } from '@hashgraph/sdk';
import { Context } from '@/shared/configuration.js';
import z from 'zod';
import {
  accountBalanceQueryParameters,
  accountTokenBalancesQueryParameters,
} from '@/shared/parameter-schemas/account-query.zod.js';
import { IHederaMirrornodeService } from '@/shared/hedera-utils/mirrornode/hedera-mirrornode-service.interface.js';
import { toBaseUnit } from '@/shared/hedera-utils/decimals-utils.js';
import Long from 'long';
import { TokenTransferMinimalParams, TransferHbarInput } from '@/shared/hedera-utils/types.js';

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
      supplyType: TokenSupplyType.Finite, // defaults to finite supply
    };

    const treasuryAccountId = params.treasuryAccountId ?? accountId;

    if (!treasuryAccountId) {
      throw new Error('Must include treasury account ID');
    }

    const supplyTypeString = params.supplyType ?? 'finite';
    const supplyType =
      supplyTypeString === 'finite' ? TokenSupplyType.Finite : TokenSupplyType.Infinite;
    const decimals = params.decimals ?? 0;
    const initialSupply = toBaseUnit(params.initialSupply ?? 0, decimals);

    let maxSupply: number | undefined = undefined;
    if (supplyTypeString === 'finite') {
      const rawMaxSupply = params.maxSupply ?? 1_000_000;
      maxSupply = toBaseUnit(rawMaxSupply, decimals);

      if (initialSupply > maxSupply) {
        throw new Error(
          `Initial supply (${initialSupply}) cannot exceed max supply (${maxSupply})`,
        );
      }
    }

    const publicKey =
      (await mirrorNode
        .getAccount(accountId)
        .then(r => PublicKey.fromString(r.accountPublicKey))) ?? client.operatorPublicKey;

    if (params.isSupplyKey === true) {
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
      (await mirrorNode
        .getAccount(accountId)
        .then(r => PublicKey.fromString(r.accountPublicKey))) ?? client.operatorPublicKey;

    const maxSupply = params.maxSupply ?? 100;

    const normalized: z.infer<ReturnType<typeof createNonFungibleTokenParametersNormalised>> = {
      ...params,
      treasuryAccountId,
      maxSupply,
      supplyKey: publicKey, // the supply key is mandatory in the case of NFT
      supplyType: TokenSupplyType.Finite, // NFTs supply must be finite
    };

    return normalized;
  }

  static normaliseTransferHbar(
    params: z.infer<ReturnType<typeof transferHbarParameters>>,
    context: Context,
    client: Client,
  ): z.infer<ReturnType<typeof transferHbarParametersNormalised>> {
    const sourceAccountId =
      params.sourceAccountId ?? context.accountId ?? client.operatorAccountId?.toString();
    if (!sourceAccountId) {
      throw new Error('Must include source account ID');
    }

    const hbarTransfers: TransferHbarInput[] = [];

    let totalTinybars = Long.ZERO;

    for (const transfer of params.transfers) {
      const amount = new Hbar(transfer.amount);

      if (amount.isNegative() || amount.toTinybars().equals(Long.ZERO)) {
        throw new Error(`Invalid transfer amount: ${transfer.amount}`);
      }

      totalTinybars = totalTinybars.add(amount.toTinybars());

      hbarTransfers.push({
        accountId: transfer.accountId,
        amount,
      });
    }

    hbarTransfers.push({
      accountId: sourceAccountId,
      amount: Hbar.fromTinybars(totalTinybars.negate()),
    });

    return {
      hbarTransfers,
      transactionMemo: params.transactionMemo,
    };
  }

  static async normaliseAirdropFungibleTokenParams(
    params: z.infer<ReturnType<typeof airdropFungibleTokenParameters>>,
    context: Context,
    client: Client,
    mirrorNode: IHederaMirrornodeService,
  ): Promise<z.infer<ReturnType<typeof airdropFungibleTokenParametersNormalised>>> {
    const sourceAccountId =
      params.sourceAccountId ?? context.accountId ?? client.operatorAccountId?.toString();

    if (!sourceAccountId) {
      throw new Error('Must include source account ID');
    }

    const tokenDetails = await mirrorNode.getTokenDetails(params.tokenId);
    const tokenDecimals = parseInt(tokenDetails.decimals, 10);

    const tokenTransfers: TokenTransferMinimalParams[] = [];
    let totalAmount = Long.ZERO;

    for (const recipient of params.recipients) {
      const amountRaw = Number(recipient.amount);

      if (amountRaw <= 0) {
        throw new Error(`Invalid recipient amount: ${recipient.amount}`);
      }

      const amount = Long.fromString((amountRaw * 10 ** tokenDecimals).toString());

      totalAmount = totalAmount.add(amount);

      tokenTransfers.push({
        tokenId: params.tokenId,
        accountId: recipient.accountId,
        amount,
      });
    }

    // Sender negative total
    tokenTransfers.push({
      tokenId: params.tokenId,
      accountId: sourceAccountId,
      amount: totalAmount.negate(),
    });

    return {
      tokenTransfers,
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
      (await mirrorNode
        .getAccount(accountId)
        .then(r => PublicKey.fromString(r.accountPublicKey))) ?? client.operatorPublicKey;

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
    params: z.infer<ReturnType<typeof submitTopicMessageParametersNormalised>>,
    _context: Context,
    _client: Client,
  ) {
    // currently no normalisation is needed
    return {
      ...params,
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
