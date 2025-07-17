import { z } from 'zod';
import type { Context } from '../../configuration';
import type { Tool } from '../../tools';
import HederaParameterNormaliser from '../../hedera-utils/hedera-parameter-normaliser';
import { Client } from '@hashgraph/sdk';
import { handleTransaction } from '../../strategies/tx-mode-strategy';
import { createFungibleTokenParameters } from '../../parameter-schemas/hts.zod';
import HederaBuilder from '../../hedera-utils/hedera-builder';

const createFungibleTokenPrompt = (context: Context = {}) => `
context:
 - operator Account: ${context.accountId}. This is the user's account and will be referred to as "my account".
 - operator Account Public Key: ${context.accountPublicKey}. This is the public key associated with the user's operator account.

This tool creates a fungible token on Hedera.

It accepts the following arguments:
- tokenName (str): The name of the token.
- tokenSymbol (str, optional): The symbol of the token.
- initialSupply (int, optional): The initial supply of the token.
- supplyType (str, optional): The supply type of the token. Can be "finite" or "infinite". Defaults to "finite".
- maxSupply (int, optional): The maximum supply of the token. Only applicable if supplyType is "finite". Defaults to 1,000,000 if not specified.
- decimals (int, optional): The number of decimals the token supports. Defaults to 0.
- treasuryAccountId (str, optional): The Hedera account that will act as the treasury. Defaults to the operator account.
- adminKey (str, optional): The key used for administrative control over the token.
- kycKey (str, optional): The key required to grant KYC to accounts.
- wipeKey (str, optional): The key used to wipe token balances.
- freezeKey (str, optional): The key used to freeze accounts.
- supplyKey (str, optional): The key used to manage token supply.

Key Interpretation Rules:
- If the user refers to a key using "my key", or leaves the key value unspecified, use the operator Account Public Key from context: \`${context.accountPublicKey}\`.
- If the user explicitly provides a key value (e.g. "set the kyc key to 0x123..."), use that exact key.
- This rule applies to all key fields: adminKey, kycKey, wipeKey, freezeKey, supplyKey.
- Do not set unmentioned fields as null, leave them undefined.

Examples:
1. "Set the admin key to my key and set the kyc key." → Use operator public key for both keys.
2. "Set the admin key to my key and set the kyc key to 0xabc123..." → Use operator key for admin, custom key for kyc.
3. "Set the admin key to my key and set the supply key to 0xabc123..." → Use operator key for admin, custom key for supply key.
`;

const createFungibleToken = async (
  client: Client,
  context: Context,
  params: z.infer<ReturnType<typeof createFungibleTokenParameters>>,
) => {
  try {
    const normalisedParams = HederaParameterNormaliser.normaliseCreateFungibleTokenParams(
      params,
      context,
      client,
    );
    const tx = HederaBuilder.createFungibleToken(normalisedParams);
    const result = await handleTransaction(tx, client, context);
    console.log('Result from create fungible token', result);
    return result;
  } catch (error) {
    if (error instanceof Error) {
      return error.message;
    }
    return 'Failed to create fungible token';
  }
};

const tool = (context: Context): Tool => ({
  method: 'create_fungible_token',
  name: 'Create Fungible Token',
  description: createFungibleTokenPrompt(context),
  parameters: createFungibleTokenParameters(context),
  actions: {
    fungibleToken: {
      create: true,
    },
  },
  execute: createFungibleToken,
});

export default tool;
