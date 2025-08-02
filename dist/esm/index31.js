import { z } from "zod";
import { BaseHederaTransactionTool } from "./index26.js";
const UpdateTopicZodSchemaCore = z.object({
  topicId: z.string().describe('The ID of the topic to update (e.g., "0.0.xxxx").'),
  memo: z.string().nullable().optional().describe("Optional. New memo for the topic. Pass null to clear."),
  adminKey: z.string().nullable().optional().describe(
    "Optional. New admin key (serialized string). Pass null to clear."
  ),
  submitKey: z.string().nullable().optional().describe(
    "Optional. New submit key (serialized string). Pass null to clear."
  ),
  autoRenewPeriod: z.number().int().positive().optional().describe("Optional. New auto-renewal period in seconds."),
  autoRenewAccountId: z.string().nullable().optional().describe("Optional. New auto-renew account ID. Pass null to clear."),
  feeScheduleKey: z.string().nullable().optional().describe(
    "Optional. New fee schedule key (serialized string). Pass null to clear."
  ),
  exemptAccountIds: z.array(z.string()).optional().describe(
    "Optional. New list of exempt account IDs. An empty array clears all exemptions."
  )
});
class HederaUpdateTopicTool extends BaseHederaTransactionTool {
  constructor(params) {
    super(params);
    this.name = "hedera-hcs-update-topic";
    this.description = "Updates an HCS topic. Requires topicId. Other fields are optional. Null can be used to clear certain fields.";
    this.specificInputSchema = UpdateTopicZodSchemaCore;
    this.namespace = "hcs";
  }
  getServiceBuilder() {
    return this.hederaKit.hcs();
  }
  async callBuilderMethod(builder, specificArgs) {
    await builder.updateTopic(
      specificArgs
    );
  }
}
export {
  HederaUpdateTopicTool
};
//# sourceMappingURL=index31.js.map
