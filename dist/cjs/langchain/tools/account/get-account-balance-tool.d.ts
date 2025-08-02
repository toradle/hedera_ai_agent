import { z } from 'zod';
import { BaseHederaQueryTool, BaseHederaQueryToolParams } from '../common/base-hedera-query-tool';
declare const GetAccountBalanceZodSchema: z.ZodObject<{
    accountId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    accountId: string;
}, {
    accountId: string;
}>;
/**
 * Tool for retrieving Hedera account HBAR balance.
 * This is a read-only operation that queries the mirror node.
 */
export declare class HederaGetAccountBalanceTool extends BaseHederaQueryTool<typeof GetAccountBalanceZodSchema> {
    name: string;
    description: string;
    specificInputSchema: z.ZodObject<{
        accountId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        accountId: string;
    }, {
        accountId: string;
    }>;
    namespace: string;
    constructor(params: BaseHederaQueryToolParams);
    protected executeQuery(args: z.infer<typeof GetAccountBalanceZodSchema>): Promise<unknown>;
}
export {};
