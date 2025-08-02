import { z } from 'zod';
import { BaseHederaTransactionTool, BaseHederaTransactionToolParams } from '../common/base-hedera-transaction-tool';
import { BaseServiceBuilder } from '../../../builders/base-service-builder';
declare const AssociateTokensZodSchemaCore: z.ZodObject<{
    accountId: z.ZodString;
    tokenIds: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    accountId: string;
    tokenIds: string[];
}, {
    accountId: string;
    tokenIds: string[];
}>;
export declare class HederaAssociateTokensTool extends BaseHederaTransactionTool<typeof AssociateTokensZodSchemaCore> {
    name: string;
    description: string;
    specificInputSchema: z.ZodObject<{
        accountId: z.ZodString;
        tokenIds: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        accountId: string;
        tokenIds: string[];
    }, {
        accountId: string;
        tokenIds: string[];
    }>;
    namespace: string;
    constructor(params: BaseHederaTransactionToolParams);
    protected getServiceBuilder(): BaseServiceBuilder;
    protected callBuilderMethod(builder: BaseServiceBuilder, specificArgs: z.infer<typeof AssociateTokensZodSchemaCore>): Promise<void>;
}
export {};
