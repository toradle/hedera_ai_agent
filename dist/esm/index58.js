import { z } from "zod";
import { BaseHederaQueryTool } from "./index27.js";
const ValidateNftOwnershipZodSchema = z.object({
  accountId: z.string().describe('The account ID to check ownership for (e.g., "0.0.12345")'),
  tokenId: z.string().describe('The NFT token ID (e.g., "0.0.67890")'),
  serialNumber: z.number().int().positive().describe("The serial number of the NFT")
});
class HederaValidateNftOwnershipTool extends BaseHederaQueryTool {
  constructor(params) {
    super(params);
    this.name = "hedera-validate-nft-ownership";
    this.description = "Validates whether a specific account owns a particular NFT by token ID and serial number.";
    this.specificInputSchema = ValidateNftOwnershipZodSchema;
    this.namespace = "hts";
  }
  async executeQuery(args) {
    this.logger.info(
      `Validating NFT ownership: account ${args.accountId}, token ${args.tokenId}, serial ${args.serialNumber}`
    );
    const nftDetail = await this.hederaKit.query().validateNftOwnership(
      args.accountId,
      args.tokenId,
      args.serialNumber
    );
    const isOwned = nftDetail !== null;
    return {
      success: true,
      accountId: args.accountId,
      tokenId: args.tokenId,
      serialNumber: args.serialNumber,
      isOwned,
      nftDetail: isOwned ? nftDetail : null
    };
  }
}
export {
  HederaValidateNftOwnershipTool
};
//# sourceMappingURL=index58.js.map
