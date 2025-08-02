import { z } from 'zod';
import { BaseHederaTransactionTool, BaseHederaTransactionToolParams } from '../common/base-hedera-transaction-tool';
import { BaseServiceBuilder } from '../../../builders/base-service-builder';
declare const RejectTokensZodSchemaCore: z.ZodObject<{
    tokenId: z.ZodString;
    memo: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    tokenId: string;
    memo?: string | undefined;
}, {
    tokenId: string;
    memo?: string | undefined;
}>;
export declare class HederaRejectTokensTool extends BaseHederaTransactionTool<typeof RejectTokensZodSchemaCore> {
    name: string;
    description: string;
    specificInputSchema: z.ZodObject<{
        tokenId: z.ZodString;
        memo: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        tokenId: string;
        memo?: string | undefined;
    }, {
        tokenId: string;
        memo?: string | undefined;
    }>;
    namespace: string;
    constructor(params: BaseHederaTransactionToolParams);
    protected getServiceBuilder(): BaseServiceBuilder;
    protected callBuilderMethod(builder: BaseServiceBuilder, specificArgs: z.infer<typeof RejectTokensZodSchemaCore>): Promise<void>;
}
export {};
