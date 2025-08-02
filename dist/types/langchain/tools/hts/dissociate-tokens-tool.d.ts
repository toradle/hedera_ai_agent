import { z } from 'zod';
import { BaseHederaTransactionTool, BaseHederaTransactionToolParams } from '../common/base-hedera-transaction-tool';
import { BaseServiceBuilder } from '../../../builders/base-service-builder';
declare const DissociateTokensZodSchemaCore: z.ZodObject<{
    accountId: z.ZodString;
    tokenIds: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    accountId: string;
    tokenIds: string[];
}, {
    accountId: string;
    tokenIds: string[];
}>;
export declare class HederaDissociateTokensTool extends BaseHederaTransactionTool<typeof DissociateTokensZodSchemaCore> {
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
    protected callBuilderMethod(builder: BaseServiceBuilder, specificArgs: z.infer<typeof DissociateTokensZodSchemaCore>): Promise<void>;
}
export {};
