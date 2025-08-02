import { z } from "zod";
import { BaseHederaQueryTool } from "./index27.js";
const GetPendingAirdropsZodSchema = z.object({
  accountId: z.string().describe('The account ID that received the airdrops (e.g., "0.0.123")'),
  limit: z.number().optional().describe("Maximum number of airdrops to return"),
  order: z.enum(["asc", "desc"]).optional().describe("Order of results"),
  senderId: z.string().optional().describe("Filter by sender account ID"),
  serialNumber: z.string().optional().describe("Filter by NFT serial number"),
  tokenId: z.string().optional().describe("Filter by token ID")
});
class HederaGetPendingAirdropsTool extends BaseHederaQueryTool {
  constructor(params) {
    super(params);
    this.name = "hedera-get-pending-airdrops";
    this.description = "Retrieves pending token airdrops that have been received by an account but not yet claimed.";
    this.specificInputSchema = GetPendingAirdropsZodSchema;
    this.namespace = "account";
  }
  async executeQuery(args) {
    this.logger.info(`Getting pending airdrops for account: ${args.accountId}`);
    const airdrops = await this.hederaKit.query().getPendingTokenAirdrops(args);
    if (!airdrops) {
      return {
        success: false,
        error: `Could not retrieve pending airdrops for account ${args.accountId}`
      };
    }
    return {
      success: true,
      accountId: args.accountId,
      airdrops,
      count: airdrops.length
    };
  }
}
export {
  HederaGetPendingAirdropsTool
};
//# sourceMappingURL=index19.js.map
