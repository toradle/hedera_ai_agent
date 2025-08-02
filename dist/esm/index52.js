import { z } from "zod";
import { BaseHederaTransactionTool } from "./index26.js";
const FEE_COLLECTOR_DESCRIPTION = "Fee collector's account ID.";
const FixedFeeInputSchema = z.object({
  type: z.literal("FIXED"),
  feeCollectorAccountId: z.string().describe(FEE_COLLECTOR_DESCRIPTION),
  denominatingTokenId: z.string().optional().describe("Denominating token ID for the fee (if not HBAR)."),
  amount: z.union([z.number(), z.string()]).describe("Fee amount (smallest unit for tokens, or tinybars for HBAR).")
});
const FractionalFeeInputSchema = z.object({
  type: z.literal("FRACTIONAL"),
  feeCollectorAccountId: z.string().describe(FEE_COLLECTOR_DESCRIPTION),
  numerator: z.number().int().describe("Numerator of the fractional fee."),
  denominator: z.number().int().positive().describe("Denominator of the fractional fee."),
  assessmentMethodInclusive: z.boolean().optional().describe("Fee is assessed on net amount (false) or gross (true).")
});
const RoyaltyFeeInputSchema = z.object({
  type: z.literal("ROYALTY"),
  feeCollectorAccountId: z.string().describe(FEE_COLLECTOR_DESCRIPTION),
  numerator: z.number().int().describe("Numerator of the royalty fee."),
  denominator: z.number().int().positive().describe("Denominator of the royalty fee."),
  fallbackFee: FixedFeeInputSchema.omit({ type: true }).optional().describe("Fallback fixed fee if royalty is not applicable.")
});
const CustomFeeInputUnionSchema = z.discriminatedUnion("type", [
  FixedFeeInputSchema,
  FractionalFeeInputSchema,
  RoyaltyFeeInputSchema
]);
const TokenFeeScheduleUpdateZodSchemaCore = z.object({
  tokenId: z.string().describe(
    'The ID of the token whose fee schedule is to be updated (e.g., "0.0.xxxx").'
  ),
  customFees: z.array(CustomFeeInputUnionSchema).min(1).describe(
    "An array of new custom fee objects. This will replace the existing fee schedule."
  )
});
class HederaTokenFeeScheduleUpdateTool extends BaseHederaTransactionTool {
  constructor(params) {
    super(params);
    this.name = "hedera-hts-token-fee-schedule-update";
    this.description = "Updates the fee schedule of a token. Requires tokenId and an array of custom fee objects.";
    this.specificInputSchema = TokenFeeScheduleUpdateZodSchemaCore;
    this.namespace = "hts";
  }
  getServiceBuilder() {
    return this.hederaKit.hts();
  }
  async callBuilderMethod(builder, specificArgs) {
    await builder.feeScheduleUpdate(
      specificArgs
    );
  }
}
export {
  HederaTokenFeeScheduleUpdateTool
};
//# sourceMappingURL=index52.js.map
