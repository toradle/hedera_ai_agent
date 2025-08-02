import { z } from "zod";
import { BaseHederaTransactionTool } from "./index26.js";
const DeleteNftSerialAllowancesZodSchemaCore = z.object({
  ownerAccountId: z.string().optional().describe(
    "Optional. The ID of the NFT owner. Defaults to the operator/signer if not provided."
  ),
  nftIdString: z.string().describe(
    'The specific NFT ID including serial number (e.g., "0.0.token.serial") for which all spender allowances will be deleted.'
  ),
  memo: z.string().optional().describe("Optional. Memo for the transaction.")
});
class HederaDeleteNftSerialAllowancesTool extends BaseHederaTransactionTool {
  constructor(params) {
    super(params);
    this.name = "hedera-account-delete-nft-serial-allowances-for-all-spenders";
    this.description = "Deletes all allowances for a specific NFT serial (for all spenders), granted by an owner. This action must be signed by the NFT owner.";
    this.specificInputSchema = DeleteNftSerialAllowancesZodSchemaCore;
    this.namespace = "account";
  }
  getServiceBuilder() {
    return this.hederaKit.accounts();
  }
  async callBuilderMethod(builder, specificArgs) {
    await builder.deleteNftSerialAllowancesForAllSpenders(
      specificArgs
    );
  }
}
export {
  HederaDeleteNftSerialAllowancesTool
};
//# sourceMappingURL=index17.js.map
