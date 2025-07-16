import { Hbar, TokenCreateTransaction, TokenSupplyType, TransferTransaction } from "@hashgraph/sdk";
import { createFungibleTokenParameters, createNonFungibleTokenParameters } from "../parameter-schemas/hts.zod";
import z from "zod";

export default class HederaBuilder {

  static createFungibleToken(params: z.infer<ReturnType<typeof createFungibleTokenParameters>>) {
    return new TokenCreateTransaction(params)
  }

  static createNonFungibleToken(params: z.infer<ReturnType<typeof createNonFungibleTokenParameters>>) {
    return new TokenCreateTransaction({...params, supplyType: TokenSupplyType.Finite}); // NFT has to have the Finite supply set
  }

  static transferHbar(params: any) {
    return new TransferTransaction()
      .addHbarTransfer(params.destinationAccountId, new Hbar(params.hbarAmount))
      .addHbarTransfer(params.sourceAccountId, new Hbar(params.hbarAmount).negated())
      .setTransactionMemo(params.transactionMemo || "");
  }
}
