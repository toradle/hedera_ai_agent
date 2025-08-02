import { z } from "zod";
import { BaseHederaQueryTool } from "./index27.js";
const GetAccountTokensZodSchema = z.object({
  accountId: z.string().describe('The account ID to get token balances for (e.g., "0.0.12345")'),
  limit: z.number().int().positive().optional().default(100).describe("Maximum number of tokens to return (default: 100)")
});
class HederaGetAccountTokensTool extends BaseHederaQueryTool {
  constructor(params) {
    super(params);
    this.name = "hedera-get-account-tokens";
    this.description = "Retrieves all token balances for a Hedera account. Returns fungible and non-fungible token associations.";
    this.specificInputSchema = GetAccountTokensZodSchema;
    this.namespace = "account";
  }
  async executeQuery(args) {
    this.logger.info(`Getting tokens for account ID: ${args.accountId}`);
    const tokens = await this.hederaKit.query().getAccountTokens(args.accountId, args.limit);
    if (!tokens) {
      return {
        success: false,
        error: `Could not retrieve tokens for account ${args.accountId}`
      };
    }
    return {
      success: true,
      accountId: args.accountId,
      tokenCount: tokens.length,
      tokens
    };
  }
}
export {
  HederaGetAccountTokensTool
};
//# sourceMappingURL=index24.js.map
