import { z } from 'zod';
import type { Context } from '@/shared/configuration.js';
import type { Tool } from '@/shared/tools.js';
import { Client } from '@hashgraph/sdk';
import { handleTransaction } from '@/shared/strategies/tx-mode-strategy.js';
import HederaBuilder from '@/shared/hedera-utils/hedera-builder.js';
import { transferHbarParameters } from '@/shared/parameter-schemas/has.zod.js';
import HederaParameterNormaliser from '@/shared/hedera-utils/hedera-parameter-normaliser.js';

const transferHbarPrompt = (_context: Context = {}) => `
Transfers HBAR to one or more recipient accounts.

Arguments:
- transfers (array of objects): List of HBAR transfers.
  Each transfer must include:
    - accountId (string): recipient account ID.
    - amount (number): amount of HBAR to send to that account.
- sourceAccountId (optional string): sender's account ID. Defaults to the connected wallet.
- transactionMemo (optional string): optional memo for the transaction.

Example:
{
  "transfers": [
    { "accountId": "0.0.1234", "amount": 5 },
    { "accountId": "0.0.5678", "amount": 10.5 }
  ],
  "sourceAccountId": "0.0.9999",
  "transactionMemo": "Payroll batch"
}
`;

const transferHbar = async (
  client: Client,
  context: Context,
  params: z.infer<ReturnType<typeof transferHbarParameters>>,
) => {
  try {
    const normalisedParams = HederaParameterNormaliser.normaliseTransferHbar(
      params,
      context,
      client,
    );
    const tx = HederaBuilder.transferHbar(normalisedParams);
    return await handleTransaction(tx, client, context);
  } catch (error) {
    if (error instanceof Error) {
      return error.message;
    }
    return 'Failed to transfer HBAR';
  }
};

export const TRANSFER_HBAR_TOOL = 'transfer_hbar';

const tool = (context: Context): Tool => ({
  method: TRANSFER_HBAR_TOOL,
  name: 'Transfer HBAR',
  description: transferHbarPrompt(context),
  parameters: transferHbarParameters(context),
  execute: transferHbar,
});

export default tool;
