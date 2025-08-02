import {
  TokenAirdropTransaction,
  TokenCreateTransaction,
  TopicCreateTransaction,
  TopicMessageSubmitTransaction,
  TransferTransaction,
  TokenMintTransaction,
} from '@hashgraph/sdk';
import {
  airdropFungibleTokenParametersNormalised,
  createFungibleTokenParametersNormalised,
  createNonFungibleTokenParametersNormalised,
  mintFungibleTokenParametersNormalised,
  mintNonFungibleTokenParametersNormalised,
} from '@/shared/parameter-schemas/hts.zod';
import z from 'zod';
import { transferHbarParametersNormalised } from '@/shared/parameter-schemas/has.zod';
import {
  createTopicParametersNormalised,
  submitTopicMessageParametersNormalised,
} from '@/shared/parameter-schemas/hcs.zod';

export default class HederaBuilder {
  static createFungibleToken(
    params: z.infer<ReturnType<typeof createFungibleTokenParametersNormalised>>,
  ) {
    return new TokenCreateTransaction(params);
  }

  static createNonFungibleToken(
    params: z.infer<ReturnType<typeof createNonFungibleTokenParametersNormalised>>,
  ) {
    return new TokenCreateTransaction(params);
  }

  static transferHbar(params: z.infer<ReturnType<typeof transferHbarParametersNormalised>>) {
    return new TransferTransaction(params);
  }

  static airdropFungibleToken(
    params: z.infer<ReturnType<typeof airdropFungibleTokenParametersNormalised>>,
  ) {
    return new TokenAirdropTransaction(params as any);
  }

  static createTopic(params: z.infer<ReturnType<typeof createTopicParametersNormalised>>) {
    return new TopicCreateTransaction(params);
  }

  static submitTopicMessage(
    params: z.infer<ReturnType<typeof submitTopicMessageParametersNormalised>>,
  ) {
    return new TopicMessageSubmitTransaction(params);
  }

  static mintFungibleToken(
    params: z.infer<ReturnType<typeof mintFungibleTokenParametersNormalised>>,
  ) {
    return new TokenMintTransaction(params);
  }

  static mintNonFungibleToken(
    params: z.infer<ReturnType<typeof mintNonFungibleTokenParametersNormalised>>,
  ) {
    return new TokenMintTransaction(params);
  }
}
