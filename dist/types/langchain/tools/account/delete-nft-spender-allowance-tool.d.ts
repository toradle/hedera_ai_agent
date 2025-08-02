import { z } from 'zod';
import { BaseHederaTransactionTool, BaseHederaTransactionToolParams } from '../common/base-hedera-transaction-tool';
import { BaseServiceBuilder } from '../../../builders/base-service-builder';
declare const DeleteNftSpenderAllowanceZodSchemaCore: z.ZodObject<{
    ownerAccountId: z.ZodOptional<z.ZodString>;
    spenderAccountId: z.ZodString;
    nftIdString: z.ZodString;
    tokenId: z.ZodString;
    serials: z.ZodArray<z.ZodUnion<[z.ZodNumber, z.ZodString]>, "many">;
}, "strip", z.ZodTypeAny, {
    tokenId: string;
    spenderAccountId: string;
    serials: (string | number)[];
    nftIdString: string;
    ownerAccountId?: string | undefined;
}, {
    tokenId: string;
    spenderAccountId: string;
    serials: (string | number)[];
    nftIdString: string;
    ownerAccountId?: string | undefined;
}>;
export declare class HederaDeleteNftSpenderAllowanceTool extends BaseHederaTransactionTool<typeof DeleteNftSpenderAllowanceZodSchemaCore> {
    name: string;
    description: string;
    specificInputSchema: z.ZodObject<{
        ownerAccountId: z.ZodOptional<z.ZodString>;
        spenderAccountId: z.ZodString;
        nftIdString: z.ZodString;
        tokenId: z.ZodString;
        serials: z.ZodArray<z.ZodUnion<[z.ZodNumber, z.ZodString]>, "many">;
    }, "strip", z.ZodTypeAny, {
        tokenId: string;
        spenderAccountId: string;
        serials: (string | number)[];
        nftIdString: string;
        ownerAccountId?: string | undefined;
    }, {
        tokenId: string;
        spenderAccountId: string;
        serials: (string | number)[];
        nftIdString: string;
        ownerAccountId?: string | undefined;
    }>;
    namespace: string;
    constructor(params: BaseHederaTransactionToolParams);
    protected getServiceBuilder(): BaseServiceBuilder;
    protected callBuilderMethod(builder: BaseServiceBuilder, specificArgs: z.infer<typeof DeleteNftSpenderAllowanceZodSchemaCore>): Promise<void>;
}
export {};
