import { z } from 'zod';
import { BaseHederaTransactionTool, BaseHederaTransactionToolParams } from '../common/base-hedera-transaction-tool';
import { BaseServiceBuilder } from '../../../builders/base-service-builder';
declare const ClaimAirdropZodSchemaCore: z.ZodObject<{
    pendingAirdrops: z.ZodArray<z.ZodObject<{
        senderAccountId: z.ZodString;
        tokenId: z.ZodString;
        serialNumber: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
    }, "strip", z.ZodTypeAny, {
        serialNumber: string | number;
        tokenId: string;
        senderAccountId: string;
    }, {
        serialNumber: string | number;
        tokenId: string;
        senderAccountId: string;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    pendingAirdrops: {
        serialNumber: string | number;
        tokenId: string;
        senderAccountId: string;
    }[];
}, {
    pendingAirdrops: {
        serialNumber: string | number;
        tokenId: string;
        senderAccountId: string;
    }[];
}>;
export declare class HederaClaimAirdropTool extends BaseHederaTransactionTool<typeof ClaimAirdropZodSchemaCore> {
    name: string;
    description: string;
    specificInputSchema: z.ZodObject<{
        pendingAirdrops: z.ZodArray<z.ZodObject<{
            senderAccountId: z.ZodString;
            tokenId: z.ZodString;
            serialNumber: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
        }, "strip", z.ZodTypeAny, {
            serialNumber: string | number;
            tokenId: string;
            senderAccountId: string;
        }, {
            serialNumber: string | number;
            tokenId: string;
            senderAccountId: string;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        pendingAirdrops: {
            serialNumber: string | number;
            tokenId: string;
            senderAccountId: string;
        }[];
    }, {
        pendingAirdrops: {
            serialNumber: string | number;
            tokenId: string;
            senderAccountId: string;
        }[];
    }>;
    namespace: string;
    constructor(params: BaseHederaTransactionToolParams);
    protected getServiceBuilder(): BaseServiceBuilder;
    protected callBuilderMethod(builder: BaseServiceBuilder, specificArgs: z.infer<typeof ClaimAirdropZodSchemaCore>): Promise<void>;
}
export {};
