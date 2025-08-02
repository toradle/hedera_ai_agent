import { z } from 'zod';
import { BaseHederaTransactionTool, BaseHederaTransactionToolParams } from '../common/base-hedera-transaction-tool';
import { BaseServiceBuilder } from '../../../builders/base-service-builder';
declare const DeleteTokenZodSchemaCore: z.ZodObject<{
    tokenId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    tokenId: string;
}, {
    tokenId: string;
}>;
export declare class HederaDeleteTokenTool extends BaseHederaTransactionTool<typeof DeleteTokenZodSchemaCore> {
    name: string;
    description: string;
    specificInputSchema: z.ZodObject<{
        tokenId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        tokenId: string;
    }, {
        tokenId: string;
    }>;
    namespace: string;
    constructor(params: BaseHederaTransactionToolParams);
    protected getServiceBuilder(): BaseServiceBuilder;
    protected callBuilderMethod(builder: BaseServiceBuilder, specificArgs: z.infer<typeof DeleteTokenZodSchemaCore>): Promise<void>;
}
export {};
