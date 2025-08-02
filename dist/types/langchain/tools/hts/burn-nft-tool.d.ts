import { z } from 'zod';
import { BaseHederaTransactionTool, BaseHederaTransactionToolParams } from '../common/base-hedera-transaction-tool';
import { BaseServiceBuilder } from '../../../builders/base-service-builder';
declare const BurnNFTZodSchemaCore: z.ZodObject<{
    tokenId: z.ZodString;
    serials: z.ZodArray<z.ZodUnion<[z.ZodNumber, z.ZodString]>, "many">;
}, "strip", z.ZodTypeAny, {
    tokenId: string;
    serials: (string | number)[];
}, {
    tokenId: string;
    serials: (string | number)[];
}>;
export declare class HederaBurnNftTool extends BaseHederaTransactionTool<typeof BurnNFTZodSchemaCore> {
    name: string;
    description: string;
    specificInputSchema: z.ZodObject<{
        tokenId: z.ZodString;
        serials: z.ZodArray<z.ZodUnion<[z.ZodNumber, z.ZodString]>, "many">;
    }, "strip", z.ZodTypeAny, {
        tokenId: string;
        serials: (string | number)[];
    }, {
        tokenId: string;
        serials: (string | number)[];
    }>;
    namespace: string;
    constructor(params: BaseHederaTransactionToolParams);
    protected getServiceBuilder(): BaseServiceBuilder;
    protected callBuilderMethod(builder: BaseServiceBuilder, specificArgs: z.infer<typeof BurnNFTZodSchemaCore>): Promise<void>;
}
export {};
