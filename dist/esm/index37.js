import { z } from "zod";
import { BaseHederaTransactionTool } from "./index26.js";
const BurnFTZodSchemaCore = z.object({
  tokenId: z.string().describe('The ID of the fungible token (e.g., "0.0.xxxx").'),
  amount: z.union([z.number(), z.string()]).describe(
    "Amount to burn (smallest unit). Number or string for large values. Builder handles conversion."
  )
});
class HederaBurnFungibleTokenTool extends BaseHederaTransactionTool {
  constructor(params) {
    super(params);
    this.name = "hedera-hts-burn-fungible-token";
    this.description = "Burns fungible tokens. Requires tokenId and amount.";
    this.specificInputSchema = BurnFTZodSchemaCore;
    this.namespace = "hts";
  }
  getServiceBuilder() {
    return this.hederaKit.hts();
  }
  async callBuilderMethod(builder, specificArgs) {
    await builder.burnFungibleToken(
      specificArgs
    );
  }
}
export {
  HederaBurnFungibleTokenTool
};
//# sourceMappingURL=index37.js.map
