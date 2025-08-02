import { z } from 'zod';
import { BaseHederaQueryTool, BaseHederaQueryToolParams } from '../common/base-hedera-query-tool';
declare const GetAccountTokensZodSchema: z.ZodObject<{
    accountId: z.ZodString;
    limit: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
}, "strip", z.ZodTypeAny, {
    limit: number;
    accountId: string;
}, {
    accountId: string;
    limit?: number | undefined;
}>;
/**
 * Tool for retrieving token balances for a Hedera account.
 * This is a read-only operation that queries the mirror node.
 */
export declare class HederaGetAccountTokensTool extends BaseHederaQueryTool<typeof GetAccountTokensZodSchema> {
    name: string;
    description: string;
    specificInputSchema: z.ZodObject<{
        accountId: z.ZodString;
        limit: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    }, "strip", z.ZodTypeAny, {
        limit: number;
        accountId: string;
    }, {
        accountId: string;
        limit?: number | undefined;
    }>;
    namespace: string;
    constructor(params: BaseHederaQueryToolParams);
    protected executeQuery(args: z.infer<typeof GetAccountTokensZodSchema>): Promise<unknown>;
}
export {};
