import { z } from "zod";
import { BaseHederaQueryTool } from "./index27.js";
const GetAccountBalanceZodSchema = z.object({
  accountId: z.string().describe('The account ID to get balance for (e.g., "0.0.12345")')
});
class HederaGetAccountBalanceTool extends BaseHederaQueryTool {
  constructor(params) {
    super(params);
    this.name = "hedera-get-account-balance";
    this.description = "Retrieves the HBAR balance for a Hedera account. Returns the balance in HBAR (not tinybars).";
    this.specificInputSchema = GetAccountBalanceZodSchema;
    this.namespace = "account";
  }
  async executeQuery(args) {
    this.logger.info(`Getting balance for account ID: ${args.accountId}`);
    const balance = await this.hederaKit.query().getAccountBalance(args.accountId);
    if (balance === null) {
      return {
        success: false,
        error: `Could not retrieve balance for account ${args.accountId}`
      };
    }
    return {
      success: true,
      accountId: args.accountId,
      balance,
      unit: "HBAR"
    };
  }
}
export {
  HederaGetAccountBalanceTool
};
//# sourceMappingURL=index20.js.map
