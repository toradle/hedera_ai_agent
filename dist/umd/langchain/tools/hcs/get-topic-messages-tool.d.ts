import { z } from 'zod';
import { BaseHederaQueryTool, BaseHederaQueryToolParams } from '../common/base-hedera-query-tool';
declare const GetTopicMessagesByFilterZodSchema: z.ZodObject<{
    topicId: z.ZodString;
    sequenceNumber: z.ZodOptional<z.ZodString>;
    startTime: z.ZodOptional<z.ZodString>;
    endTime: z.ZodOptional<z.ZodString>;
    limit: z.ZodOptional<z.ZodNumber>;
    order: z.ZodOptional<z.ZodEnum<["asc", "desc"]>>;
}, "strip", z.ZodTypeAny, {
    topicId: string;
    sequenceNumber?: string | undefined;
    limit?: number | undefined;
    order?: "asc" | "desc" | undefined;
    startTime?: string | undefined;
    endTime?: string | undefined;
}, {
    topicId: string;
    sequenceNumber?: string | undefined;
    limit?: number | undefined;
    order?: "asc" | "desc" | undefined;
    startTime?: string | undefined;
    endTime?: string | undefined;
}>;
/**
 * Tool for retrieving filtered messages from a Hedera Consensus Service topic.
 * This is a read-only operation that queries the mirror node.
 */
export declare class HederaGetTopicMessages extends BaseHederaQueryTool<typeof GetTopicMessagesByFilterZodSchema> {
    name: string;
    description: string;
    specificInputSchema: z.ZodObject<{
        topicId: z.ZodString;
        sequenceNumber: z.ZodOptional<z.ZodString>;
        startTime: z.ZodOptional<z.ZodString>;
        endTime: z.ZodOptional<z.ZodString>;
        limit: z.ZodOptional<z.ZodNumber>;
        order: z.ZodOptional<z.ZodEnum<["asc", "desc"]>>;
    }, "strip", z.ZodTypeAny, {
        topicId: string;
        sequenceNumber?: string | undefined;
        limit?: number | undefined;
        order?: "asc" | "desc" | undefined;
        startTime?: string | undefined;
        endTime?: string | undefined;
    }, {
        topicId: string;
        sequenceNumber?: string | undefined;
        limit?: number | undefined;
        order?: "asc" | "desc" | undefined;
        startTime?: string | undefined;
        endTime?: string | undefined;
    }>;
    namespace: string;
    constructor(params: BaseHederaQueryToolParams);
    protected executeQuery(args: z.infer<typeof GetTopicMessagesByFilterZodSchema>): Promise<unknown>;
}
export {};
