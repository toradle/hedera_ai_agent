import { Client, TokenId, TransferTransaction, AccountId } from "@hashgraph/sdk"

export const transfer_token = async (
  tokenId: TokenId,
  toAccountId: string | AccountId,
  amount: number,
  client: Client
): Promise<void> => {
  const tx = new TransferTransaction()
    .addTokenTransfer(tokenId, client.operatorAccountId!, -amount)
    .addTokenTransfer(tokenId, toAccountId, amount)

  const executeTx = await tx.execute(client)
  const rx = await executeTx.getReceipt(client)

  if (!rx.status.toString().includes('SUCCESS'))
    throw new Error("Token Transfer Transaction failed")
}
