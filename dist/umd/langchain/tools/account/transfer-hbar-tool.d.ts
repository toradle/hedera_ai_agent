import { z } from 'zod';
import { BaseHederaTransactionTool, BaseHederaTransactionToolParams } from '../common/base-hedera-transaction-tool';
import { BaseServiceBuilder } from '../../../builders/base-service-builder';
declare const TransferHbarZodSchemaCore: z.ZodObject<{
    transfers: z.ZodArray<z.ZodObject<{
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
    transfers: {
        accountId: string;
        amount: string | number;
    }[];
    memo?: string | undefined;
}, {
    transfers: {
        accountId: string;
        amount: string | number;
    }[];
    memo?: string | undefined;
}>;
export declare class HederaTransferHbarTool extends BaseHederaTransactionTool<typeof TransferHbarZodSchemaCore> {
    name: string;
    description: string;
    specificInputSchema: z.ZodObject<{
        transfers: z.ZodArray<z.ZodObject<{
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
        transfers: {
            accountId: string;
            amount: string | number;
        }[];
        memo?: string | undefined;
    }, {
        transfers: {
            accountId: string;
            amount: string | number;
        }[];
        memo?: string | undefined;
    }>;
    namespace: string;
    constructor(params: BaseHederaTransactionToolParams);
    protected getServiceBuilder(): BaseServiceBuilder;
    protected callBuilderMethod(builder: BaseServiceBuilder, specificArgs: z.infer<typeof TransferHbarZodSchemaCore>): Promise<void>;
}
export {};
