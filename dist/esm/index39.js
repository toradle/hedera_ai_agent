import { z } from "zod";
import { Long, AccountId, TokenId, PendingAirdropId, NftId } from "@hashgraph/sdk";
import { BaseHederaTransactionTool } from "./index26.js";
const ClaimAirdropZodSchemaCore = z.object({
  pendingAirdrops: z.array(
    z.object({
      senderAccountId: z.string().describe("The account ID of the sender of the airdrop."),
      tokenId: z.string().describe("The token ID of the airdropped token."),
      serialNumber: z.union([z.number(), z.string()]).describe(
        "The serial number for an NFT, or a string/number convertible to Long(0) for fungible token claims (representing the whole pending amount for that FT from that sender)."
      )
    })
  ).min(1).max(10).describe(
    "An array of pending airdrops to claim. Each object must have senderAccountId, tokenId, and serialNumber. Max 10 entries."
  )
});
class HederaClaimAirdropTool extends BaseHederaTransactionTool {
  constructor(params) {
    super(params);
    this.name = "hedera-hts-claim-airdrop";
    this.description = "Claims pending airdropped tokens (fungible or NFT serials). Requires an array of airdrop objects, each specifying senderAccountId, tokenId, and serialNumber. Use metaOptions for execution control.";
    this.specificInputSchema = ClaimAirdropZodSchemaCore;
    this.namespace = "hts";
  }
  getServiceBuilder() {
    return this.hederaKit.hts();
  }
  async callBuilderMethod(builder, specificArgs) {
    const sdkPendingAirdropIds = specificArgs.pendingAirdrops.map((item, index) => {
      const itemNumber = index + 1;
      let serialValue;
      if (typeof item.serialNumber === "string") {
        try {
          serialValue = Long.fromString(item.serialNumber);
        } catch (e) {
          const error = e;
          throw new Error(
            `Pending airdrop item #${itemNumber} serialNumber string ('${item.serialNumber}') is not a valid Long: ${error.message}`
          );
        }
      } else {
        serialValue = Long.fromNumber(item.serialNumber);
      }
      try {
        const senderId = AccountId.fromString(item.senderAccountId);
        const tokId = TokenId.fromString(item.tokenId);
        return new PendingAirdropId({
          senderId,
          tokenId: tokId,
          nftId: NftId.fromString(serialValue.toString())
        });
      } catch (e) {
        const error = e;
        throw new Error(
          `Error constructing PendingAirdropId for item #${itemNumber} (sender: ${item.senderAccountId}, token: ${item.tokenId}, serial: ${item.serialNumber}): ${error.message}`
        );
      }
    });
    const claimParams = {
      pendingAirdropIds: sdkPendingAirdropIds
    };
    builder.claimAirdrop(claimParams);
  }
}
export {
  HederaClaimAirdropTool
};
//# sourceMappingURL=index39.js.map
