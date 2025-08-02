import { z } from 'zod';
import { BaseHederaQueryTool, BaseHederaQueryToolParams } from '../common/base-hedera-query-tool';
declare const GetTokenInfoZodSchema: z.ZodObject<{
    tokenId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    tokenId: string;
}, {
    tokenId: string;
}>;
/**
 * Tool for retrieving Hedera Token Service token information.
 * This is a read-only operation that queries the mirror node.
 */
export declare class HederaGetTokenInfoTool extends BaseHederaQueryTool<typeof GetTokenInfoZodSchema> {
    name: string;
    description: string;
    specificInputSchema: z.ZodObject<{
        tokenId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        tokenId: string;
    }, {
        tokenId: string;
    }>;
    namespace: string;
    constructor(params: BaseHederaQueryToolParams);
    protected executeQuery(args: z.infer<typeof GetTokenInfoZodSchema>): Promise<unknown>;
}
export {};
