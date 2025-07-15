import { AccountId, Client, TokenCreateTransaction, TransactionId } from "@hashgraph/sdk";
import { Context } from "./shared/configuration";
import { createFungibleTokenParameters } from "./shared/fungible-token/create-fungible-token";
import z from "zod";


export default class HederaAgentKit {
  client: Client

  constructor(client: Client) {
    if (!client.ledgerId) {
      throw new Error("Must set network")
    }
    if (!client.operatorAccountId || !client.operatorPublicKey) {
      console.log("No operator account or key given... must return bytes")
    }
    this.client = client
  }

  async createFungibleToken(params: z.infer<ReturnType<typeof createFungibleTokenParameters>>, context: Context) {
    console.log("Creating fungible token", params)
    const treasuryAccountId = params.treasuryAccountId || context.accountId || this.client.operatorAccountId?.toString()

    if (!treasuryAccountId) {
      throw new Error("Must include treasury account ID")
    }
    const tx = new TokenCreateTransaction({
      ...params,
      treasuryAccountId
    })

    let result

    if (context.mode === "returnBytes") {
      if (!context.accountId) {
        throw new Error("Must have account id in context for return bytes mode")
      }
      const transactionId = TransactionId.generate(context.accountId)
      tx
        .setNodeAccountIds([new AccountId(4), new AccountId(5)])
        .setTransactionId(transactionId)
        .freeze()
      result = {
        bytes: tx.toBytes()
      }
    } else {
      const submitTx = await tx.execute(this.client)
      const receipt = await submitTx.getReceipt(this.client)
      result = {
        status: receipt.status._code,
        receipt: receipt
      }
    }
    return result
  }
}
