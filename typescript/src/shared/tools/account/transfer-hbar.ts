import { z } from 'zod';
import type { Context } from '../../configuration';
import type { Tool } from '../../tools';
import { Client } from '@hashgraph/sdk';
import { handleTransaction } from '../../strategies/tx-mode-strategy';
import HederaBuilder from '../../hedera-utils/hedera-builder';
import { transferHbarParameters } from 'typescript/src/shared/parameter-schemas/has.zod';
import HederaParameterNormaliser from 'typescript/src/shared/hedera-utils/hedera-parameter-normaliser';

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
