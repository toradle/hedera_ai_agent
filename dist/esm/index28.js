import { z } from "zod";
import { BaseHederaTransactionTool } from "./index26.js";
const CustomFeeObjectSchema = z.object({
  feeCollectorAccountId: z.string().describe("The account ID to receive the custom fee."),
  denominatingTokenId: z.string().optional().describe("The token ID for fee denomination (if not HBAR)."),
  amount: z.union([z.number(), z.string()]).describe(
    "The fee amount (smallest unit for tokens, or tinybars for HBAR)."
  )
});
const CreateTopicZodSchemaCore = z.object({
  memo: z.string().optional().describe("Optional. Memo for the topic."),
  adminKey: z.string().optional().describe(
    "Optional. Admin key for the topic (e.g., serialized public key string, or private key string for derivation by builder)."
  ),
  submitKey: z.string().optional().describe(
    "Optional. Submit key for the topic (e.g., serialized public key string, or private key string for derivation by builder)."
  ),
  autoRenewPeriod: z.number().int().positive().optional().describe(
    "Optional. Auto-renewal period in seconds (e.g., 7776000 for 90 days)."
  ),
  autoRenewAccountId: z.string().optional().describe(
    'Optional. Account ID for auto-renewal payments (e.g., "0.0.xxxx").'
  ),
  feeScheduleKey: z.string().optional().describe(
    "Optional. Fee schedule key for the topic (e.g., serialized public key string, or private key string for derivation by builder)."
  ),
  customFees: z.array(CustomFeeObjectSchema).optional().describe(
    "Optional. Array of custom fee objects to be applied to the topic."
  ),
  exemptAccountIds: z.array(z.string()).optional().describe("Optional. Account IDs exempt from custom fees.")
});
class HederaCreateTopicTool extends BaseHederaTransactionTool {
  constructor(params) {
    super(params);
    this.name = "hedera-hcs-create-topic";
    this.description = "Creates a new Hedera Consensus Service (HCS) topic. Provide parameters as needed. The builder handles defaults and key parsing.";
    this.specificInputSchema = CreateTopicZodSchemaCore;
    this.namespace = "hcs";
    this.neverScheduleThisTool = true;
  }
  getServiceBuilder() {
    return this.hederaKit.hcs();
  }
  async callBuilderMethod(builder, specificArgs) {
    await builder.createTopic(
      specificArgs
    );
  }
}
export {
  HederaCreateTopicTool
};
//# sourceMappingURL=index28.js.map
