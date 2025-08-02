import { z } from "zod";
import { BaseHederaTransactionTool } from "./index26.js";
const UpdateContractZodSchemaCore = z.object({
  contractId: z.string().describe('The ID of the contract to update (e.g., "0.0.xxxx").'),
  adminKey: z.string().nullable().optional().describe(
    "Optional. New admin key (serialized string). Pass null to clear."
  ),
  autoRenewPeriod: z.number().int().positive().optional().describe("Optional. New auto-renewal period in seconds."),
  memo: z.string().nullable().optional().describe(
    "Optional. New contract memo. Pass null or empty string to clear."
  ),
  stakedAccountId: z.string().nullable().optional().describe(
    'Optional. New account ID to stake to. Pass "0.0.0" or null to clear.'
  ),
  stakedNodeId: z.number().int().nullable().optional().describe(
    "Optional. New node ID to stake to. Pass -1 or null to clear. Builder handles Long conversion."
  ),
  declineStakingReward: z.boolean().optional().describe("Optional. If true, contract declines staking rewards."),
  maxAutomaticTokenAssociations: z.number().int().optional().describe("Optional. New max automatic token associations."),
  proxyAccountId: z.string().nullable().optional().describe('Optional. New proxy account ID. Pass "0.0.0" or null to clear.')
});
class HederaUpdateContractTool extends BaseHederaTransactionTool {
  constructor(params) {
    super(params);
    this.name = "hedera-scs-update-contract";
    this.description = "Updates an existing Hedera smart contract. Builder handles parsing and clearing logic.";
    this.specificInputSchema = UpdateContractZodSchemaCore;
    this.namespace = "scs";
  }
  getServiceBuilder() {
    return this.hederaKit.scs();
  }
  async callBuilderMethod(builder, specificArgs) {
    await builder.updateContract(
      specificArgs
    );
  }
}
export {
  HederaUpdateContractTool
};
//# sourceMappingURL=index64.js.map
