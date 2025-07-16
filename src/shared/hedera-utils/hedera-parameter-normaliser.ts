// optional to use methods in here

import { Client } from "@hashgraph/sdk"
import { Context } from "../configuration"
import { createFungibleTokenParameters, createNonFungibleTokenParameters } from "../parameter-schemas/hts.zod"
import z from "zod"

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
}