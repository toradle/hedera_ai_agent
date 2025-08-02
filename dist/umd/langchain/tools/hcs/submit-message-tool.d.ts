import { z } from 'zod';
import { BaseHederaTransactionTool, BaseHederaTransactionToolParams } from '../common/base-hedera-transaction-tool';
import { BaseServiceBuilder } from '../../../builders/base-service-builder';
declare const SubmitMessageZodSchemaCore: z.ZodObject<{
    topicId: z.ZodString;
    message: z.ZodString;
    maxChunks: z.ZodOptional<z.ZodNumber>;
    chunkSize: z.ZodOptional<z.ZodNumber>;
    submitKey: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    message: string;
    topicId: string;
    submitKey?: string | undefined;
    maxChunks?: number | undefined;
    chunkSize?: number | undefined;
}, {
    message: string;
    topicId: string;
    submitKey?: string | undefined;
    maxChunks?: number | undefined;
    chunkSize?: number | undefined;
}>;
export declare class HederaSubmitMessageTool extends BaseHederaTransactionTool<typeof SubmitMessageZodSchemaCore> {
    name: string;
    description: string;
    specificInputSchema: z.ZodObject<{
        topicId: z.ZodString;
        message: z.ZodString;
        maxChunks: z.ZodOptional<z.ZodNumber>;
        chunkSize: z.ZodOptional<z.ZodNumber>;
        submitKey: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        message: string;
        topicId: string;
        submitKey?: string | undefined;
        maxChunks?: number | undefined;
        chunkSize?: number | undefined;
    }, {
        message: string;
        topicId: string;
        submitKey?: string | undefined;
        maxChunks?: number | undefined;
        chunkSize?: number | undefined;
    }>;
    namespace: string;
    constructor(params: BaseHederaTransactionToolParams);
    protected getServiceBuilder(): BaseServiceBuilder;
    protected callBuilderMethod(builder: BaseServiceBuilder, specificArgs: z.infer<typeof SubmitMessageZodSchemaCore>): Promise<void>;
}
export {};
