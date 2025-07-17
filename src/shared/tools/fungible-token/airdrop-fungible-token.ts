import { z } from 'zod';
import type { Context } from '../../configuration';
import type { Tool } from '../../tools';
import HederaParameterNormaliser from '../../hedera-utils/hedera-parameter-normaliser';
import { Client } from '@hashgraph/sdk';
import { handleTransaction } from '../../strategies/tx-mode-strategy';
import { airdropFungibleTokenParameters } from '../../parameter-schemas/hts.zod';
import HederaBuilder from '../../hedera-utils/hedera-builder';
import { getMirrornodeService } from '@/shared/hedera-utils/mirrornode/hedera-mirrornode-utils';

const airdropFungibleTokenPrompt = (_context: Context = {}) => `
This tool will airdrop a fungible token on Hedera.

It takes five arguments:
- tokenId (str): The id of the token.
- amount (int): The amount of tokens to airdrop - given by user in display units.
- sourceAccountId (str, optional): The account to airdrop the token from. If the user does not explicitly provide a value for this field, do not include it at all in the request — leave it undefined. Do not set it to null or any placeholder string.
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
    const mirrornodeService = getMirrornodeService(context.mirrornodeConfig!);
    console.log('Raw params', params);
    const normalisedParams = await HederaParameterNormaliser.normaliseAirdropFungibleTokenParams(
      params,
      context,
      client,
      mirrornodeService,
    );
    console.log('Normalised params', normalisedParams);
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
