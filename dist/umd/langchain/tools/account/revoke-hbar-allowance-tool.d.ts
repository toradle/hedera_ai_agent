import { z } from 'zod';
import { BaseHederaTransactionTool, BaseHederaTransactionToolParams } from '../common/base-hedera-transaction-tool';
import { BaseServiceBuilder } from '../../../builders/base-service-builder';
declare const RevokeHbarAllowanceZodSchemaCore: z.ZodObject<{
    ownerAccountId: z.ZodOptional<z.ZodString>;
    spenderAccountId: z.ZodString;
    memo: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    spenderAccountId: string;
    memo?: string | undefined;
    ownerAccountId?: string | undefined;
}, {
    spenderAccountId: string;
    memo?: string | undefined;
    ownerAccountId?: string | undefined;
}>;
export declare class HederaRevokeHbarAllowanceTool extends BaseHederaTransactionTool<typeof RevokeHbarAllowanceZodSchemaCore> {
    name: string;
    description: string;
    specificInputSchema: z.ZodObject<{
        ownerAccountId: z.ZodOptional<z.ZodString>;
        spenderAccountId: z.ZodString;
        memo: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        spenderAccountId: string;
        memo?: string | undefined;
        ownerAccountId?: string | undefined;
    }, {
        spenderAccountId: string;
        memo?: string | undefined;
        ownerAccountId?: string | undefined;
    }>;
    namespace: string;
    constructor(params: BaseHederaTransactionToolParams);
    protected getServiceBuilder(): BaseServiceBuilder;
    protected callBuilderMethod(builder: BaseServiceBuilder, specificArgs: z.infer<typeof RevokeHbarAllowanceZodSchemaCore>): Promise<void>;
}
export {};
