import { z } from "zod";
import { BaseHederaTransactionTool } from "./index26.js";
const RevokeHbarAllowanceZodSchemaCore = z.object({
  ownerAccountId: z.string().optional().describe(
    'Optional. The HBAR owner account ID (e.g., "0.0.xxxx"). Defaults to operator.'
  ),
  spenderAccountId: z.string().describe(
    'The spender account ID whose HBAR allowance is to be revoked (e.g., "0.0.yyyy").'
  ),
  memo: z.string().optional().describe("Optional. Memo for the transaction.")
});
class HederaRevokeHbarAllowanceTool extends BaseHederaTransactionTool {
  constructor(params) {
    super(params);
    this.name = "hedera-account-revoke-hbar-allowance";
    this.description = "Revokes/clears an HBAR allowance for a specific spender by approving zero HBAR.";
    this.specificInputSchema = RevokeHbarAllowanceZodSchemaCore;
    this.namespace = "account";
  }
  getServiceBuilder() {
    return this.hederaKit.accounts();
  }
  async callBuilderMethod(builder, specificArgs) {
    await builder.revokeHbarAllowance(
      specificArgs
    );
  }
}
export {
  HederaRevokeHbarAllowanceTool
};
//# sourceMappingURL=index14.js.map
