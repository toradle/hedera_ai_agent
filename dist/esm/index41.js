import { z } from "zod";
import { TokenSupplyType } from "@hashgraph/sdk";
import { BaseHederaTransactionTool } from "./index26.js";
import { FEE_COLLECTOR_DESCRIPTION, SERIALIZED_KEY_DESCRIPTION } from "./index60.js";
const FixedFeeInputSchema = z.object({
  type: z.enum(["FIXED", "FIXED_FEE"]),
  feeCollectorAccountId: z.string().optional().describe(FEE_COLLECTOR_DESCRIPTION),
  denominatingTokenId: z.string().optional().describe("Denominating token ID for the fee (if not HBAR)."),
  amount: z.union([z.number(), z.string()]).describe("Fee amount (smallest unit for tokens, or tinybars for HBAR).")
});
const FractionalFeeInputSchema = z.object({
  type: z.enum(["FRACTIONAL", "FRACTIONAL_FEE"]),
  feeCollectorAccountId: z.string().optional().describe(FEE_COLLECTOR_DESCRIPTION),
  numerator: z.number().int().describe("Numerator of the fractional fee."),
  denominator: z.number().int().positive().describe("Denominator of the fractional fee."),
  minAmount: z.union([z.number(), z.string()]).optional().describe("Minimum fractional fee amount."),
  maxAmount: z.union([z.number(), z.string()]).optional().describe("Maximum fractional fee amount (0 for no max)."),
  assessmentMethodInclusive: z.boolean().optional().describe("Fee is assessed on net amount (false) or gross (true).")
});
const RoyaltyFeeInputSchema = z.object({
  type: z.enum(["ROYALTY", "ROYALTY_FEE"]),
  feeCollectorAccountId: z.string().optional().describe(FEE_COLLECTOR_DESCRIPTION),
  numerator: z.number().int().describe("Numerator of the royalty fee."),
  denominator: z.number().int().positive().describe("Denominator of the royalty fee."),
  fallbackFee: FixedFeeInputSchema.omit({ type: true }).optional().describe("Fallback fixed fee if royalty is not applicable.")
});
const CustomFeeInputUnionSchema = z.discriminatedUnion("type", [
  FixedFeeInputSchema,
  FractionalFeeInputSchema,
  RoyaltyFeeInputSchema
]);
const NFTCreateZodSchemaCore = z.object({
  tokenName: z.string().describe("The publicly visible name of the NFT collection."),
  tokenSymbol: z.string().optional().describe("The publicly visible symbol of the NFT collection."),
  treasuryAccountId: z.string().optional().describe('Treasury account ID (e.g., "0.0.xxxx").'),
  adminKey: z.string().optional().describe(
    `Optional. Admin key (${SERIALIZED_KEY_DESCRIPTION}`
  ),
  kycKey: z.string().optional().describe(
    `Optional. KYC key (${SERIALIZED_KEY_DESCRIPTION}`
  ),
  freezeKey: z.string().optional().describe(
    `Optional. Freeze key (${SERIALIZED_KEY_DESCRIPTION}`
  ),
  wipeKey: z.string().optional().describe(
    `Optional. Wipe key (${SERIALIZED_KEY_DESCRIPTION}`
  ),
  supplyKey: z.string().optional().describe(
    `Optional. Supply key (${SERIALIZED_KEY_DESCRIPTION}`
  ),
  feeScheduleKey: z.string().optional().describe(
    `Optional. Fee schedule key (${SERIALIZED_KEY_DESCRIPTION}`
  ),
  pauseKey: z.string().optional().describe(
    `Optional. Pause key (${SERIALIZED_KEY_DESCRIPTION}`
  ),
  autoRenewAccountId: z.string().optional().describe('Optional. Auto-renew account ID (e.g., "0.0.xxxx").'),
  autoRenewPeriod: z.number().int().positive().optional().describe("Optional. Auto-renewal period in seconds."),
  memo: z.string().optional().describe("Optional. Memo for the NFT collection."),
  freezeDefault: z.boolean().optional().describe("Optional. Default freeze status for accounts."),
  customFees: z.array(CustomFeeInputUnionSchema).optional().describe("Optional. Array of custom fee objects for the token."),
  supplyType: z.enum([
    TokenSupplyType.Finite.toString(),
    TokenSupplyType.Infinite.toString()
  ]).optional().default(TokenSupplyType.Finite.toString()).describe(
    "Supply type: FINITE or INFINITE. NFTs typically use FINITE. Defaults to FINITE if not specified."
  ),
  maxSupply: z.union([z.number(), z.string()]).optional().describe(
    "Max supply if supplyType is FINITE. Builder handles validation."
  )
});
class HederaCreateNftTool extends BaseHederaTransactionTool {
  constructor(params) {
    super(params);
    this.name = "hedera-hts-create-nft";
    this.description = "Creates a new Hedera Non-Fungible Token (NFT) collection. Builder handles key parsing, fee construction, and supply validation.";
    this.specificInputSchema = NFTCreateZodSchemaCore;
    this.namespace = "hts";
  }
  getServiceBuilder() {
    return this.hederaKit.hts();
  }
  async callBuilderMethod(builder, specificArgs) {
    await builder.createNonFungibleToken(
      specificArgs
    );
  }
  getNoteForKey(key, schemaDefaultValue, actualValue) {
    if (key === "supplyType") {
      return `Your NFT collection's supply type was set to '${actualValue}' by default.`;
    }
    if (key === "maxSupply" && actualValue !== void 0) {
      try {
        const num = BigInt(String(actualValue));
        return `A maximum supply of '${num.toLocaleString()}' for the NFT collection was set (tool schema default).`;
      } catch {
        return `The maximum supply for the NFT collection was set to '${actualValue}' (tool schema default).`;
      }
    }
    return void 0;
  }
}
export {
  HederaCreateNftTool
};
//# sourceMappingURL=index41.js.map
