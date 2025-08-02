import { z } from "zod";
import { BaseHederaQueryTool } from "./index27.js";
const GetAccountInfoZodSchema = z.object({
  accountId: z.string().describe('The account ID to get information for (e.g., "0.0.12345")')
});
class HederaGetAccountInfoTool extends BaseHederaQueryTool {
  constructor(params) {
    super(params);
    this.name = "hedera-get-account-info";
    this.description = "Retrieves comprehensive information about a Hedera account including balance, key, memo, and other metadata.";
    this.specificInputSchema = GetAccountInfoZodSchema;
    this.namespace = "account";
  }
  async executeQuery(args) {
    this.logger.info(`Getting account info for account ID: ${args.accountId}`);
    const accountInfo = await this.hederaKit.query().getAccountInfo(args.accountId);
    if (!accountInfo) {
      return {
        success: false,
        error: `Account ${args.accountId} not found`
      };
    }
    return {
      success: true,
      accountInfo
    };
  }
}
export {
  HederaGetAccountInfoTool
};
//# sourceMappingURL=index21.js.map
