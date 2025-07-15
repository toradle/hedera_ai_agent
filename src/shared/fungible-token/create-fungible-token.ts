import HederaAgentKit from '../../hedera-agent-kit';
import { z } from 'zod';
import type { Context } from '../configuration';
import type { Tool } from '../tools';
import HederaAgentKitStatic from '../../hedera-agent-kit-static';
import { AccountId, Client, Transaction, TransactionId } from '@hashgraph/sdk';

export const createFungibleTokenPrompt = (_context: Context = {}) => `
This tool will create a fungible token on Hedera.

It takes four arguments:
- tokenName (str): The name of the token.
- tokenSymbol (str, optional): The symbol of the token.
- initialSupply (int, optional): The initial supply of the token.
- treasuryAccountId (str, optional): The treasury account of the token.
`;

interface TxModeStrategy {
  handle<T extends Transaction>(tx: T, client: Client, context: Context): Promise<unknown>;
}

class ExecuteStrategy implements TxModeStrategy {
  async handle(tx: Transaction, client: Client) {
    const submit = await tx.execute(client);
    const receipt = await submit.getReceipt(client);
    return {
      status: receipt.status._code,
      accountId: receipt.accountId,
      tokenId: receipt.tokenId,
      transactionId: tx.transactionId,
      topicId: receipt.topicId,
      contractId: receipt.contractId,
      receipt: receipt
    };
  }
}

class ReturnBytesStrategy implements TxModeStrategy {
  async handle(tx: Transaction, _client: Client, context: Context) {
    if (!context.accountId) throw new Error("…");
    const id = TransactionId.generate(context.accountId);
    tx.setNodeAccountIds([new AccountId(4), new AccountId(5)]).setTransactionId(id).freeze();
    return { bytes: tx.toBytes() };
  }
}

const getStraegyFromContext = (context: Context) => {
  if (context.mode === "returnBytes") { // make this in enum
    return new ReturnBytesStrategy()
  }
  return new ExecuteStrategy()
}

export const createFungibleToken = async (
  client: Client,
  context: Context,
  params: z.infer<ReturnType<typeof createFungibleTokenParameters>>
) => {
  try {
    const normalisedParams = HederaAgentKitStatic.normaliseCreateFungibleTokenParams(params, context, client)
    const tx = HederaAgentKitStatic.createFungibleToken(normalisedParams)
    const strategy = getStraegyFromContext(context)
    const result = await strategy.handle(tx, client, context)
    console.log("Result from create fungible token", result)
    return result
  } catch (error) {
    if (error instanceof Error) {
      return error.message
    }
    return 'Failed to create product'; // TODO: make this a more specific error
  }
}

// export const createFungibleToken = async (
//   hederaAgentKit: HederaAgentKit,
//   context: Context,
//   params: z.infer<ReturnType<typeof createFungibleTokenParameters>>
// ) => {
//   try {
//     const result = await hederaAgentKit.createFungibleToken(
//       params,
//       context
//     );
//
//     console.log("Result from create fungible token", result)
//
//     return result;
//   } catch (error) {
//     console.log("Errored...")
//     console.error(error)
//     return 'Failed to create product';
//   }
// };

export const createFungibleTokenParameters = (_context: Context = {}) =>
  z.object({
    tokenName: z.string().describe('The name of the token.'),
    tokenSymbol: z
      .string()
      .describe('The symbol of the token.'),
    initialSupply: z
      .int()
      .optional()
      .describe('The initial supply of the token.'),
    treasuryAccountId: z
      .string()
      .optional()
      .describe('The treasury account of the token.'),

  });

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
