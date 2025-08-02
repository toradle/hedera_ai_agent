import { z } from "zod";
import { BaseHederaTransactionTool } from "./index26.js";
const TransferNftZodSchemaCore = z.object({
  tokenId: z.string().describe('The token ID of the NFT (e.g., "0.0.xxxx").'),
  serial: z.union([z.number().int().positive(), z.string()]).describe("The serial number of the NFT."),
  senderAccountId: z.string().describe('The sender account ID (e.g., "0.0.xxxx").'),
  receiverAccountId: z.string().describe('The receiver account ID (e.g., "0.0.yyyy").'),
  isApproved: z.boolean().optional().describe("Optional. True if sender is an approved operator for the NFT."),
  memo: z.string().optional().describe("Optional. Memo for the transaction.")
});
class HederaTransferNftTool extends BaseHederaTransactionTool {
  constructor(params) {
    super(params);
    this.name = "hedera-hts-transfer-nft";
    this.description = "Transfers a single Non-Fungible Token (NFT).";
    this.specificInputSchema = TransferNftZodSchemaCore;
    this.namespace = "hts";
  }
  getServiceBuilder() {
    return this.hederaKit.hts();
  }
  async callBuilderMethod(builder, specificArgs) {
    await builder.transferNft(
      specificArgs
    );
  }
}
export {
  HederaTransferNftTool
};
//# sourceMappingURL=index53.js.map
