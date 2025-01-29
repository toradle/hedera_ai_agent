import { AssociateTokenResult, HederaNetworkType } from "../../../types";
import { Client, TokenAssociateTransaction } from "@hashgraph/sdk";
import { mapUint8ArrayToHexString } from "../../../utils/tx-utils";


export const associate_token = async (
    tokenId: string,
    networkType: HederaNetworkType,
    client: Client
): Promise<AssociateTokenResult> => {

    const transaction = await new TokenAssociateTransaction()
        .setAccountId(client.operatorAccountId!.toString())
        .setTokenIds([tokenId])

    const txResponse = await transaction.execute(client);
    const receipt = await txResponse.getReceipt(client);
    const transactionStatus = receipt.status;

    if (!receipt.status.toString().includes('SUCCESS'))
        throw new Error("Token Association failed")

    return {
        status: transactionStatus.toString(),
        txHash: mapUint8ArrayToHexString(txResponse.transactionHash),
    }
}