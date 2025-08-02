import { z } from 'zod';
import { BaseHederaTransactionTool, BaseHederaTransactionToolParams } from '../common/base-hedera-transaction-tool';
import { BaseServiceBuilder } from '../../../builders/base-service-builder';
declare const CreateAccountZodSchemaCore: z.ZodObject<{
    key: z.ZodOptional<z.ZodString>;
    alias: z.ZodOptional<z.ZodString>;
    initialBalance: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodString]>>;
    memo: z.ZodOptional<z.ZodString>;
    autoRenewAccountId: z.ZodOptional<z.ZodString>;
    autoRenewPeriod: z.ZodOptional<z.ZodNumber>;
    receiverSignatureRequired: z.ZodOptional<z.ZodBoolean>;
    maxAutomaticTokenAssociations: z.ZodOptional<z.ZodNumber>;
    stakedAccountId: z.ZodOptional<z.ZodString>;
    stakedNodeId: z.ZodOptional<z.ZodNumber>;
    declineStakingReward: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    key?: string | undefined;
    alias?: string | undefined;
    initialBalance?: string | number | undefined;
    memo?: string | undefined;
    autoRenewAccountId?: string | undefined;
    autoRenewPeriod?: number | undefined;
    receiverSignatureRequired?: boolean | undefined;
    maxAutomaticTokenAssociations?: number | undefined;
    stakedAccountId?: string | undefined;
    stakedNodeId?: number | undefined;
    declineStakingReward?: boolean | undefined;
}, {
    key?: string | undefined;
    alias?: string | undefined;
    initialBalance?: string | number | undefined;
    memo?: string | undefined;
    autoRenewAccountId?: string | undefined;
    autoRenewPeriod?: number | undefined;
    receiverSignatureRequired?: boolean | undefined;
    maxAutomaticTokenAssociations?: number | undefined;
    stakedAccountId?: string | undefined;
    stakedNodeId?: number | undefined;
    declineStakingReward?: boolean | undefined;
}>;
export declare class HederaCreateAccountTool extends BaseHederaTransactionTool<typeof CreateAccountZodSchemaCore> {
    name: string;
    description: string;
    specificInputSchema: z.ZodObject<{
        key: z.ZodOptional<z.ZodString>;
        alias: z.ZodOptional<z.ZodString>;
        initialBalance: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodString]>>;
        memo: z.ZodOptional<z.ZodString>;
        autoRenewAccountId: z.ZodOptional<z.ZodString>;
        autoRenewPeriod: z.ZodOptional<z.ZodNumber>;
        receiverSignatureRequired: z.ZodOptional<z.ZodBoolean>;
        maxAutomaticTokenAssociations: z.ZodOptional<z.ZodNumber>;
        stakedAccountId: z.ZodOptional<z.ZodString>;
        stakedNodeId: z.ZodOptional<z.ZodNumber>;
        declineStakingReward: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        key?: string | undefined;
        alias?: string | undefined;
        initialBalance?: string | number | undefined;
        memo?: string | undefined;
        autoRenewAccountId?: string | undefined;
        autoRenewPeriod?: number | undefined;
        receiverSignatureRequired?: boolean | undefined;
        maxAutomaticTokenAssociations?: number | undefined;
        stakedAccountId?: string | undefined;
        stakedNodeId?: number | undefined;
        declineStakingReward?: boolean | undefined;
    }, {
        key?: string | undefined;
        alias?: string | undefined;
        initialBalance?: string | number | undefined;
        memo?: string | undefined;
        autoRenewAccountId?: string | undefined;
        autoRenewPeriod?: number | undefined;
        receiverSignatureRequired?: boolean | undefined;
        maxAutomaticTokenAssociations?: number | undefined;
        stakedAccountId?: string | undefined;
        stakedNodeId?: number | undefined;
        declineStakingReward?: boolean | undefined;
    }>;
    namespace: string;
    constructor(params: BaseHederaTransactionToolParams);
    protected getServiceBuilder(): BaseServiceBuilder;
    protected callBuilderMethod(builder: BaseServiceBuilder, specificArgs: z.infer<typeof CreateAccountZodSchemaCore>): Promise<void>;
}
export {};
