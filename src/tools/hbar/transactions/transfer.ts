import { Client, Hbar, TransferTransaction, AccountId, TransactionId } from "@hashgraph/sdk"

export const transfer_hbar = async (
    client: Client,
    toAccountId: string | AccountId,
    amount: string,
): Promise<TransactionId> => {
    const operatorAccountId = client.operatorAccountId?.toString();

    if(!operatorAccountId) {
        throw new Error("Invalid operator accountId in client");
    }

    const tx = new TransferTransaction()
        .addHbarTransfer(operatorAccountId, new Hbar(-amount))
        .addHbarTransfer(toAccountId, new Hbar(amount))

    const executeTx = await tx.execute(client)
    const rx = await executeTx.getReceipt(client)

    if (!rx.status.toString().includes('SUCCESS'))
        throw new Error("Token Transfer Transaction failed")

    return executeTx.transactionId
}
