import { z } from 'zod';
import { BaseHederaQueryTool, BaseHederaQueryToolParams } from '../common/base-hedera-query-tool';
declare const ValidateNftOwnershipZodSchema: z.ZodObject<{
    accountId: z.ZodString;
    tokenId: z.ZodString;
    serialNumber: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    serialNumber: number;
    tokenId: string;
    accountId: string;
}, {
    serialNumber: number;
    tokenId: string;
    accountId: string;
}>;
/**
 * Tool for validating NFT ownership on Hedera.
 * This is a read-only operation that queries the mirror node.
 */
export declare class HederaValidateNftOwnershipTool extends BaseHederaQueryTool<typeof ValidateNftOwnershipZodSchema> {
    name: string;
    description: string;
    specificInputSchema: z.ZodObject<{
        accountId: z.ZodString;
        tokenId: z.ZodString;
        serialNumber: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        serialNumber: number;
        tokenId: string;
        accountId: string;
    }, {
        serialNumber: number;
        tokenId: string;
        accountId: string;
    }>;
    namespace: string;
    constructor(params: BaseHederaQueryToolParams);
    protected executeQuery(args: z.infer<typeof ValidateNftOwnershipZodSchema>): Promise<unknown>;
}
export {};
