import { Client, TokenId, AccountId, TransactionId } from "@hashgraph/sdk"
import { create_token, transfer_token, airdrop_token } from "../tools"
import { get_hbar_balance } from "../tools/hts/queries"
import { AirdropRecipient } from "../tools/hts/transactions/airdrop"
import { AssociateTokenResult, HederaNetworkType, HtsTokenDetails, RejectTokenResult, TokenBalance } from "../types";
import { get_hts_balance } from "../tools/hts/queries";
import { get_hts_token_details } from "../tools/hts/queries";
import { transfer_hbar } from "../tools/hbar/transactions";
import { get_all_tokens_balances } from "../tools/hts/queries/balance";
import { get_token_holders } from "../tools/hts/queries/holders";
import { associate_token } from "../tools/hts/transactions/associate_token";
import { reject_token } from "../tools/hts/transactions/reject_token";


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

  async getHbarBalance(accountId?: string): Promise<number> {
    const targetAccountId = accountId || this.client.operatorAccountId;
    return get_hbar_balance(this.client, targetAccountId);
  }

  async getHtsBalance(
      tokenId: string,
      networkType: HederaNetworkType,
      accountId?: string
  ): Promise<number> {
    const targetAccountId = accountId || this.client.operatorAccountId;
    return get_hts_balance(tokenId, networkType, targetAccountId as string);
  }

  async getAllTokensBalances(
      networkType: HederaNetworkType,
      accountId?: string
  ) {
    const targetAccountId = accountId || this.client.operatorAccountId;
    return get_all_tokens_balances(networkType, targetAccountId as string);
  }

  async getHtsTokenDetails(
      tokenId: string,
      networkType: HederaNetworkType
  ): Promise<HtsTokenDetails> {
    return get_hts_token_details(tokenId, networkType);
  }

  async getTokenHolders(
      tokenId: string | TokenId,
      networkType: HederaNetworkType,
      threshold?: number,
  ): Promise<Array<TokenBalance>> {
    return get_token_holders(tokenId.toString(), networkType, threshold);
  }

  async associateToken(
      tokenId: TokenId
  ): Promise<AssociateTokenResult> {
    return associate_token(tokenId, this.client);
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

  async rejectToken(
      tokenId: TokenId,
  ): Promise<RejectTokenResult> {
    return reject_token(
        tokenId,
        this.client
    );
  }

  async transferHbar(
      toAccountId: string | AccountId,
      amount: string
  ): Promise<TransactionId> {
    return transfer_hbar(
        this.client,
        toAccountId,
        amount,
    )
  }
}
