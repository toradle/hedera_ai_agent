import { z } from 'zod';
import { BaseHederaTransactionTool, BaseHederaTransactionToolParams } from '../common/base-hedera-transaction-tool';
import { BaseServiceBuilder } from '../../../builders/base-service-builder';
declare const DeleteTopicZodSchemaCore: z.ZodObject<{
    topicId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    topicId: string;
}, {
    topicId: string;
}>;
export declare class HederaDeleteTopicTool extends BaseHederaTransactionTool<typeof DeleteTopicZodSchemaCore> {
    name: string;
    description: string;
    specificInputSchema: z.ZodObject<{
        topicId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        topicId: string;
    }, {
        topicId: string;
    }>;
    namespace: string;
    constructor(params: BaseHederaTransactionToolParams);
    protected getServiceBuilder(): BaseServiceBuilder;
    protected callBuilderMethod(builder: BaseServiceBuilder, specificArgs: z.infer<typeof DeleteTopicZodSchemaCore>): Promise<void>;
}
export {};
