import { Client, TokenCreateTransaction, TokenId } from "@hashgraph/sdk"

// to do: make more generic so can handle nft as well
// atm just does ft
export const create_token = async (
  name: string,
  symbol: string,
  decimals: number,
  initialSupply: number,
  client: Client
): Promise<TokenId> => {
  const tx = new TokenCreateTransaction()
    .setTokenName(name)
    .setTokenSymbol(symbol)
    .setDecimals(decimals)
    .setInitialSupply(initialSupply)
    .setTreasuryAccountId(client.operatorAccountId!)

  const executeTx = await tx.execute(client)
  const rx = await executeTx.getReceipt(client)

  if (!rx.tokenId)
    throw new Error("Token Create Transaction failed")

  return rx.tokenId
}
