import { z } from 'zod';
import { BaseHederaQueryTool, BaseHederaQueryToolParams, FieldProcessor } from '../common/base-hedera-query-tool';
declare const GetContractZodSchema: z.ZodObject<{
    contractIdOrAddress: z.ZodString;
    timestamp: z.ZodOptional<z.ZodString>;
    includeBytecode: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
}, "strip", z.ZodTypeAny, {
    contractIdOrAddress: string;
    includeBytecode: boolean;
    timestamp?: string | undefined;
}, {
    contractIdOrAddress: string;
    timestamp?: string | undefined;
    includeBytecode?: boolean | undefined;
}>;
/**
 * Tool for retrieving a specific contract by ID or address.
 */
export declare class HederaGetContractTool extends BaseHederaQueryTool<typeof GetContractZodSchema> {
    name: string;
    description: string;
    specificInputSchema: z.ZodObject<{
        contractIdOrAddress: z.ZodString;
        timestamp: z.ZodOptional<z.ZodString>;
        includeBytecode: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    }, "strip", z.ZodTypeAny, {
        contractIdOrAddress: string;
        includeBytecode: boolean;
        timestamp?: string | undefined;
    }, {
        contractIdOrAddress: string;
        timestamp?: string | undefined;
        includeBytecode?: boolean | undefined;
    }>;
    namespace: string;
    constructor(params: BaseHederaQueryToolParams);
    protected getLargeFieldProcessors(args: z.infer<typeof GetContractZodSchema>): Record<string, FieldProcessor>;
    protected executeQuery(args: z.infer<typeof GetContractZodSchema>): Promise<unknown>;
}
export {};
