import { z } from "zod";
import { BaseHederaQueryTool } from "./index27.js";
const GetTokenInfoZodSchema = z.object({
  tokenId: z.string().describe('The token ID to get information for (e.g., "0.0.12345")')
});
class HederaGetTokenInfoTool extends BaseHederaQueryTool {
  constructor(params) {
    super(params);
    this.name = "hedera-get-token-info";
    this.description = "Retrieves comprehensive information about a Hedera token including name, symbol, supply, keys, and other metadata.";
    this.specificInputSchema = GetTokenInfoZodSchema;
    this.namespace = "hts";
  }
  async executeQuery(args) {
    this.logger.info(`Getting token info for token ID: ${args.tokenId}`);
    const tokenInfo = await this.hederaKit.query().getTokenInfo(args.tokenId);
    if (!tokenInfo) {
      return {
        success: false,
        error: `Token ${args.tokenId} not found`
      };
    }
    return {
      success: true,
      tokenInfo
    };
  }
}
export {
  HederaGetTokenInfoTool
};
//# sourceMappingURL=index45.js.map
