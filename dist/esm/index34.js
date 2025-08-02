import { z } from "zod";
import { BaseHederaQueryTool } from "./index27.js";
const GetTopicFeesZodSchema = z.object({
  topicId: z.string().describe('The topic ID to get custom fees for (e.g., "0.0.12345")')
});
class HederaGetTopicFeesTool extends BaseHederaQueryTool {
  constructor(params) {
    super(params);
    this.name = "hedera-get-topic-fees";
    this.description = "Retrieves custom fees associated with a Hedera Consensus Service topic.";
    this.specificInputSchema = GetTopicFeesZodSchema;
    this.namespace = "hcs";
  }
  async executeQuery(args) {
    this.logger.info(`Getting custom fees for topic ID: ${args.topicId}`);
    const fees = await this.hederaKit.query().getTopicFees(args.topicId);
    if (!fees) {
      return {
        success: true,
        topicId: args.topicId,
        customFees: null,
        message: "No custom fees found for this topic"
      };
    }
    return {
      success: true,
      topicId: args.topicId,
      customFees: fees
    };
  }
}
export {
  HederaGetTopicFeesTool
};
//# sourceMappingURL=index34.js.map
