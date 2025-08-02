import { z } from "zod";
import { BaseHederaTransactionTool } from "./index26.js";
const HbarTransferInputSchema = z.object({
  accountId: z.string().describe('Account ID for the transfer (e.g., "0.0.xxxx").'),
  amount: z.union([z.number(), z.string()]).describe(
    "HBAR amount. Positive for credit, negative for debit. Builder handles Hbar unit & sum validation."
  )
});
const TransferHbarZodSchemaCore = z.object({
  transfers: z.array(HbarTransferInputSchema).min(1).describe(
    "Array of HBAR transfers, each with accountId and amount in HBARs."
  ),
  memo: z.string().optional().describe("Optional. Memo for the transaction.")
});
class HederaTransferHbarTool extends BaseHederaTransactionTool {
  constructor(params) {
    super(params);
    this.name = "hedera-account-transfer-hbar";
    this.description = "Transfers HBAR between accounts. Builder validates amounts and sum.";
    this.specificInputSchema = TransferHbarZodSchemaCore;
    this.namespace = "account";
  }
  getServiceBuilder() {
    return this.hederaKit.accounts();
  }
  async callBuilderMethod(builder, specificArgs) {
    await builder.transferHbar(
      specificArgs
    );
  }
}
export {
  HederaTransferHbarTool
};
//# sourceMappingURL=index8.js.map
