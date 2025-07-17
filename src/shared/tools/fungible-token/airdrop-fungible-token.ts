import { z } from 'zod';
import type { Context } from '../../configuration';
import type { Tool } from '../../tools';
import HederaParameterNormaliser from '../../hedera-utils/hedera-parameter-normaliser';
import { Client } from '@hashgraph/sdk';
import { handleTransaction } from '../../strategies/tx-mode-strategy';
import { airdropFungibleTokenParameters } from '../../parameter-schemas/hts.zod';
import HederaBuilder from '../../hedera-utils/hedera-builder';

const airdropFungibleTokenPrompt = (_context: Context = {}) => `
This tool will airdrop a fungible token on Hedera.

It takes five arguments:
- tokenId (str): The id of the token.
- amount (int): The amount of tokens to airdrop - given by user in display units.
- sourceAccountId (str, optional): the account to airdrop the token from - if not passed set to undefined.
-  recipients (array): A list of recipient objects, each containing:
  - accountId (string): The recipient's account ID (e.g., "0.0.1234").
  - amount (number or string): The amount of tokens to send to that recipient (in base units).
- transactionMemo (str, optional): optional memo for the transaction.
`;

const airdropFungibleToken = async (
  client: Client,
  context: Context,
  params: z.infer<ReturnType<typeof airdropFungibleTokenParameters>>,
) => {
  try {
    const normalisedParams = HederaParameterNormaliser.normaliseAirdropFungibleTokenParams(
      params,
      context,
      client,
    );
    const tx = HederaBuilder.airdropFungibleToken(normalisedParams);
    const result = await handleTransaction(tx, client, context);
    console.log('Result from airdrop fungible token', result);
    return result;
  } catch (error) {
    if (error instanceof Error) {
      return error.message;
    }
    return 'Failed to airdrop fungible token';
  }
};

const tool = (context: Context): Tool => ({
  method: 'airdrop_fungible_token',
  name: 'Airdrop Fungible Token',
  description: airdropFungibleTokenPrompt(context),
  parameters: airdropFungibleTokenParameters(context),
  actions: {
    fungibleToken: {
      airdrop: true,
    },
  },
  execute: airdropFungibleToken,
});

export default tool;
