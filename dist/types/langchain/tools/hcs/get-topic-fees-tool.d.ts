import { z } from 'zod';
import { BaseHederaQueryTool, BaseHederaQueryToolParams } from '../common/base-hedera-query-tool';
declare const GetTopicFeesZodSchema: z.ZodObject<{
    topicId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    topicId: string;
}, {
    topicId: string;
}>;
/**
 * Tool for retrieving custom fees for a Hedera Consensus Service topic.
 * This is a read-only operation that queries the mirror node.
 */
export declare class HederaGetTopicFeesTool extends BaseHederaQueryTool<typeof GetTopicFeesZodSchema> {
    name: string;
    description: string;
    specificInputSchema: z.ZodObject<{
        topicId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        topicId: string;
    }, {
        topicId: string;
    }>;
    namespace: string;
    constructor(params: BaseHederaQueryToolParams);
    protected executeQuery(args: z.infer<typeof GetTopicFeesZodSchema>): Promise<unknown>;
}
export {};
