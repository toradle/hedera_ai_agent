import { z } from 'zod';
import { BaseHederaTransactionTool, BaseHederaTransactionToolParams } from '../common/base-hedera-transaction-tool';
import { BaseServiceBuilder } from '../../../builders/base-service-builder';
declare const RevokeFungibleTokenAllowanceZodSchemaCore: z.ZodObject<{
    ownerAccountId: z.ZodOptional<z.ZodString>;
    spenderAccountId: z.ZodString;
    tokenId: z.ZodString;
    memo: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    tokenId: string;
    spenderAccountId: string;
    memo?: string | undefined;
    ownerAccountId?: string | undefined;
}, {
    tokenId: string;
    spenderAccountId: string;
    memo?: string | undefined;
    ownerAccountId?: string | undefined;
}>;
export declare class HederaRevokeFungibleTokenAllowanceTool extends BaseHederaTransactionTool<typeof RevokeFungibleTokenAllowanceZodSchemaCore> {
    name: string;
    description: string;
    specificInputSchema: z.ZodObject<{
        ownerAccountId: z.ZodOptional<z.ZodString>;
        spenderAccountId: z.ZodString;
        tokenId: z.ZodString;
        memo: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        tokenId: string;
        spenderAccountId: string;
        memo?: string | undefined;
        ownerAccountId?: string | undefined;
    }, {
        tokenId: string;
        spenderAccountId: string;
        memo?: string | undefined;
        ownerAccountId?: string | undefined;
    }>;
    namespace: string;
    constructor(params: BaseHederaTransactionToolParams);
    protected getServiceBuilder(): BaseServiceBuilder;
    protected callBuilderMethod(builder: BaseServiceBuilder, specificArgs: z.infer<typeof RevokeFungibleTokenAllowanceZodSchemaCore>): Promise<void>;
}
export {};
