import { z } from 'zod';
import { BaseHederaQueryTool, BaseHederaQueryToolParams } from '../common/base-hedera-query-tool';
declare const GetNetworkFeesZodSchema: z.ZodObject<{
    timestamp: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    timestamp?: string | undefined;
}, {
    timestamp?: string | undefined;
}>;
/**
 * Tool for retrieving network fees.
 */
export declare class HederaGetNetworkFeesTool extends BaseHederaQueryTool<typeof GetNetworkFeesZodSchema> {
    name: string;
    description: string;
    specificInputSchema: z.ZodObject<{
        timestamp: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        timestamp?: string | undefined;
    }, {
        timestamp?: string | undefined;
    }>;
    namespace: string;
    constructor(params: BaseHederaQueryToolParams);
    protected executeQuery(args: z.infer<typeof GetNetworkFeesZodSchema>): Promise<unknown>;
}
export {};
