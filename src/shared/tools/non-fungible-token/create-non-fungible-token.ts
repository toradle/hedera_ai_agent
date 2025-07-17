import { z } from 'zod';
import type { Context } from '../../configuration';
import type { Tool } from '../../tools';
import HederaParameterNormaliser from '../../hedera-utils/hedera-parameter-normaliser';
import { Client } from '@hashgraph/sdk';
import { handleTransaction } from '../../strategies/tx-mode-strategy';
import { createNonFungibleTokenParameters } from '../../parameter-schemas/hts.zod';
import HederaBuilder from '../../hedera-utils/hedera-builder';

const createNonFungibleTokenPrompt = (context: Context = {}) => `
context:
 - operator Account: ${context.accountId}. This is the user's account and will be referred to as "my account".
 - operator Account Public Key: ${context.accountPublicKey}. This is the public key associated with the user's operator account.

This tool will create a non-fungible token on Hedera.

It takes four arguments:
- tokenName (str): The name of the token.
- tokenSymbol (str, optional): The symbol of the token.
- maxSupply (int, optional): The max supply of the NFT token.
- treasuryAccountId (str, optional): The treasury account of the token.
- adminKey (str, optional): The key used for administrative control over the token.
- kycKey (str, optional): The key required to grant KYC to accounts.
- wipeKey (str, optional): The key used to wipe token balances.
- freezeKey (str, optional): The key used to freeze accounts.
- supplyKey (str, required): The key used to manage token supply.  It is required and should be set to the operator public key from context if no other is provided.

Key Interpretation Rules:
- If the user refers to a key using "my key", or leaves the key value unspecified, use the operator Account Public Key from context: \`${context.accountPublicKey}\`.
- If the user explicitly provides a key value (e.g. "set the kyc key to 0x123..."), use that exact key.
- This rule applies to all key fields: adminKey, kycKey, wipeKey, freezeKey, supplyKey.
- Do not set unmentioned fields as null, leave them undefined.

Examples:
1. "Set the admin key to my key and set the kyc key." → Use operator public key for both keys. Remember to set the supply key to the operator public key.
2. "Set the admin key to my key and set the kyc key to 0xabc123..." → Use operator key for admin, custom key for kyc.
3. "Set the admin key to my key and set the supply key to 0xabc123..." → Use operator key for admin, custom key for supply key.
`;

const createNonFungibleToken = async (
  client: Client,
  context: Context,
  params: z.infer<ReturnType<typeof createNonFungibleTokenParameters>>,
) => {
  try {
    const normalisedParams = HederaParameterNormaliser.normaliseCreateNonFungibleTokenParams(
      params,
      context,
      client,
    );
    const tx = HederaBuilder.createNonFungibleToken(normalisedParams);
    const result = await handleTransaction(tx, client, context);
    console.log('Result from create non-fungible token', result);
    return result;
  } catch (error) {
    if (error instanceof Error) {
      return error.message;
    }
    return 'Failed to create non-fungible token'; // TODO: make this a more specific error
  }
};

const tool = (context: Context): Tool => ({
  method: 'create_non_fungible_token',
  name: 'Create Non-Fungible Token',
  description: createNonFungibleTokenPrompt(context),
  parameters: createNonFungibleTokenParameters(context),
  actions: {
    nonFungibleToken: {
      create: true,
    },
  },
  execute: createNonFungibleToken,
});

export default tool;
