import { z } from "zod";
import { BaseHederaTransactionTool } from "./index26.js";
const ApproveHbarAllowanceZodSchemaCore = z.object({
  ownerAccountId: z.string().optional().describe(
    'Optional. The HBAR owner account ID (e.g., "0.0.xxxx"). Defaults to operator if not provided.'
  ),
  spenderAccountId: z.string().describe(
    'The spender account ID being granted the allowance (e.g., "0.0.yyyy").'
  ),
  amount: z.union([z.number(), z.string()]).describe(
    "Max HBAR amount spender can use (in HBARs). Builder handles Hbar object creation."
  ),
  memo: z.string().optional().describe("Optional. Memo for the transaction.")
});
class HederaApproveHbarAllowanceTool extends BaseHederaTransactionTool {
  constructor(params) {
    super(params);
    this.name = "hedera-account-approve-hbar-allowance";
    this.description = "Approves an HBAR allowance for a spender. Builder handles Hbar unit conversion.";
    this.specificInputSchema = ApproveHbarAllowanceZodSchemaCore;
    this.namespace = "account";
  }
  getServiceBuilder() {
    return this.hederaKit.accounts();
  }
  async callBuilderMethod(builder, specificArgs) {
    await builder.approveHbarAllowance(
      specificArgs
    );
  }
}
export {
  HederaApproveHbarAllowanceTool
};
//# sourceMappingURL=index11.js.map
