import { z } from 'zod';
import { BaseHederaTransactionTool, BaseHederaTransactionToolParams } from '../common/base-hedera-transaction-tool';
import { BaseServiceBuilder } from '../../../builders';
declare const TransferNftZodSchemaCore: z.ZodObject<{
    tokenId: z.ZodString;
    serial: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
    senderAccountId: z.ZodString;
    receiverAccountId: z.ZodString;
    isApproved: z.ZodOptional<z.ZodBoolean>;
    memo: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    tokenId: string;
    senderAccountId: string;
    serial: string | number;
    receiverAccountId: string;
    memo?: string | undefined;
    isApproved?: boolean | undefined;
}, {
    tokenId: string;
    senderAccountId: string;
    serial: string | number;
    receiverAccountId: string;
    memo?: string | undefined;
    isApproved?: boolean | undefined;
}>;
export declare class HederaTransferNftTool extends BaseHederaTransactionTool<typeof TransferNftZodSchemaCore> {
    name: string;
    description: string;
    specificInputSchema: z.ZodObject<{
        tokenId: z.ZodString;
        serial: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
        senderAccountId: z.ZodString;
        receiverAccountId: z.ZodString;
        isApproved: z.ZodOptional<z.ZodBoolean>;
        memo: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        tokenId: string;
        senderAccountId: string;
        serial: string | number;
        receiverAccountId: string;
        memo?: string | undefined;
        isApproved?: boolean | undefined;
    }, {
        tokenId: string;
        senderAccountId: string;
        serial: string | number;
        receiverAccountId: string;
        memo?: string | undefined;
        isApproved?: boolean | undefined;
    }>;
    namespace: string;
    constructor(params: BaseHederaTransactionToolParams);
    protected getServiceBuilder(): BaseServiceBuilder;
    protected callBuilderMethod(builder: BaseServiceBuilder, specificArgs: z.infer<typeof TransferNftZodSchemaCore>): Promise<void>;
}
export {};
