import { z } from 'zod';
import { BaseHederaQueryTool, BaseHederaQueryToolParams } from '../common/base-hedera-query-tool';
declare const GetAccountPublicKeyZodSchema: z.ZodObject<{
    accountId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    accountId: string;
}, {
    accountId: string;
}>;
/**
 * Tool for retrieving a Hedera account's public key.
 * This is a read-only operation that queries the mirror node.
 */
export declare class HederaGetAccountPublicKeyTool extends BaseHederaQueryTool<typeof GetAccountPublicKeyZodSchema> {
    name: string;
    description: string;
    specificInputSchema: z.ZodObject<{
        accountId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        accountId: string;
    }, {
        accountId: string;
    }>;
    namespace: string;
    constructor(params: BaseHederaQueryToolParams);
    protected executeQuery(args: z.infer<typeof GetAccountPublicKeyZodSchema>): Promise<unknown>;
}
export {};
