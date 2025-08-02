import { z } from 'zod';
import { BaseHederaQueryTool, BaseHederaQueryToolParams } from '../common/base-hedera-query-tool';
declare const GetAccountInfoZodSchema: z.ZodObject<{
    accountId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    accountId: string;
}, {
    accountId: string;
}>;
/**
 * Tool for retrieving full Hedera account information.
 * This is a read-only operation that queries the mirror node.
 */
export declare class HederaGetAccountInfoTool extends BaseHederaQueryTool<typeof GetAccountInfoZodSchema> {
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
    protected executeQuery(args: z.infer<typeof GetAccountInfoZodSchema>): Promise<unknown>;
}
export {};
