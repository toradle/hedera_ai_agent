import { z } from 'zod';
import { BaseHederaTransactionTool, BaseHederaTransactionToolParams } from '../common/base-hedera-transaction-tool';
import { BaseServiceBuilder } from '../../../builders/base-service-builder';
declare const FreezeTokenAccountZodSchemaCore: z.ZodObject<{
    tokenId: z.ZodString;
    accountId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    tokenId: string;
    accountId: string;
}, {
    tokenId: string;
    accountId: string;
}>;
export declare class HederaFreezeTokenAccountTool extends BaseHederaTransactionTool<typeof FreezeTokenAccountZodSchemaCore> {
    name: string;
    description: string;
    specificInputSchema: z.ZodObject<{
        tokenId: z.ZodString;
        accountId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        tokenId: string;
        accountId: string;
    }, {
        tokenId: string;
        accountId: string;
    }>;
    namespace: string;
    constructor(params: BaseHederaTransactionToolParams);
    protected getServiceBuilder(): BaseServiceBuilder;
    protected callBuilderMethod(builder: BaseServiceBuilder, specificArgs: z.infer<typeof FreezeTokenAccountZodSchemaCore>): Promise<void>;
}
export {};
