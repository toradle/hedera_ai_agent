import {
  Hbar,
  TokenCreateTransaction,
  TokenSupplyType,
  TransferTransaction,
  TokenAirdropTransaction
} from "@hashgraph/sdk";
import {
  airdropFungibleTokenParameters,
  createFungibleTokenParameters,
  createNonFungibleTokenParameters,
  transferTokenParameters
} from "../parameter-schemas/hts.zod";
import z from "zod";
import { transferHbarParameters } from "@/shared/parameter-schemas/has.zod";

export default class HederaBuilder {

  static createFungibleToken(params: z.infer<ReturnType<typeof createFungibleTokenParameters>>) {
    return new TokenCreateTransaction(params)
  }

  static createNonFungibleToken(params: z.infer<ReturnType<typeof createNonFungibleTokenParameters>>) {
    return new TokenCreateTransaction({...params, supplyType: TokenSupplyType.Finite}); // NFT has to have the Finite supply set
  }

  static transferHbar(params: z.infer<ReturnType<typeof transferHbarParameters>>) {
    return new TransferTransaction()
      .addHbarTransfer(params.destinationAccountId, new Hbar(params.hbarAmount))
      .addHbarTransfer(params.sourceAccountId as string, new Hbar(params.hbarAmount).negated())
      .setTransactionMemo(params.transactionMemo || "");
  }

  static airdropFungibleToken(params: z.infer<ReturnType<typeof airdropFungibleTokenParameters>>) {
    return new TokenAirdropTransaction()
      .addTokenTransfer(params.tokenId, params.sourceAccountId as string, -params.amount)
      .addTokenTransfer(params.tokenId, params.destinationAccountId, params.amount)
      .setTransactionMemo(params.transactionMemo || "");
  }

  static transferToken(params: z.infer<ReturnType<typeof transferTokenParameters>>) {
    return new TransferTransaction()
      .addTokenTransfer(params.tokenId, params.sourceAccountId as string, -params.amount)
      .addTokenTransfer(params.tokenId, params.receiverAccountId, params.amount)
      .setTransactionMemo(params.transactionMemo || "");
  }
}
