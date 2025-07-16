// optional to use methods in here

import { Client } from "@hashgraph/sdk"
import { Context } from "../configuration"
import { airdropFungibleTokenParameters, createFungibleTokenParameters, createNonFungibleTokenParameters, transferTokenParameters } from "../parameter-schemas/hts.zod"
import z from "zod"
import { transferHbarParameters } from "@/shared/parameter-schemas/has.zod";

export default class HederaParameterNormaliser {
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
}
