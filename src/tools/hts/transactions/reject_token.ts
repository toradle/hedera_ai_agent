import { Client, TokenId, TokenRejectTransaction } from "@hashgraph/sdk";
import { RejectTokenResult } from "../../../types";

export const reject_token = async (
    tokenId: TokenId,
    client: Client
): Promise<RejectTokenResult> => {
    const tx = new TokenRejectTransaction()
        .setOwnerId(client.operatorAccountId!)
        .addTokenId(tokenId)
        .freezeWith(client);

    const executeTx = await tx.execute(client);
    const receipt = await executeTx.getReceipt(client);

    const status = receipt.status;
    const txId = executeTx.transactionId.toString();

    if (!status.toString().includes('SUCCESS'))
        throw new Error("Token Rejection Transaction failed");

    return {
        status: status.toString(),
        txHash: txId
    }
}