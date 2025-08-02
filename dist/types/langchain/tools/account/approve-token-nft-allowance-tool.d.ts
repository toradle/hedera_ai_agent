import { z } from 'zod';
import { BaseHederaTransactionTool, BaseHederaTransactionToolParams } from '../common/base-hedera-transaction-tool';
import { BaseServiceBuilder } from '../../../builders/base-service-builder';
declare const ApproveTokenNftAllowanceZodSchemaCore: z.ZodObject<{
    ownerAccountId: z.ZodOptional<z.ZodString>;
    spenderAccountId: z.ZodString;
    tokenId: z.ZodString;
    serials: z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodNumber, z.ZodString]>, "many">>;
    allSerials: z.ZodOptional<z.ZodBoolean>;
    memo: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    tokenId: string;
    spenderAccountId: string;
    memo?: string | undefined;
    ownerAccountId?: string | undefined;
    serials?: (string | number)[] | undefined;
    allSerials?: boolean | undefined;
}, {
    tokenId: string;
    spenderAccountId: string;
    memo?: string | undefined;
    ownerAccountId?: string | undefined;
    serials?: (string | number)[] | undefined;
    allSerials?: boolean | undefined;
}>;
export declare class HederaApproveTokenNftAllowanceTool extends BaseHederaTransactionTool<typeof ApproveTokenNftAllowanceZodSchemaCore> {
    name: string;
    description: string;
    specificInputSchema: z.ZodObject<{
        ownerAccountId: z.ZodOptional<z.ZodString>;
        spenderAccountId: z.ZodString;
        tokenId: z.ZodString;
        serials: z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodNumber, z.ZodString]>, "many">>;
        allSerials: z.ZodOptional<z.ZodBoolean>;
        memo: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        tokenId: string;
        spenderAccountId: string;
        memo?: string | undefined;
        ownerAccountId?: string | undefined;
        serials?: (string | number)[] | undefined;
        allSerials?: boolean | undefined;
    }, {
        tokenId: string;
        spenderAccountId: string;
        memo?: string | undefined;
        ownerAccountId?: string | undefined;
        serials?: (string | number)[] | undefined;
        allSerials?: boolean | undefined;
    }>;
    namespace: string;
    constructor(params: BaseHederaTransactionToolParams);
    protected getServiceBuilder(): BaseServiceBuilder;
    protected callBuilderMethod(builder: BaseServiceBuilder, specificArgs: z.infer<typeof ApproveTokenNftAllowanceZodSchemaCore>): Promise<void>;
}
export {};
