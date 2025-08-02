import { z } from 'zod';
import { BaseHederaTransactionTool, BaseHederaTransactionToolParams } from '../common/base-hedera-transaction-tool';
import { BaseServiceBuilder } from '../../../builders/base-service-builder';
declare const DeleteAccountZodSchemaCore: z.ZodObject<{
    deleteAccountId: z.ZodString;
    transferAccountId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    deleteAccountId: string;
    transferAccountId: string;
}, {
    deleteAccountId: string;
    transferAccountId: string;
}>;
export declare class HederaDeleteAccountTool extends BaseHederaTransactionTool<typeof DeleteAccountZodSchemaCore> {
    name: string;
    description: string;
    specificInputSchema: z.ZodObject<{
        deleteAccountId: z.ZodString;
        transferAccountId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        deleteAccountId: string;
        transferAccountId: string;
    }, {
        deleteAccountId: string;
        transferAccountId: string;
    }>;
    namespace: string;
    constructor(params: BaseHederaTransactionToolParams);
    protected getServiceBuilder(): BaseServiceBuilder;
    protected callBuilderMethod(builder: BaseServiceBuilder, specificArgs: z.infer<typeof DeleteAccountZodSchemaCore>): Promise<void>;
}
export {};
