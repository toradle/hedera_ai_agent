import { z } from "zod";
import { BaseHederaTransactionTool } from "./index26.js";
const ApproveFungibleTokenAllowanceZodSchemaCore = z.object({
  ownerAccountId: z.string().optional().describe(
    'Optional. The token owner account ID (e.g., "0.0.xxxx"). Defaults to operator.'
  ),
  spenderAccountId: z.string().describe('The spender account ID (e.g., "0.0.yyyy").'),
  tokenId: z.string().describe('The fungible token ID (e.g., "0.0.zzzz").'),
  amount: z.union([z.number(), z.string()]).describe(
    "Max token amount (smallest unit) spender can use. Builder handles conversion."
  ),
  memo: z.string().optional().describe("Optional. Memo for the transaction.")
});
class HederaApproveFungibleTokenAllowanceTool extends BaseHederaTransactionTool {
  constructor(params) {
    super(params);
    this.name = "hedera-account-approve-fungible-token-allowance";
    this.description = "Approves a fungible token allowance for a spender. Builder handles amount conversion.";
    this.specificInputSchema = ApproveFungibleTokenAllowanceZodSchemaCore;
    this.namespace = "account";
  }
  getServiceBuilder() {
    return this.hederaKit.accounts();
  }
  async callBuilderMethod(builder, specificArgs) {
    await builder.approveFungibleTokenAllowance(
      specificArgs
    );
  }
}
export {
  HederaApproveFungibleTokenAllowanceTool
};
//# sourceMappingURL=index12.js.map
