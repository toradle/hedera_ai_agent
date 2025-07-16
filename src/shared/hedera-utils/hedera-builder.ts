import { TokenCreateTransaction } from '@hashgraph/sdk';
import { createFungibleTokenParameters } from '../parameter-schemas/hts.zod';
import z from 'zod';

export default class HederaBuilder {
  static createFungibleToken(params: z.infer<ReturnType<typeof createFungibleTokenParameters>>) {
    return new TokenCreateTransaction(params);
  }
}
