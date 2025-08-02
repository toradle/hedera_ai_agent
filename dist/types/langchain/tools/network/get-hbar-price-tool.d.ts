import { z } from 'zod';
import { BaseHederaQueryTool, BaseHederaQueryToolParams } from '../common/base-hedera-query-tool';
declare const GetHbarPriceZodSchema: z.ZodObject<{
    date: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    date?: string | undefined;
}, {
    date?: string | undefined;
}>;
/**
 * Tool for retrieving HBAR price from the Hedera network.
 * This is a read-only operation that queries the mirror node.
 */
export declare class HederaGetHbarPriceTool extends BaseHederaQueryTool<typeof GetHbarPriceZodSchema> {
    name: string;
    description: string;
    specificInputSchema: z.ZodObject<{
        date: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        date?: string | undefined;
    }, {
        date?: string | undefined;
    }>;
    namespace: string;
    constructor(params: BaseHederaQueryToolParams);
    protected executeQuery(args: z.infer<typeof GetHbarPriceZodSchema>): Promise<unknown>;
}
export {};
