import { z } from 'zod';
import { BaseHederaTransactionTool, BaseHederaTransactionToolParams } from '../common/base-hedera-transaction-tool';
import { BaseServiceBuilder } from '../../../builders/base-service-builder';
declare const UpdateContractZodSchemaCore: z.ZodObject<{
    contractId: z.ZodString;
    adminKey: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    autoRenewPeriod: z.ZodOptional<z.ZodNumber>;
    memo: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    stakedAccountId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    stakedNodeId: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    declineStakingReward: z.ZodOptional<z.ZodBoolean>;
    maxAutomaticTokenAssociations: z.ZodOptional<z.ZodNumber>;
    proxyAccountId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    contractId: string;
    adminKey?: string | null | undefined;
    memo?: string | null | undefined;
    autoRenewPeriod?: number | undefined;
    maxAutomaticTokenAssociations?: number | undefined;
    stakedAccountId?: string | null | undefined;
    stakedNodeId?: number | null | undefined;
    declineStakingReward?: boolean | undefined;
    proxyAccountId?: string | null | undefined;
}, {
    contractId: string;
    adminKey?: string | null | undefined;
    memo?: string | null | undefined;
    autoRenewPeriod?: number | undefined;
    maxAutomaticTokenAssociations?: number | undefined;
    stakedAccountId?: string | null | undefined;
    stakedNodeId?: number | null | undefined;
    declineStakingReward?: boolean | undefined;
    proxyAccountId?: string | null | undefined;
}>;
export declare class HederaUpdateContractTool extends BaseHederaTransactionTool<typeof UpdateContractZodSchemaCore> {
    name: string;
    description: string;
    specificInputSchema: z.ZodObject<{
        contractId: z.ZodString;
        adminKey: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        autoRenewPeriod: z.ZodOptional<z.ZodNumber>;
        memo: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        stakedAccountId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        stakedNodeId: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        declineStakingReward: z.ZodOptional<z.ZodBoolean>;
        maxAutomaticTokenAssociations: z.ZodOptional<z.ZodNumber>;
        proxyAccountId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        contractId: string;
        adminKey?: string | null | undefined;
        memo?: string | null | undefined;
        autoRenewPeriod?: number | undefined;
        maxAutomaticTokenAssociations?: number | undefined;
        stakedAccountId?: string | null | undefined;
        stakedNodeId?: number | null | undefined;
        declineStakingReward?: boolean | undefined;
        proxyAccountId?: string | null | undefined;
    }, {
        contractId: string;
        adminKey?: string | null | undefined;
        memo?: string | null | undefined;
        autoRenewPeriod?: number | undefined;
        maxAutomaticTokenAssociations?: number | undefined;
        stakedAccountId?: string | null | undefined;
        stakedNodeId?: number | null | undefined;
        declineStakingReward?: boolean | undefined;
        proxyAccountId?: string | null | undefined;
    }>;
    namespace: string;
    constructor(params: BaseHederaTransactionToolParams);
    protected getServiceBuilder(): BaseServiceBuilder;
    protected callBuilderMethod(builder: BaseServiceBuilder, specificArgs: z.infer<typeof UpdateContractZodSchemaCore>): Promise<void>;
}
export {};
