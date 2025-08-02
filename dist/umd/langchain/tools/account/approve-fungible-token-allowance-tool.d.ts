import { z } from 'zod';
import { BaseHederaTransactionTool, BaseHederaTransactionToolParams } from '../common/base-hedera-transaction-tool';
import { BaseServiceBuilder } from '../../../builders/base-service-builder';
declare const ApproveFungibleTokenAllowanceZodSchemaCore: z.ZodObject<{
    ownerAccountId: z.ZodOptional<z.ZodString>;
    spenderAccountId: z.ZodString;
    tokenId: z.ZodString;
    amount: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
    memo: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    tokenId: string;
    amount: string | number;
    spenderAccountId: string;
    memo?: string | undefined;
    ownerAccountId?: string | undefined;
}, {
    tokenId: string;
    amount: string | number;
    spenderAccountId: string;
    memo?: string | undefined;
    ownerAccountId?: string | undefined;
}>;
export declare class HederaApproveFungibleTokenAllowanceTool extends BaseHederaTransactionTool<typeof ApproveFungibleTokenAllowanceZodSchemaCore> {
    name: string;
    description: string;
    specificInputSchema: z.ZodObject<{
        ownerAccountId: z.ZodOptional<z.ZodString>;
        spenderAccountId: z.ZodString;
        tokenId: z.ZodString;
        amount: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
        memo: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        tokenId: string;
        amount: string | number;
        spenderAccountId: string;
        memo?: string | undefined;
        ownerAccountId?: string | undefined;
    }, {
        tokenId: string;
        amount: string | number;
        spenderAccountId: string;
        memo?: string | undefined;
        ownerAccountId?: string | undefined;
    }>;
    namespace: string;
    constructor(params: BaseHederaTransactionToolParams);
    protected getServiceBuilder(): BaseServiceBuilder;
    protected callBuilderMethod(builder: BaseServiceBuilder, specificArgs: z.infer<typeof ApproveFungibleTokenAllowanceZodSchemaCore>): Promise<void>;
}
export {};
