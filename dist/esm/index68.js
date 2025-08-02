import { z } from "zod";
import { BaseHederaQueryTool } from "./index27.js";
const GetBlocksZodSchema = z.object({
  blockNumber: z.string().optional().describe("Filter by block number"),
  timestamp: z.string().optional().describe("Filter by timestamp"),
  limit: z.number().optional().describe("Maximum number of blocks to return"),
  order: z.enum(["asc", "desc"]).optional().describe("Order of results")
});
class HederaGetBlocksTool extends BaseHederaQueryTool {
  constructor(params) {
    super(params);
    this.name = "hedera-get-blocks";
    this.description = "Retrieves blocks from the Hedera network with optional filtering.";
    this.specificInputSchema = GetBlocksZodSchema;
    this.namespace = "network";
  }
  async executeQuery(args) {
    this.logger.info("Getting blocks from the network");
    const blocks = await this.hederaKit.query().getBlocks(args);
    if (blocks === null) {
      return {
        success: false,
        error: "Could not retrieve blocks from the network"
      };
    }
    return {
      success: true,
      blocks,
      count: blocks.length
    };
  }
}
export {
  HederaGetBlocksTool
};
//# sourceMappingURL=index68.js.map
