import { z } from "zod";
import { BaseHederaTransactionTool } from "./index26.js";
const BurnNFTZodSchemaCore = z.object({
  tokenId: z.string().describe('The ID of the NFT collection (e.g., "0.0.xxxx").'),
  serials: z.array(z.union([z.number().int().positive(), z.string()])).min(1).describe(
    "Array of serial numbers to burn. Numbers or strings for large serials. Builder handles conversion."
  )
});
class HederaBurnNftTool extends BaseHederaTransactionTool {
  constructor(params) {
    super(params);
    this.name = "hedera-hts-burn-nft";
    this.description = "Burns Non-Fungible Tokens (NFTs). Requires token ID and an array of serial numbers.";
    this.specificInputSchema = BurnNFTZodSchemaCore;
    this.namespace = "hts";
  }
  getServiceBuilder() {
    return this.hederaKit.hts();
  }
  async callBuilderMethod(builder, specificArgs) {
    await builder.burnNonFungibleToken(
      specificArgs
    );
  }
}
export {
  HederaBurnNftTool
};
//# sourceMappingURL=index38.js.map
