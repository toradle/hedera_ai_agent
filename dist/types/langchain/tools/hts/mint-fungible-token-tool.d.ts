import { z } from 'zod';
import { BaseHederaTransactionTool, BaseHederaTransactionToolParams } from '../common/base-hedera-transaction-tool';
import { BaseServiceBuilder } from '../../../builders/base-service-builder';
declare const MintFTZodSchemaCore: z.ZodObject<{
    tokenId: z.ZodString;
    amount: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
}, "strip", z.ZodTypeAny, {
    tokenId: string;
    amount: string | number;
}, {
    tokenId: string;
    amount: string | number;
}>;
export declare class HederaMintFungibleTokenTool extends BaseHederaTransactionTool<typeof MintFTZodSchemaCore> {
    name: string;
    description: string;
    specificInputSchema: z.ZodObject<{
        tokenId: z.ZodString;
        amount: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
    }, "strip", z.ZodTypeAny, {
        tokenId: string;
        amount: string | number;
    }, {
        tokenId: string;
        amount: string | number;
    }>;
    namespace: string;
    constructor(params: BaseHederaTransactionToolParams);
    protected getServiceBuilder(): BaseServiceBuilder;
    protected callBuilderMethod(builder: BaseServiceBuilder, specificArgs: z.infer<typeof MintFTZodSchemaCore>): Promise<void>;
}
export {};
