import {Client, TokenClaimAirdropTransaction, PendingAirdropId} from "@hashgraph/sdk"

export const claim_airdrop = async (
    client: Client,
    airdropId: PendingAirdropId
): Promise<void> => {
    const tx = new TokenClaimAirdropTransaction()
        .addPendingAirdropId(airdropId)
        .freezeWith(client);

    const executeTx = await tx.execute(client);
    const rx = await executeTx.getReceipt(client);

    if (!rx.status.toString().includes('SUCCESS'))
        throw new Error("Token Airdrop Transaction failed");
}