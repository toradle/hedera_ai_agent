import { z } from 'zod';
import { BaseHederaTransactionTool, BaseHederaTransactionToolParams } from '../common/base-hedera-transaction-tool';
import { BaseServiceBuilder } from '../../../builders/base-service-builder';
declare const UnpauseTokenZodSchemaCore: z.ZodObject<{
    tokenId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    tokenId: string;
}, {
    tokenId: string;
}>;
export declare class HederaUnpauseTokenTool extends BaseHederaTransactionTool<typeof UnpauseTokenZodSchemaCore> {
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
    protected callBuilderMethod(builder: BaseServiceBuilder, specificArgs: z.infer<typeof UnpauseTokenZodSchemaCore>): Promise<void>;
}
export {};
