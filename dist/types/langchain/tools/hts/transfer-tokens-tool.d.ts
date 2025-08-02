import { z } from 'zod';
import { BaseHederaTransactionTool, BaseHederaTransactionToolParams } from '../common/base-hedera-transaction-tool';
import { BaseServiceBuilder } from '../../../builders/base-service-builder';
declare const TransferTokensZodObjectSchema: z.ZodObject<{
    tokenTransfers: z.ZodArray<z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
        type: z.ZodLiteral<"fungible">;
        tokenId: z.ZodString;
        accountId: z.ZodString;
        amount: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
    }, "strip", z.ZodTypeAny, {
        tokenId: string;
        accountId: string;
        type: "fungible";
        amount: string | number;
    }, {
        tokenId: string;
        accountId: string;
        type: "fungible";
        amount: string | number;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"nft">;
        tokenId: z.ZodString;
        serial: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
        senderAccountId: z.ZodString;
        receiverAccountId: z.ZodString;
        isApproved: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        tokenId: string;
        type: "nft";
        senderAccountId: string;
        serial: string | number;
        receiverAccountId: string;
        isApproved?: boolean | undefined;
    }, {
        tokenId: string;
        type: "nft";
        senderAccountId: string;
        serial: string | number;
        receiverAccountId: string;
        isApproved?: boolean | undefined;
    }>]>, "many">;
    hbarTransfers: z.ZodOptional<z.ZodArray<z.ZodObject<{
        accountId: z.ZodString;
        amount: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
    }, "strip", z.ZodTypeAny, {
        accountId: string;
        amount: string | number;
    }, {
        accountId: string;
        amount: string | number;
    }>, "many">>;
    memo: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    tokenTransfers: ({
        tokenId: string;
        accountId: string;
        type: "fungible";
        amount: string | number;
    } | {
        tokenId: string;
        type: "nft";
        senderAccountId: string;
        serial: string | number;
        receiverAccountId: string;
        isApproved?: boolean | undefined;
    })[];
    memo?: string | undefined;
    hbarTransfers?: {
        accountId: string;
        amount: string | number;
    }[] | undefined;
}, {
    tokenTransfers: ({
        tokenId: string;
        accountId: string;
        type: "fungible";
        amount: string | number;
    } | {
        tokenId: string;
        type: "nft";
        senderAccountId: string;
        serial: string | number;
        receiverAccountId: string;
        isApproved?: boolean | undefined;
    })[];
    memo?: string | undefined;
    hbarTransfers?: {
        accountId: string;
        amount: string | number;
    }[] | undefined;
}>;
export declare class HederaTransferTokensTool extends BaseHederaTransactionTool<typeof TransferTokensZodObjectSchema> {
    name: string;
    description: string;
    specificInputSchema: z.ZodObject<{
        tokenTransfers: z.ZodArray<z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
            type: z.ZodLiteral<"fungible">;
            tokenId: z.ZodString;
            accountId: z.ZodString;
            amount: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
        }, "strip", z.ZodTypeAny, {
            tokenId: string;
            accountId: string;
            type: "fungible";
            amount: string | number;
        }, {
            tokenId: string;
            accountId: string;
            type: "fungible";
            amount: string | number;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"nft">;
            tokenId: z.ZodString;
            serial: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
            senderAccountId: z.ZodString;
            receiverAccountId: z.ZodString;
            isApproved: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            tokenId: string;
            type: "nft";
            senderAccountId: string;
            serial: string | number;
            receiverAccountId: string;
            isApproved?: boolean | undefined;
        }, {
            tokenId: string;
            type: "nft";
            senderAccountId: string;
            serial: string | number;
            receiverAccountId: string;
            isApproved?: boolean | undefined;
        }>]>, "many">;
        hbarTransfers: z.ZodOptional<z.ZodArray<z.ZodObject<{
            accountId: z.ZodString;
            amount: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
        }, "strip", z.ZodTypeAny, {
            accountId: string;
            amount: string | number;
        }, {
            accountId: string;
            amount: string | number;
        }>, "many">>;
        memo: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        tokenTransfers: ({
            tokenId: string;
            accountId: string;
            type: "fungible";
            amount: string | number;
        } | {
            tokenId: string;
            type: "nft";
            senderAccountId: string;
            serial: string | number;
            receiverAccountId: string;
            isApproved?: boolean | undefined;
        })[];
        memo?: string | undefined;
        hbarTransfers?: {
            accountId: string;
            amount: string | number;
        }[] | undefined;
    }, {
        tokenTransfers: ({
            tokenId: string;
            accountId: string;
            type: "fungible";
            amount: string | number;
        } | {
            tokenId: string;
            type: "nft";
            senderAccountId: string;
            serial: string | number;
            receiverAccountId: string;
            isApproved?: boolean | undefined;
        })[];
        memo?: string | undefined;
        hbarTransfers?: {
            accountId: string;
            amount: string | number;
        }[] | undefined;
    }>;
    namespace: string;
    constructor(params: BaseHederaTransactionToolParams);
    protected getServiceBuilder(): BaseServiceBuilder;
    protected callBuilderMethod(builder: BaseServiceBuilder, specificArgs: z.infer<typeof TransferTokensZodObjectSchema>): Promise<void>;
}
export {};
