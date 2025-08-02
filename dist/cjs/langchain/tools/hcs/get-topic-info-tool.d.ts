import { z } from 'zod';
import { BaseHederaQueryTool, BaseHederaQueryToolParams } from '../common/base-hedera-query-tool';
declare const GetTopicInfoZodSchema: z.ZodObject<{
    topicId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    topicId: string;
}, {
    topicId: string;
}>;
/**
 * Tool for retrieving Hedera Consensus Service topic information.
 * This is a read-only operation that queries the mirror node.
 */
export declare class HederaGetTopicInfoTool extends BaseHederaQueryTool<typeof GetTopicInfoZodSchema> {
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
    protected executeQuery(args: z.infer<typeof GetTopicInfoZodSchema>): Promise<unknown>;
}
export {};
