import { z } from 'zod';
import { BaseHederaQueryTool, BaseHederaQueryToolParams } from '../common/base-hedera-query-tool';
declare const GetBlocksZodSchema: z.ZodObject<{
    blockNumber: z.ZodOptional<z.ZodString>;
    timestamp: z.ZodOptional<z.ZodString>;
    limit: z.ZodOptional<z.ZodNumber>;
    order: z.ZodOptional<z.ZodEnum<["asc", "desc"]>>;
}, "strip", z.ZodTypeAny, {
    timestamp?: string | undefined;
    limit?: number | undefined;
    order?: "asc" | "desc" | undefined;
    blockNumber?: string | undefined;
}, {
    timestamp?: string | undefined;
    limit?: number | undefined;
    order?: "asc" | "desc" | undefined;
    blockNumber?: string | undefined;
}>;
/**
 * Tool for retrieving blocks from the network.
 */
export declare class HederaGetBlocksTool extends BaseHederaQueryTool<typeof GetBlocksZodSchema> {
    name: string;
    description: string;
    specificInputSchema: z.ZodObject<{
        blockNumber: z.ZodOptional<z.ZodString>;
        timestamp: z.ZodOptional<z.ZodString>;
        limit: z.ZodOptional<z.ZodNumber>;
        order: z.ZodOptional<z.ZodEnum<["asc", "desc"]>>;
    }, "strip", z.ZodTypeAny, {
        timestamp?: string | undefined;
        limit?: number | undefined;
        order?: "asc" | "desc" | undefined;
        blockNumber?: string | undefined;
    }, {
        timestamp?: string | undefined;
        limit?: number | undefined;
        order?: "asc" | "desc" | undefined;
        blockNumber?: string | undefined;
    }>;
    namespace: string;
    constructor(params: BaseHederaQueryToolParams);
    protected executeQuery(args: z.infer<typeof GetBlocksZodSchema>): Promise<unknown>;
}
export {};
