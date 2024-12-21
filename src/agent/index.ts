import { Client, TokenId } from "@hashgraph/sdk"
import { create_token } from "../tools"


export default class HederaAgentKit {

  public client: Client
  public openai_api_key: string

  constructor(
    accountId: string,
    privateKey: string,
    openai_api_key: string,
    network: 'mainnet' | 'testnet' | 'previewnet' = 'mainnet'
  ) {
    // @ts-ignore
    this.client = Client.forNetwork(network).setOperator(accountId, privateKey)
    this.openai_api_key = openai_api_key
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
}
