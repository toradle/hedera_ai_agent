import { z } from 'zod';
import { BaseHederaTransactionTool, BaseHederaTransactionToolParams } from '../common/base-hedera-transaction-tool';
import { BaseServiceBuilder } from '../../../builders/base-service-builder';
declare const DeleteNftSerialAllowancesZodSchemaCore: z.ZodObject<{
    ownerAccountId: z.ZodOptional<z.ZodString>;
    nftIdString: z.ZodString;
    memo: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    nftIdString: string;
    memo?: string | undefined;
    ownerAccountId?: string | undefined;
}, {
    nftIdString: string;
    memo?: string | undefined;
    ownerAccountId?: string | undefined;
}>;
export declare class HederaDeleteNftSerialAllowancesTool extends BaseHederaTransactionTool<typeof DeleteNftSerialAllowancesZodSchemaCore> {
    name: string;
    description: string;
    specificInputSchema: z.ZodObject<{
        ownerAccountId: z.ZodOptional<z.ZodString>;
        nftIdString: z.ZodString;
        memo: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        nftIdString: string;
        memo?: string | undefined;
        ownerAccountId?: string | undefined;
    }, {
        nftIdString: string;
        memo?: string | undefined;
        ownerAccountId?: string | undefined;
    }>;
    namespace: string;
    constructor(params: BaseHederaTransactionToolParams);
    protected getServiceBuilder(): BaseServiceBuilder;
    protected callBuilderMethod(builder: BaseServiceBuilder, specificArgs: z.infer<typeof DeleteNftSerialAllowancesZodSchemaCore>): Promise<void>;
}
export {};
