import { z } from 'zod';
import { BaseHederaQueryTool, BaseHederaQueryToolParams } from '../common/base-hedera-query-tool';
declare const GetContractsZodSchema: z.ZodObject<{
    contractId: z.ZodOptional<z.ZodString>;
    limit: z.ZodOptional<z.ZodNumber>;
    order: z.ZodOptional<z.ZodEnum<["asc", "desc"]>>;
}, "strip", z.ZodTypeAny, {
    limit?: number | undefined;
    order?: "asc" | "desc" | undefined;
    contractId?: string | undefined;
}, {
    limit?: number | undefined;
    order?: "asc" | "desc" | undefined;
    contractId?: string | undefined;
}>;
/**
 * Tool for retrieving contract entities from the network.
 */
export declare class HederaGetContractsTool extends BaseHederaQueryTool<typeof GetContractsZodSchema> {
    name: string;
    description: string;
    specificInputSchema: z.ZodObject<{
        contractId: z.ZodOptional<z.ZodString>;
        limit: z.ZodOptional<z.ZodNumber>;
        order: z.ZodOptional<z.ZodEnum<["asc", "desc"]>>;
    }, "strip", z.ZodTypeAny, {
        limit?: number | undefined;
        order?: "asc" | "desc" | undefined;
        contractId?: string | undefined;
    }, {
        limit?: number | undefined;
        order?: "asc" | "desc" | undefined;
        contractId?: string | undefined;
    }>;
    namespace: string;
    constructor(params: BaseHederaQueryToolParams);
    protected executeQuery(args: z.infer<typeof GetContractsZodSchema>): Promise<unknown>;
}
export {};
