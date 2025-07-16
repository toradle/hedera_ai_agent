import { z } from 'zod';
import type { Context } from '../../configuration';
import type { Tool } from '../../tools';
import HederaParameterNormaliser from '../../hedera-utils/hedera-parameter-normaliser';
import { Client } from '@hashgraph/sdk';
import { handleTransaction } from '../../strategies/tx-mode-strategy';
import { transferTokenParameters } from '../../parameter-schemas/hts.zod';
import HederaBuilder from '../../hedera-utils/hedera-builder';

const transferTokenPrompt = (_context: Context = {}) => `
This tool will transfer tokens on Hedera.

It takes five arguments:
- tokenId (str): The id of the token to transfer.
- amount (int): The amount of tokens to transfer.
- sourceAccountId (str, optional): The account to transfer the token from.
- receiverAccountId (str): The account to transfer the token to.
- transactionMemo (str, optional): optional memo for the transaction.
`;

const transferToken = async (
  client: Client,
  context: Context,
  params: z.infer<ReturnType<typeof transferTokenParameters>>,
) => {
  try {
    const normalisedParams = HederaParameterNormaliser.normaliseTransferTokenParams(
      params,
      context,
      client,
    );
    const tx = HederaBuilder.transferToken(normalisedParams);
    const result = await handleTransaction(tx, client, context);
    console.log('Result from transfer token', result);
    return result;
  } catch (error) {
    if (error instanceof Error) {
      return error.message;
    }
    return 'Failed to transfer token'; // TODO: make this a more specific error
  }
};

const tool = (context: Context): Tool => ({
  method: 'transfer_token',
  name: 'Transfer Token',
  description: transferTokenPrompt(context),
  parameters: transferTokenParameters(context),
  actions: {
    fungibleToken: {
      transfer: true,
    },
  },
  execute: transferToken,
});

export default tool;
