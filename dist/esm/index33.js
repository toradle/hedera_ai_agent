import { z } from "zod";
import { BaseHederaQueryTool } from "./index27.js";
const GetTopicInfoZodSchema = z.object({
  topicId: z.string().describe('The topic ID to get information for (e.g., "0.0.12345")')
});
class HederaGetTopicInfoTool extends BaseHederaQueryTool {
  constructor(params) {
    super(params);
    this.name = "hedera-get-topic-info";
    this.description = "Retrieves information about a Hedera Consensus Service topic including admin key, submit key, memo, and other metadata.";
    this.specificInputSchema = GetTopicInfoZodSchema;
    this.namespace = "hcs";
  }
  async executeQuery(args) {
    this.logger.info(`Getting topic info for topic ID: ${args.topicId}`);
    const topicInfo = await this.hederaKit.query().getTopicInfo(args.topicId);
    if (!topicInfo) {
      return {
        success: false,
        error: `Topic ${args.topicId} not found`
      };
    }
    return {
      success: true,
      topicInfo
    };
  }
}
export {
  HederaGetTopicInfoTool
};
//# sourceMappingURL=index33.js.map
