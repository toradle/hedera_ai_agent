import { Context } from "@/shared/configuration";
import { z } from "zod";

export const transferHbarParameters = (_context: Context = {}) =>
  z.object({
    destinationAccountId: z.string().describe('account to transfer to'),
    sourceAccountId: z.string().optional().describe('account to transfer from'),
    hbarAmount: z
      .number()
      .describe('amount of hbar to transfer'),
    transactionMemo: z
      .string()
      .optional()
      .describe('memo to include with transaction'),
  })
