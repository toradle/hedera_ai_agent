import { z } from "zod";
import { BaseHederaQueryTool } from "./index27.js";
const GetAccountNftsZodSchema = z.object({
  accountId: z.string().describe('The account ID to get NFTs for (e.g., "0.0.12345")'),
  tokenId: z.string().optional().describe('Optional token ID to filter NFTs by (e.g., "0.0.67890")'),
  limit: z.number().int().positive().optional().default(100).describe("Maximum number of NFTs to return (default: 100)")
});
class HederaGetAccountNftsTool extends BaseHederaQueryTool {
  constructor(params) {
    super(params);
    this.name = "hedera-get-account-nfts";
    this.description = "Retrieves all NFTs owned by a Hedera account. Optionally filter by token ID.";
    this.specificInputSchema = GetAccountNftsZodSchema;
    this.namespace = "account";
  }
  async executeQuery(args) {
    this.logger.info(`Getting NFTs for account ID: ${args.accountId}`);
    const nfts = await this.hederaKit.query().getAccountNfts(
      args.accountId,
      args.tokenId,
      args.limit
    );
    if (!nfts) {
      return {
        success: false,
        error: `Could not retrieve NFTs for account ${args.accountId}`
      };
    }
    return {
      success: true,
      accountId: args.accountId,
      tokenId: args.tokenId,
      nftCount: nfts.length,
      nfts
    };
  }
}
export {
  HederaGetAccountNftsTool
};
//# sourceMappingURL=index22.js.map
