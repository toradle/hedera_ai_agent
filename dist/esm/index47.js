import { z } from "zod";
import { BaseHederaTransactionTool } from "./index26.js";
const MintFTZodSchemaCore = z.object({
  tokenId: z.string().describe('The ID of the fungible token (e.g., "0.0.xxxx").'),
  amount: z.union([z.number(), z.string()]).describe(
    "Amount to mint (smallest unit). Number or string for large values. Builder handles conversion."
  )
});
class HederaMintFungibleTokenTool extends BaseHederaTransactionTool {
  constructor(params) {
    super(params);
    this.name = "hedera-hts-mint-fungible-token";
    this.description = "Mints more fungible tokens. Requires tokenId and amount.";
    this.specificInputSchema = MintFTZodSchemaCore;
    this.namespace = "hts";
  }
  getServiceBuilder() {
    return this.hederaKit.hts();
  }
  async callBuilderMethod(builder, specificArgs) {
    await builder.mintFungibleToken(
      specificArgs
    );
  }
}
export {
  HederaMintFungibleTokenTool
};
//# sourceMappingURL=index47.js.map
