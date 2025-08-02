import { z } from "zod";
import { BaseHederaTransactionTool } from "./index26.js";
const MintNFTZodSchemaCore = z.object({
  tokenId: z.string().describe('The ID of the NFT collection (e.g., "0.0.xxxx").'),
  metadata: z.array(z.string()).describe(
    "Array of metadata for each NFT. Strings are treated as UTF-8, or base64 for binary. Builder handles decoding & validation."
  ),
  batchSize: z.number().int().positive().optional().describe(
    "Optional. Max NFTs per transaction if chunking. Builder handles default/limits."
  )
});
class HederaMintNftTool extends BaseHederaTransactionTool {
  constructor(params) {
    super(params);
    this.name = "hedera-hts-mint-nft";
    this.description = "Mints new Non-Fungible Tokens (NFTs). Builder handles metadata decoding and batching.";
    this.specificInputSchema = MintNFTZodSchemaCore;
    this.namespace = "hts";
  }
  getServiceBuilder() {
    return this.hederaKit.hts();
  }
  async callBuilderMethod(builder, specificArgs) {
    await builder.mintNonFungibleToken(
      specificArgs
    );
  }
}
export {
  HederaMintNftTool
};
//# sourceMappingURL=index48.js.map
