import { z } from 'zod';
import { BaseHederaTransactionTool, BaseHederaTransactionToolParams } from '../common/base-hedera-transaction-tool';
import { BaseServiceBuilder } from '../../../builders/base-service-builder';
declare const ApproveHbarAllowanceZodSchemaCore: z.ZodObject<{
    ownerAccountId: z.ZodOptional<z.ZodString>;
    spenderAccountId: z.ZodString;
    amount: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
    memo: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    amount: string | number;
    spenderAccountId: string;
    memo?: string | undefined;
    ownerAccountId?: string | undefined;
}, {
    amount: string | number;
    spenderAccountId: string;
    memo?: string | undefined;
    ownerAccountId?: string | undefined;
}>;
export declare class HederaApproveHbarAllowanceTool extends BaseHederaTransactionTool<typeof ApproveHbarAllowanceZodSchemaCore> {
    name: string;
    description: string;
    specificInputSchema: z.ZodObject<{
        ownerAccountId: z.ZodOptional<z.ZodString>;
        spenderAccountId: z.ZodString;
        amount: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
        memo: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        amount: string | number;
        spenderAccountId: string;
        memo?: string | undefined;
        ownerAccountId?: string | undefined;
    }, {
        amount: string | number;
        spenderAccountId: string;
        memo?: string | undefined;
        ownerAccountId?: string | undefined;
    }>;
    namespace: string;
    constructor(params: BaseHederaTransactionToolParams);
    protected getServiceBuilder(): BaseServiceBuilder;
    protected callBuilderMethod(builder: BaseServiceBuilder, specificArgs: z.infer<typeof ApproveHbarAllowanceZodSchemaCore>): Promise<void>;
}
export {};
