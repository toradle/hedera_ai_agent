import { z } from 'zod';
import { BaseHederaTransactionTool, BaseHederaTransactionToolParams } from '../common/base-hedera-transaction-tool';
import { BaseServiceBuilder } from '../../../builders/base-service-builder';
declare const UpdateTopicZodSchemaCore: z.ZodObject<{
    topicId: z.ZodString;
    memo: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    adminKey: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    submitKey: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    autoRenewPeriod: z.ZodOptional<z.ZodNumber>;
    autoRenewAccountId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    feeScheduleKey: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    exemptAccountIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    topicId: string;
    adminKey?: string | null | undefined;
    feeScheduleKey?: string | null | undefined;
    memo?: string | null | undefined;
    autoRenewAccountId?: string | null | undefined;
    autoRenewPeriod?: number | undefined;
    submitKey?: string | null | undefined;
    exemptAccountIds?: string[] | undefined;
}, {
    topicId: string;
    adminKey?: string | null | undefined;
    feeScheduleKey?: string | null | undefined;
    memo?: string | null | undefined;
    autoRenewAccountId?: string | null | undefined;
    autoRenewPeriod?: number | undefined;
    submitKey?: string | null | undefined;
    exemptAccountIds?: string[] | undefined;
}>;
export declare class HederaUpdateTopicTool extends BaseHederaTransactionTool<typeof UpdateTopicZodSchemaCore> {
    name: string;
    description: string;
    specificInputSchema: z.ZodObject<{
        topicId: z.ZodString;
        memo: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        adminKey: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        submitKey: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        autoRenewPeriod: z.ZodOptional<z.ZodNumber>;
        autoRenewAccountId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        feeScheduleKey: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        exemptAccountIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        topicId: string;
        adminKey?: string | null | undefined;
        feeScheduleKey?: string | null | undefined;
        memo?: string | null | undefined;
        autoRenewAccountId?: string | null | undefined;
        autoRenewPeriod?: number | undefined;
        submitKey?: string | null | undefined;
        exemptAccountIds?: string[] | undefined;
    }, {
        topicId: string;
        adminKey?: string | null | undefined;
        feeScheduleKey?: string | null | undefined;
        memo?: string | null | undefined;
        autoRenewAccountId?: string | null | undefined;
        autoRenewPeriod?: number | undefined;
        submitKey?: string | null | undefined;
        exemptAccountIds?: string[] | undefined;
    }>;
    namespace: string;
    constructor(params: BaseHederaTransactionToolParams);
    protected getServiceBuilder(): BaseServiceBuilder;
    protected callBuilderMethod(builder: BaseServiceBuilder, specificArgs: z.infer<typeof UpdateTopicZodSchemaCore>): Promise<void>;
}
export {};
