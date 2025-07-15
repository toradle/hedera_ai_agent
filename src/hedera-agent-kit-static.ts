import { AccountId, Client, TokenCreateTransaction, TransactionId } from "@hashgraph/sdk";
import { Context } from "./shared/configuration";
import { createFungibleTokenParameters } from "./shared/fungible-token/create-fungible-token";
import z from "zod";

export default class HederaAgentKitStatic {

  static normaliseCreateFungibleTokenParams(params: z.infer<ReturnType<typeof createFungibleTokenParameters>>, context: Context, client: Client) {
    const treasuryAccountId = params.treasuryAccountId || context.accountId || client.operatorAccountId?.toString()

    if (!treasuryAccountId) {
      throw new Error("Must include treasury account ID")
    }
    return {
      ...params,
      treasuryAccountId
    }
  }
  static createFungibleToken(params: z.infer<ReturnType<typeof createFungibleTokenParameters>>) {
    return new TokenCreateTransaction(params)
  }

}
