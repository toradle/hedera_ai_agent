import { z } from "zod";
import { BaseHederaTransactionTool } from "./index26.js";
const DeleteContractZodSchemaCore = z.object({
  contractId: z.string().describe('The ID of the contract to delete (e.g., "0.0.xxxx").'),
  transferAccountId: z.string().optional().describe(
    "Optional. Account ID to transfer balance to. Builder validates if needed."
  ),
  transferContractId: z.string().optional().describe(
    "Optional. Contract ID to transfer balance to. Builder validates if needed."
  )
});
class HederaDeleteContractTool extends BaseHederaTransactionTool {
  constructor(params) {
    super(params);
    this.name = "hedera-scs-delete-contract";
    this.description = "Deletes a smart contract. Optionally specify a transfer target for any remaining balance.";
    this.specificInputSchema = DeleteContractZodSchemaCore;
    this.namespace = "scs";
  }
  getServiceBuilder() {
    return this.hederaKit.scs();
  }
  async callBuilderMethod(builder, specificArgs) {
    await builder.deleteContract(
      specificArgs
    );
  }
}
export {
  HederaDeleteContractTool
};
//# sourceMappingURL=index61.js.map
