import { Context } from '../configuration';
import { z } from 'zod';

export const createFungibleTokenParameters = (_context: Context = {}) =>
  z.object({
    tokenName: z.string().describe('The name of the token.'),
    tokenSymbol: z.string().describe('The symbol of the token.'),
    initialSupply: z.number().int().optional().describe('The initial supply of the token.'),
    supplyType: z.enum(['finite', 'infinite']).optional().describe('Supply type of the token.'),
    maxSupply: z.number().int().optional().describe('The maximum supply of the token.'),
    decimals: z.number().int().optional().default(0).describe('The number of decimals.'),
    treasuryAccountId: z.string().optional().describe('The treasury account of the token.'),
    isSupplyKey: z.string().optional().describe('The supply key.'),
  });

export const createFungibleTokenParametersNormalised = (_context: Context = {}) =>
  createFungibleTokenParameters(_context).extend({
    supplyKey: z
      .string()
      .optional()
      .describe('The supply key. If not provided, defaults to the operator’s public key.'),
  });

export const createNonFungibleTokenParameters = (_context: Context = {}) =>
  z.object({
    tokenName: z.string().describe('The name of the token.'),
    tokenSymbol: z.string().describe('The symbol of the token.'),
    maxSupply: z
      .number()
      .int()
      .optional()
      .default(100)
      .describe('The maximum supply of the token.'),
    treasuryAccountId: z.string().optional().describe('The treasury account of the token.'),
  });

export const createNonFungibleTokenParametersNormalised = (_context: Context = {}) =>
  createNonFungibleTokenParameters(_context).extend({
    supplyKey: z
      .string()
      .describe('The supply key. If not provided, defaults to the operator’s public key.'),
  });

const AirdropRecipientSchema = z.object({
  accountId: z.string().describe('Recipient account ID (e.g., "0.0.xxxx").'),
  amount: z.union([z.number(), z.string()]).describe('Amount in base unit.'),
});

export const airdropFungibleTokenParameters = (_context: Context = {}) =>
  z.object({
    tokenId: z.string().describe('The id of the token.'),
    amount: z.number().describe('The amount of tokens to airdrop.'),
    sourceAccountId: z.string().optional().describe('The account to airdrop the token from.'),
    recipients: z
      .array(AirdropRecipientSchema)
      .min(1)
      .describe('Array of recipient objects, each with accountId and amount.'),
    transactionMemo: z.string().optional().describe('memo to include with transaction'),
  });

export const transferTokenParameters = (_context: Context = {}) =>
  z.object({
    tokenId: z.string().describe('The id of the token to transfer.'),
    amount: z.number().describe('The amount of tokens to transfer.'),
    sourceAccountId: z.string().optional().describe('The account to transfer the token from.'),
    receiverAccountId: z.string().describe('The account to transfer the token to.'),
    transactionMemo: z.string().optional().describe('Memo to include with transaction'),
  });
