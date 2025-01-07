import { Client, AccountBalanceQuery, Hbar } from "@hashgraph/sdk"

export const get_hbar_balance = async (
  client: Client
): Promise<number> => {
  const query = new AccountBalanceQuery()
    .setAccountId(client.operatorAccountId!)

  const balance = await query.execute(client)
  return balance.hbars.toBigNumber().toNumber()
} 