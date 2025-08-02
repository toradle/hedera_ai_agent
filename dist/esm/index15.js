import { z } from "zod";
import { BaseHederaTransactionTool } from "./index26.js";
const RevokeFungibleTokenAllowanceZodSchemaCore = z.object({
  ownerAccountId: z.string().optional().describe(
    'Optional. The token owner account ID (e.g., "0.0.xxxx"). Defaults to operator.'
  ),
  spenderAccountId: z.string().describe(
    'The spender account ID whose token allowance is to be revoked (e.g., "0.0.yyyy").'
  ),
  tokenId: z.string().describe('The ID of the fungible token (e.g., "0.0.zzzz").'),
  memo: z.string().optional().describe("Optional. Memo for the transaction.")
});
class HederaRevokeFungibleTokenAllowanceTool extends BaseHederaTransactionTool {
  constructor(params) {
    super(params);
    this.name = "hedera-account-revoke-fungible-token-allowance";
    this.description = "Revokes/clears a fungible token allowance for a specific spender by approving zero amount.";
    this.specificInputSchema = RevokeFungibleTokenAllowanceZodSchemaCore;
    this.namespace = "account";
  }
  getServiceBuilder() {
    return this.hederaKit.accounts();
  }
  async callBuilderMethod(builder, specificArgs) {
    await builder.revokeFungibleTokenAllowance(
      specificArgs
    );
  }
}
export {
  HederaRevokeFungibleTokenAllowanceTool
};
//# sourceMappingURL=index15.js.map
