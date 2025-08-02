import { z } from 'zod';
import { BaseHederaTransactionTool, BaseHederaTransactionToolParams } from '../common/base-hedera-transaction-tool';
import { BaseServiceBuilder } from '../../../builders/base-service-builder';
declare const WipeTokenAccountZodSchemaCore: z.ZodObject<{
    tokenId: z.ZodString;
    accountId: z.ZodString;
    amount: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodString]>>;
    serials: z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodNumber, z.ZodString]>, "many">>;
}, "strip", z.ZodTypeAny, {
    tokenId: string;
    accountId: string;
    amount?: string | number | undefined;
    serials?: (string | number)[] | undefined;
}, {
    tokenId: string;
    accountId: string;
    amount?: string | number | undefined;
    serials?: (string | number)[] | undefined;
}>;
export declare class HederaWipeTokenAccountTool extends BaseHederaTransactionTool<typeof WipeTokenAccountZodSchemaCore> {
    name: string;
    description: string;
    specificInputSchema: z.ZodObject<{
        tokenId: z.ZodString;
        accountId: z.ZodString;
        amount: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodString]>>;
        serials: z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodNumber, z.ZodString]>, "many">>;
    }, "strip", z.ZodTypeAny, {
        tokenId: string;
        accountId: string;
        amount?: string | number | undefined;
        serials?: (string | number)[] | undefined;
    }, {
        tokenId: string;
        accountId: string;
        amount?: string | number | undefined;
        serials?: (string | number)[] | undefined;
    }>;
    namespace: string;
    constructor(params: BaseHederaTransactionToolParams);
    protected getServiceBuilder(): BaseServiceBuilder;
    protected callBuilderMethod(builder: BaseServiceBuilder, specificArgs: z.infer<typeof WipeTokenAccountZodSchemaCore>): Promise<void>;
}
export {};
