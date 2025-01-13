import { Client, TokenId, AccountId } from "@hashgraph/sdk"
import { create_token, transfer_token, airdrop_token } from "../tools"
import { get_hbar_balance } from "../tools/hts/queries"
import { AirdropRecipient } from "../tools/hts/transactions/airdrop"


export default class HederaAgentKit {

  public client: Client

  constructor(
    accountId: string,
    privateKey: string,
    network: 'mainnet' | 'testnet' | 'previewnet' = 'mainnet'
  ) {
    // @ts-ignore
    this.client = Client.forNetwork(network).setOperator(accountId, privateKey)
  }

  async createFT(
    name: string,
    symbol: string,
    decimals: number,
    initialSupply: number
  ): Promise<TokenId> {
    return create_token(
      name,
      symbol,
      decimals,
      initialSupply,
      this.client
    )
  }

  async transferToken(
    tokenId: TokenId,
    toAccountId: string | AccountId,
    amount: number
  ): Promise<void> {
    return transfer_token(
      tokenId,
      toAccountId,
      amount,
      this.client
    )
  }

  async getHbarBalance(): Promise<number> {
    return get_hbar_balance(this.client)
  }

  async airdropToken(
    tokenId: TokenId,
    recipients: AirdropRecipient[]
  ): Promise<void> {
    return airdrop_token(
      tokenId,
      recipients,
      this.client
    )
  }
}
