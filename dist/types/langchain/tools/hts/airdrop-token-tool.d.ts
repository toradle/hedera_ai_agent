import { z } from 'zod';
import { BaseHederaTransactionTool, BaseHederaTransactionToolParams } from '../common/base-hedera-transaction-tool';
import { BaseServiceBuilder } from '../../../builders/base-service-builder';
declare const AirdropTokenZodSchemaCore: z.ZodObject<{
    tokenId: z.ZodString;
    recipients: z.ZodArray<z.ZodObject<{
        accountId: z.ZodString;
        amount: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
    }, "strip", z.ZodTypeAny, {
        accountId: string;
        amount: string | number;
    }, {
        accountId: string;
        amount: string | number;
    }>, "many">;
    memo: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    tokenId: string;
    recipients: {
        accountId: string;
        amount: string | number;
    }[];
    memo?: string | undefined;
}, {
    tokenId: string;
    recipients: {
        accountId: string;
        amount: string | number;
    }[];
    memo?: string | undefined;
}>;
export declare class HederaAirdropTokenTool extends BaseHederaTransactionTool<typeof AirdropTokenZodSchemaCore> {
    name: string;
    description: string;
    specificInputSchema: z.ZodObject<{
        tokenId: z.ZodString;
        recipients: z.ZodArray<z.ZodObject<{
            accountId: z.ZodString;
            amount: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
        }, "strip", z.ZodTypeAny, {
            accountId: string;
            amount: string | number;
        }, {
            accountId: string;
            amount: string | number;
        }>, "many">;
        memo: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        tokenId: string;
        recipients: {
            accountId: string;
            amount: string | number;
        }[];
        memo?: string | undefined;
    }, {
        tokenId: string;
        recipients: {
            accountId: string;
            amount: string | number;
        }[];
        memo?: string | undefined;
    }>;
    namespace: string;
    constructor(params: BaseHederaTransactionToolParams);
    protected getServiceBuilder(): BaseServiceBuilder;
    protected callBuilderMethod(builder: BaseServiceBuilder, specificArgs: z.infer<typeof AirdropTokenZodSchemaCore>): Promise<void>;
}
export {};
