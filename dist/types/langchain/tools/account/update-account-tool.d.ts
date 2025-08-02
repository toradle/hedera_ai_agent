import { z } from 'zod';
import { BaseHederaTransactionTool, BaseHederaTransactionToolParams } from '../common/base-hedera-transaction-tool';
import { BaseServiceBuilder } from '../../../builders/base-service-builder';
declare const UpdateAccountZodSchemaCore: z.ZodObject<{
    accountIdToUpdate: z.ZodString;
    key: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    autoRenewPeriod: z.ZodOptional<z.ZodNumber>;
    memo: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    maxAutomaticTokenAssociations: z.ZodOptional<z.ZodNumber>;
    stakedAccountId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    stakedNodeId: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    declineStakingReward: z.ZodOptional<z.ZodBoolean>;
    receiverSignatureRequired: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    accountIdToUpdate: string;
    key?: string | null | undefined;
    memo?: string | null | undefined;
    autoRenewPeriod?: number | undefined;
    receiverSignatureRequired?: boolean | undefined;
    maxAutomaticTokenAssociations?: number | undefined;
    stakedAccountId?: string | null | undefined;
    stakedNodeId?: number | null | undefined;
    declineStakingReward?: boolean | undefined;
}, {
    accountIdToUpdate: string;
    key?: string | null | undefined;
    memo?: string | null | undefined;
    autoRenewPeriod?: number | undefined;
    receiverSignatureRequired?: boolean | undefined;
    maxAutomaticTokenAssociations?: number | undefined;
    stakedAccountId?: string | null | undefined;
    stakedNodeId?: number | null | undefined;
    declineStakingReward?: boolean | undefined;
}>;
export declare class HederaUpdateAccountTool extends BaseHederaTransactionTool<typeof UpdateAccountZodSchemaCore> {
    name: string;
    description: string;
    specificInputSchema: z.ZodObject<{
        accountIdToUpdate: z.ZodString;
        key: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        autoRenewPeriod: z.ZodOptional<z.ZodNumber>;
        memo: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        maxAutomaticTokenAssociations: z.ZodOptional<z.ZodNumber>;
        stakedAccountId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        stakedNodeId: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        declineStakingReward: z.ZodOptional<z.ZodBoolean>;
        receiverSignatureRequired: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        accountIdToUpdate: string;
        key?: string | null | undefined;
        memo?: string | null | undefined;
        autoRenewPeriod?: number | undefined;
        receiverSignatureRequired?: boolean | undefined;
        maxAutomaticTokenAssociations?: number | undefined;
        stakedAccountId?: string | null | undefined;
        stakedNodeId?: number | null | undefined;
        declineStakingReward?: boolean | undefined;
    }, {
        accountIdToUpdate: string;
        key?: string | null | undefined;
        memo?: string | null | undefined;
        autoRenewPeriod?: number | undefined;
        receiverSignatureRequired?: boolean | undefined;
        maxAutomaticTokenAssociations?: number | undefined;
        stakedAccountId?: string | null | undefined;
        stakedNodeId?: number | null | undefined;
        declineStakingReward?: boolean | undefined;
    }>;
    namespace: string;
    constructor(params: BaseHederaTransactionToolParams);
    protected getServiceBuilder(): BaseServiceBuilder;
    /**
     * Passes the validated arguments directly to the AccountBuilder's updateAccount method.
     * The builder is responsible for all transformations and applying logic based on input values.
     * Omitted optional fields from the LLM mean those properties will not be targeted for update.
     */
    protected callBuilderMethod(builder: BaseServiceBuilder, specificArgs: z.infer<typeof UpdateAccountZodSchemaCore>): Promise<void>;
}
export {};
