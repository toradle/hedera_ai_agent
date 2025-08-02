import { z } from "zod";
import { BaseHederaTransactionTool } from "./index26.js";
const UpdateTokenZodSchemaCore = z.object({
  tokenId: z.string().describe('The ID of the token to update (e.g., "0.0.xxxx").'),
  tokenName: z.string().nullable().optional().describe("Optional. New token name. Pass null to clear."),
  tokenSymbol: z.string().nullable().optional().describe("Optional. New token symbol. Pass null to clear."),
  treasuryAccountId: z.string().optional().describe('Optional. New treasury account ID (e.g., "0.0.yyyy").'),
  adminKey: z.string().nullable().optional().describe(
    "Optional. New admin key (serialized string). Pass null to clear."
  ),
  kycKey: z.string().nullable().optional().describe("Optional. New KYC key (serialized string). Pass null to clear."),
  freezeKey: z.string().nullable().optional().describe(
    "Optional. New freeze key (serialized string). Pass null to clear."
  ),
  wipeKey: z.string().nullable().optional().describe(
    "Optional. New wipe key (serialized string). Pass null to clear."
  ),
  supplyKey: z.string().nullable().optional().describe(
    "Optional. New supply key (serialized string). Pass null to clear."
  ),
  feeScheduleKey: z.string().nullable().optional().describe(
    "Optional. New fee schedule key (serialized string). Pass null to clear."
  ),
  pauseKey: z.string().nullable().optional().describe(
    "Optional. New pause key (serialized string). Pass null to clear."
  ),
  autoRenewAccountId: z.string().nullable().optional().describe("Optional. New auto-renew account ID. Pass null to clear."),
  autoRenewPeriod: z.number().int().positive().optional().describe("Optional. New auto-renewal period in seconds."),
  memo: z.string().nullable().optional().describe("Optional. New token memo. Pass null to clear.")
});
class HederaUpdateTokenTool extends BaseHederaTransactionTool {
  constructor(params) {
    super(params);
    this.name = "hedera-hts-update-token";
    this.description = "Updates an existing Hedera token. Requires tokenId. Other fields are optional. Null can be used to clear certain fields.";
    this.specificInputSchema = UpdateTokenZodSchemaCore;
    this.namespace = "hts";
  }
  getServiceBuilder() {
    return this.hederaKit.hts();
  }
  async callBuilderMethod(builder, specificArgs) {
    await builder.updateToken(
      specificArgs
    );
  }
}
export {
  HederaUpdateTokenTool
};
//# sourceMappingURL=index57.js.map
