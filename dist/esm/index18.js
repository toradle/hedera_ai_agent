import { z } from "zod";
import { BaseHederaQueryTool } from "./index27.js";
const GetOutstandingAirdropsZodSchema = z.object({
  accountId: z.string().describe('The account ID that sent the airdrops (e.g., "0.0.123")'),
  limit: z.number().optional().describe("Maximum number of airdrops to return"),
  order: z.enum(["asc", "desc"]).optional().describe("Order of results"),
  receiverId: z.string().optional().describe("Filter by receiver account ID"),
  serialNumber: z.string().optional().describe("Filter by NFT serial number"),
  tokenId: z.string().optional().describe("Filter by token ID")
});
class HederaGetOutstandingAirdropsTool extends BaseHederaQueryTool {
  constructor(params) {
    super(params);
    this.name = "hedera-get-outstanding-airdrops";
    this.description = "Retrieves outstanding token airdrops that have been sent by an account but not yet claimed.";
    this.specificInputSchema = GetOutstandingAirdropsZodSchema;
    this.namespace = "account";
  }
  async executeQuery(args) {
    this.logger.info(
      `Getting outstanding airdrops for account: ${args.accountId}`
    );
    const airdrops = await this.hederaKit.query().getOutstandingTokenAirdrops(args);
    if (airdrops === null) {
      return {
        success: false,
        error: `Could not retrieve outstanding airdrops for account ${args.accountId}`
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
  HederaGetOutstandingAirdropsTool
};
//# sourceMappingURL=index18.js.map
