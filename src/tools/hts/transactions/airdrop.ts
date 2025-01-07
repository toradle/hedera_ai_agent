import { Client, TokenId, AccountId, TokenAirdropTransaction } from "@hashgraph/sdk"

export interface AirdropRecipient {
  accountId: string | AccountId;
  amount: number;
}

export const airdrop_token = async (
  tokenId: TokenId,
  recipients: AirdropRecipient[],
  client: Client
): Promise<void> => {
  const tx = new TokenAirdropTransaction();
  
  // Add token transfers for each recipient
  for (const recipient of recipients) {
    // Deduct from sender
    tx.addTokenTransfer(tokenId, client.operatorAccountId!, -recipient.amount);
    // Add to recipient
    tx.addTokenTransfer(tokenId, recipient.accountId, recipient.amount);
  }

  const executeTx = await tx.freezeWith(client).execute(client);
  const rx = await executeTx.getReceipt(client);

  if (!rx.status.toString().includes('SUCCESS'))
    throw new Error("Token Airdrop Transaction failed");
} 