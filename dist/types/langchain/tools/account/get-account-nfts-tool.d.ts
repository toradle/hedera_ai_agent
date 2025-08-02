import { z } from 'zod';
import { BaseHederaQueryTool, BaseHederaQueryToolParams } from '../common/base-hedera-query-tool';
declare const GetAccountNftsZodSchema: z.ZodObject<{
    accountId: z.ZodString;
    tokenId: z.ZodOptional<z.ZodString>;
    limit: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
}, "strip", z.ZodTypeAny, {
    limit: number;
    accountId: string;
    tokenId?: string | undefined;
}, {
    accountId: string;
    limit?: number | undefined;
    tokenId?: string | undefined;
}>;
/**
 * Tool for retrieving NFTs owned by a Hedera account.
 * This is a read-only operation that queries the mirror node.
 */
export declare class HederaGetAccountNftsTool extends BaseHederaQueryTool<typeof GetAccountNftsZodSchema> {
    name: string;
    description: string;
    specificInputSchema: z.ZodObject<{
        accountId: z.ZodString;
        tokenId: z.ZodOptional<z.ZodString>;
        limit: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    }, "strip", z.ZodTypeAny, {
        limit: number;
        accountId: string;
        tokenId?: string | undefined;
    }, {
        accountId: string;
        limit?: number | undefined;
        tokenId?: string | undefined;
    }>;
    namespace: string;
    constructor(params: BaseHederaQueryToolParams);
    protected executeQuery(args: z.infer<typeof GetAccountNftsZodSchema>): Promise<unknown>;
}
export {};
