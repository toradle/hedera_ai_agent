import { Context } from "../configuration";
import { z } from "zod";

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

  })

export const createNonFungibleTokenParameters = (_context: Context = {}) =>
  z.object({
    tokenName: z.string().describe('The name of the token.'),
    tokenSymbol: z
      .string()
      .describe('The symbol of the token.'),
    maxSupply: z
      .int()
      .optional()
      .default(100) // if not passed, set to 100
      .describe('The maximum supply of the token.'),
    treasuryAccountId: z
      .string()
      .optional()
      .describe('The treasury account of the token.'),

  })