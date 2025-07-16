import { Context } from '../configuration';
import { z } from 'zod';

export const createFungibleTokenParameters = (_context: Context = {}) =>
  z.object({
    tokenName: z.string().describe('The name of the token.'),
    tokenSymbol: z.string().describe('The symbol of the token.'),
    initialSupply: z.int().optional().describe('The initial supply of the token.'),
    treasuryAccountId: z.string().optional().describe('The treasury account of the token.'),
  });

export const createNonFungibleTokenParameters = (_context: Context = {}) =>
  z.object({
    tokenName: z.string().describe('The name of the token.'),
    tokenSymbol: z.string().describe('The symbol of the token.'),
    maxSupply: z
      .int()
      .optional()
      .default(100) // if not passed, set to 100
      .describe('The maximum supply of the token.'),
    treasuryAccountId: z.string().optional().describe('The treasury account of the token.'),
  });

export const airdropFungibleTokenParameters = (_context: Context = {}) =>
  z.object({
    tokenId: z.string().describe('The id of the token.'),
    amount: z.number().describe('The amount of tokens to airdrop.'),
    sourceAccountId: z.string().optional().describe('The account to airdrop the token from.'),
    destinationAccountId: z.string().describe('The account to airdrop the token to.'),
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
