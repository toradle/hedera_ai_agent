import { z } from 'zod';
import { BaseHederaQueryTool, BaseHederaQueryToolParams } from '../common/base-hedera-query-tool';
declare const GetOutstandingAirdropsZodSchema: z.ZodObject<{
    accountId: z.ZodString;
    limit: z.ZodOptional<z.ZodNumber>;
    order: z.ZodOptional<z.ZodEnum<["asc", "desc"]>>;
    receiverId: z.ZodOptional<z.ZodString>;
    serialNumber: z.ZodOptional<z.ZodString>;
    tokenId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    accountId: string;
    limit?: number | undefined;
    order?: "asc" | "desc" | undefined;
    receiverId?: string | undefined;
    serialNumber?: string | undefined;
    tokenId?: string | undefined;
}, {
    accountId: string;
    limit?: number | undefined;
    order?: "asc" | "desc" | undefined;
    receiverId?: string | undefined;
    serialNumber?: string | undefined;
    tokenId?: string | undefined;
}>;
/**
 * Tool for retrieving outstanding token airdrops sent by an account.
 */
export declare class HederaGetOutstandingAirdropsTool extends BaseHederaQueryTool<typeof GetOutstandingAirdropsZodSchema> {
    name: string;
    description: string;
    specificInputSchema: z.ZodObject<{
        accountId: z.ZodString;
        limit: z.ZodOptional<z.ZodNumber>;
        order: z.ZodOptional<z.ZodEnum<["asc", "desc"]>>;
        receiverId: z.ZodOptional<z.ZodString>;
        serialNumber: z.ZodOptional<z.ZodString>;
        tokenId: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        accountId: string;
        limit?: number | undefined;
        order?: "asc" | "desc" | undefined;
        receiverId?: string | undefined;
        serialNumber?: string | undefined;
        tokenId?: string | undefined;
    }, {
        accountId: string;
        limit?: number | undefined;
        order?: "asc" | "desc" | undefined;
        receiverId?: string | undefined;
        serialNumber?: string | undefined;
        tokenId?: string | undefined;
    }>;
    namespace: string;
    constructor(params: BaseHederaQueryToolParams);
    protected executeQuery(args: z.infer<typeof GetOutstandingAirdropsZodSchema>): Promise<unknown>;
}
export {};
