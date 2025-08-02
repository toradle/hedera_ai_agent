import { z } from 'zod';
import { BaseHederaTransactionTool, BaseHederaTransactionToolParams } from '../common/base-hedera-transaction-tool';
import { BaseServiceBuilder } from '../../../builders';
declare const MintNFTZodSchemaCore: z.ZodObject<{
    tokenId: z.ZodString;
    metadata: z.ZodArray<z.ZodString, "many">;
    batchSize: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    tokenId: string;
    metadata: string[];
    batchSize?: number | undefined;
}, {
    tokenId: string;
    metadata: string[];
    batchSize?: number | undefined;
}>;
export declare class HederaMintNftTool extends BaseHederaTransactionTool<typeof MintNFTZodSchemaCore> {
    name: string;
    description: string;
    specificInputSchema: z.ZodObject<{
        tokenId: z.ZodString;
        metadata: z.ZodArray<z.ZodString, "many">;
        batchSize: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tokenId: string;
        metadata: string[];
        batchSize?: number | undefined;
    }, {
        tokenId: string;
        metadata: string[];
        batchSize?: number | undefined;
    }>;
    namespace: string;
    constructor(params: BaseHederaTransactionToolParams);
    protected getServiceBuilder(): BaseServiceBuilder;
    protected callBuilderMethod(builder: BaseServiceBuilder, specificArgs: z.infer<typeof MintNFTZodSchemaCore>): Promise<void>;
}
export {};
