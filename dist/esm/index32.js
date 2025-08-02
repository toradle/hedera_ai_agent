import { z } from "zod";
import { BaseHederaQueryTool } from "./index27.js";
const GetTopicMessagesByFilterZodSchema = z.object({
  topicId: z.string().describe('The topic ID to get messages for (e.g., "0.0.12345")'),
  sequenceNumber: z.string().optional().describe('Filter by sequence number (e.g., "gt:10", "lte:20")'),
  startTime: z.string().optional().describe('Filter by start consensus timestamp (e.g., "1629400000.000000000")'),
  endTime: z.string().optional().describe('Filter by end consensus timestamp (e.g., "1629500000.000000000")'),
  limit: z.number().int().positive().optional().describe("Maximum number of messages to return"),
  order: z.enum(["asc", "desc"]).optional().describe("Order of messages (ascending or descending)")
});
class HederaGetTopicMessages extends BaseHederaQueryTool {
  constructor(params) {
    super(params);
    this.name = "hedera-get-topic-messages-by-filter";
    this.description = "Retrieves filtered messages from a Hedera Consensus Service topic with optional filters for sequence number, time range, limit, and order.";
    this.specificInputSchema = GetTopicMessagesByFilterZodSchema;
    this.namespace = "hcs";
  }
  async executeQuery(args) {
    this.logger.info(`Getting filtered messages for topic ID: ${args.topicId}`);
    const options = {};
    if (args.sequenceNumber) options.sequenceNumber = args.sequenceNumber;
    if (args.startTime) options.startTime = args.startTime;
    if (args.endTime) options.endTime = args.endTime;
    if (args.limit) options.limit = args.limit;
    if (args.order) options.order = args.order;
    const messages = await this.hederaKit.query().getTopicMessagesByFilter(
      args.topicId,
      options
    );
    if (!messages) {
      return {
        success: false,
        error: `Could not retrieve messages for topic ${args.topicId}`
      };
    }
    return {
      success: true,
      topicId: args.topicId,
      messageCount: messages.length,
      filters: options,
      messages
    };
  }
}
export {
  HederaGetTopicMessages
};
//# sourceMappingURL=index32.js.map
