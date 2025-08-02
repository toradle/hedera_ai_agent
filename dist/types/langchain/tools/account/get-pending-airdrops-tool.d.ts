import { z } from 'zod';
import { BaseHederaQueryTool, BaseHederaQueryToolParams } from '../common/base-hedera-query-tool';
declare const GetPendingAirdropsZodSchema: z.ZodObject<{
    accountId: z.ZodString;
    limit: z.ZodOptional<z.ZodNumber>;
    order: z.ZodOptional<z.ZodEnum<["asc", "desc"]>>;
    senderId: z.ZodOptional<z.ZodString>;
    serialNumber: z.ZodOptional<z.ZodString>;
    tokenId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    accountId: string;
    limit?: number | undefined;
    order?: "asc" | "desc" | undefined;
    serialNumber?: string | undefined;
    tokenId?: string | undefined;
    senderId?: string | undefined;
}, {
    accountId: string;
    limit?: number | undefined;
    order?: "asc" | "desc" | undefined;
    serialNumber?: string | undefined;
    tokenId?: string | undefined;
    senderId?: string | undefined;
}>;
/**
 * Tool for retrieving pending token airdrops received by an account.
 */
export declare class HederaGetPendingAirdropsTool extends BaseHederaQueryTool<typeof GetPendingAirdropsZodSchema> {
    name: string;
    description: string;
    specificInputSchema: z.ZodObject<{
        accountId: z.ZodString;
        limit: z.ZodOptional<z.ZodNumber>;
        order: z.ZodOptional<z.ZodEnum<["asc", "desc"]>>;
        senderId: z.ZodOptional<z.ZodString>;
        serialNumber: z.ZodOptional<z.ZodString>;
        tokenId: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        accountId: string;
        limit?: number | undefined;
        order?: "asc" | "desc" | undefined;
        serialNumber?: string | undefined;
        tokenId?: string | undefined;
        senderId?: string | undefined;
    }, {
        accountId: string;
        limit?: number | undefined;
        order?: "asc" | "desc" | undefined;
        serialNumber?: string | undefined;
        tokenId?: string | undefined;
        senderId?: string | undefined;
    }>;
    namespace: string;
    constructor(params: BaseHederaQueryToolParams);
    protected executeQuery(args: z.infer<typeof GetPendingAirdropsZodSchema>): Promise<unknown>;
}
export {};
