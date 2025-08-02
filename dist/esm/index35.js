import { z } from "zod";
import { BaseHederaTransactionTool } from "./index26.js";
const AirdropRecipientSchema = z.object({
  accountId: z.string().describe('Recipient account ID (e.g., "0.0.xxxx").'),
  amount: z.union([z.number(), z.string()]).describe("Amount in smallest unit. Builder handles Long conversion.")
});
const AirdropTokenZodSchemaCore = z.object({
  tokenId: z.string().describe('The ID of the fungible token to airdrop (e.g., "0.0.yyyy").'),
  recipients: z.array(AirdropRecipientSchema).min(1).describe("Array of recipient objects, each with accountId and amount."),
  memo: z.string().optional().describe("Optional. Memo for the transaction.")
});
class HederaAirdropTokenTool extends BaseHederaTransactionTool {
  constructor(params) {
    super(params);
    this.name = "hedera-hts-airdrop-token";
    this.description = "Airdrops fungible tokens to multiple recipients. Builder handles parsing and validation.";
    this.specificInputSchema = AirdropTokenZodSchemaCore;
    this.namespace = "hts";
  }
  getServiceBuilder() {
    return this.hederaKit.hts();
  }
  async callBuilderMethod(builder, specificArgs) {
    await builder.airdropToken(
      specificArgs
    );
  }
}
export {
  HederaAirdropTokenTool
};
//# sourceMappingURL=index35.js.map
