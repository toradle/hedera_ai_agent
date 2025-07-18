import { z } from 'zod';
import type { Context } from '@/shared/configuration.js';
import type { Tool } from '@/shared/tools.js';
import { Client } from '@hashgraph/sdk';
import { handleTransaction } from '@/shared/strategies/tx-mode-strategy.js';
import HederaBuilder from '@/shared/hedera-utils/hedera-builder.js';
import { transferHbarParameters } from '@/shared/parameter-schemas/has.zod.js';
import HederaParameterNormaliser from '@/shared/hedera-utils/hedera-parameter-normaliser.js';

const transferHbarPrompt = (_context: Context = {}) => `
This tool will transfer HBAR to an account.

It takes three arguments:
- hbarAmount (number): amount of hbar to transfer.
- destinationAccountId (str): account to transfer hbar to.
- transactionMemo (str, optional): optional memo for the transaction.
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
    const result = await handleTransaction(tx, client, context);
    console.log('Result from transfer HBAR', result);
    return result;
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
