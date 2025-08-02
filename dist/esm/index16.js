import { z } from "zod";
import { BaseHederaTransactionTool } from "./index26.js";
const DeleteNftSpenderAllowanceZodSchemaCore = z.object({
  ownerAccountId: z.string().optional().describe(
    "Optional. The ID of the NFT owner. Defaults to the operator/signer if not provided."
  ),
  spenderAccountId: z.string().describe(
    "The ID of the spender whose allowance for specific NFTs will be deleted."
  ),
  nftIdString: z.string().describe(
    'The NFT ID including serial number (e.g., "0.0.token.serial") for which the allowance will be deleted.'
  ),
  tokenId: z.string().describe('The token ID of the NFT collection (e.g., "0.0.xxxx").'),
  serials: z.array(z.union([z.number().int().positive(), z.string()])).min(1).describe("An array of serial numbers of the NFT to remove allowance for.")
});
class HederaDeleteNftSpenderAllowanceTool extends BaseHederaTransactionTool {
  constructor(params) {
    super(params);
    this.name = "hedera-account-delete-nft-spender-allowance";
    this.description = "Deletes/revokes NFT allowances for specific serial numbers of a token for a specific spender. The owner of the NFTs must sign.";
    this.specificInputSchema = DeleteNftSpenderAllowanceZodSchemaCore;
    this.namespace = "account";
  }
  getServiceBuilder() {
    return this.hederaKit.accounts();
  }
  async callBuilderMethod(builder, specificArgs) {
    await builder.deleteTokenNftAllowanceForSpender(
      specificArgs
    );
  }
}
export {
  HederaDeleteNftSpenderAllowanceTool
};
//# sourceMappingURL=index16.js.map
