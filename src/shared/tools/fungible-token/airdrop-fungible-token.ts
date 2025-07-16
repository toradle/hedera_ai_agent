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
- amount (int): The amount of tokens to airdrop.
- sourceAccountId (str, optional): the account to airdrop the token from.
- destinationAccountId (str): The account to airdrop the token to.
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
    return 'Failed to airdrop fungible token'; // TODO: make this a more specific error
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
