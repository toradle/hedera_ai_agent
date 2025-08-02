import { z } from 'zod';
import { BaseHederaTransactionTool, BaseHederaTransactionToolParams } from '../common/base-hedera-transaction-tool';
import { BaseServiceBuilder } from '../../../builders/base-service-builder';
declare const CreateTopicZodSchemaCore: z.ZodObject<{
    memo: z.ZodOptional<z.ZodString>;
    adminKey: z.ZodOptional<z.ZodString>;
    submitKey: z.ZodOptional<z.ZodString>;
    autoRenewPeriod: z.ZodOptional<z.ZodNumber>;
    autoRenewAccountId: z.ZodOptional<z.ZodString>;
    feeScheduleKey: z.ZodOptional<z.ZodString>;
    customFees: z.ZodOptional<z.ZodArray<z.ZodObject<{
        feeCollectorAccountId: z.ZodString;
        denominatingTokenId: z.ZodOptional<z.ZodString>;
        amount: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
    }, "strip", z.ZodTypeAny, {
        amount: string | number;
        feeCollectorAccountId: string;
        denominatingTokenId?: string | undefined;
    }, {
        amount: string | number;
        feeCollectorAccountId: string;
        denominatingTokenId?: string | undefined;
    }>, "many">>;
    exemptAccountIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    adminKey?: string | undefined;
    feeScheduleKey?: string | undefined;
    memo?: string | undefined;
    autoRenewAccountId?: string | undefined;
    autoRenewPeriod?: number | undefined;
    submitKey?: string | undefined;
    exemptAccountIds?: string[] | undefined;
    customFees?: {
        amount: string | number;
        feeCollectorAccountId: string;
        denominatingTokenId?: string | undefined;
    }[] | undefined;
}, {
    adminKey?: string | undefined;
    feeScheduleKey?: string | undefined;
    memo?: string | undefined;
    autoRenewAccountId?: string | undefined;
    autoRenewPeriod?: number | undefined;
    submitKey?: string | undefined;
    exemptAccountIds?: string[] | undefined;
    customFees?: {
        amount: string | number;
        feeCollectorAccountId: string;
        denominatingTokenId?: string | undefined;
    }[] | undefined;
}>;
export declare class HederaCreateTopicTool extends BaseHederaTransactionTool<typeof CreateTopicZodSchemaCore> {
    name: string;
    description: string;
    specificInputSchema: z.ZodObject<{
        memo: z.ZodOptional<z.ZodString>;
        adminKey: z.ZodOptional<z.ZodString>;
        submitKey: z.ZodOptional<z.ZodString>;
        autoRenewPeriod: z.ZodOptional<z.ZodNumber>;
        autoRenewAccountId: z.ZodOptional<z.ZodString>;
        feeScheduleKey: z.ZodOptional<z.ZodString>;
        customFees: z.ZodOptional<z.ZodArray<z.ZodObject<{
            feeCollectorAccountId: z.ZodString;
            denominatingTokenId: z.ZodOptional<z.ZodString>;
            amount: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
        }, "strip", z.ZodTypeAny, {
            amount: string | number;
            feeCollectorAccountId: string;
            denominatingTokenId?: string | undefined;
        }, {
            amount: string | number;
            feeCollectorAccountId: string;
            denominatingTokenId?: string | undefined;
        }>, "many">>;
        exemptAccountIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        adminKey?: string | undefined;
        feeScheduleKey?: string | undefined;
        memo?: string | undefined;
        autoRenewAccountId?: string | undefined;
        autoRenewPeriod?: number | undefined;
        submitKey?: string | undefined;
        exemptAccountIds?: string[] | undefined;
        customFees?: {
            amount: string | number;
            feeCollectorAccountId: string;
            denominatingTokenId?: string | undefined;
        }[] | undefined;
    }, {
        adminKey?: string | undefined;
        feeScheduleKey?: string | undefined;
        memo?: string | undefined;
        autoRenewAccountId?: string | undefined;
        autoRenewPeriod?: number | undefined;
        submitKey?: string | undefined;
        exemptAccountIds?: string[] | undefined;
        customFees?: {
            amount: string | number;
            feeCollectorAccountId: string;
            denominatingTokenId?: string | undefined;
        }[] | undefined;
    }>;
    namespace: string;
    /**
     *  Topic Creation cannot be scheduled yet.
     */
    protected neverScheduleThisTool: boolean;
    constructor(params: BaseHederaTransactionToolParams);
    protected getServiceBuilder(): BaseServiceBuilder;
    protected callBuilderMethod(builder: BaseServiceBuilder, specificArgs: z.infer<typeof CreateTopicZodSchemaCore>): Promise<void>;
}
export {};
