import { z } from "zod";
import { BaseHederaTransactionTool } from "./index26.js";
const signAndExecuteScheduledTransactionSchema = z.object({
  scheduleId: z.string().describe('The ID of the scheduled transaction (e.g., "0.0.SCHEDID").'),
  memo: z.string().optional().describe("Optional memo for the ScheduleSign transaction itself.")
});
class SignAndExecuteScheduledTransactionTool extends BaseHederaTransactionTool {
  constructor(params) {
    super(params);
    this.name = "hedera-sign-and-execute-scheduled-transaction";
    this.description = "Prepares a ScheduleSignTransaction to add a signature to an existing scheduled transaction. Depending on agent configuration, this will either return transaction bytes (for the user to sign and pay) or be executed directly by the agent (agent signs and pays).";
    this.specificInputSchema = signAndExecuteScheduledTransactionSchema;
    this.namespace = "account";
    this.neverScheduleThisTool = true;
  }
  getServiceBuilder() {
    return this.hederaKit.accounts();
  }
  async callBuilderMethod(builder, specificArgs) {
    const accountBuilder = builder;
    const params = {
      scheduleId: specificArgs.scheduleId
    };
    if (specificArgs.memo && specificArgs.memo.trim() !== "") {
      params.memo = specificArgs.memo;
    }
    await accountBuilder.prepareSignScheduledTransaction(params);
  }
}
export {
  SignAndExecuteScheduledTransactionTool
};
//# sourceMappingURL=index25.js.map
