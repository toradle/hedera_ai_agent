import { z } from 'zod';
import { BaseHederaQueryTool, BaseHederaQueryToolParams } from '../common/base-hedera-query-tool';
declare const GetTransactionZodSchema: z.ZodObject<{
    transactionIdOrHash: z.ZodString;
}, "strip", z.ZodTypeAny, {
    transactionIdOrHash: string;
}, {
    transactionIdOrHash: string;
}>;
/**
 * Tool for retrieving Hedera transaction details.
 * This is a read-only operation that queries the mirror node.
 */
export declare class HederaGetTransactionTool extends BaseHederaQueryTool<typeof GetTransactionZodSchema> {
    name: string;
    description: string;
    specificInputSchema: z.ZodObject<{
        transactionIdOrHash: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        transactionIdOrHash: string;
    }, {
        transactionIdOrHash: string;
    }>;
    namespace: string;
    constructor(params: BaseHederaQueryToolParams);
    protected executeQuery(args: z.infer<typeof GetTransactionZodSchema>): Promise<unknown>;
}
export {};
