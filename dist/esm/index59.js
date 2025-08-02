import { z } from "zod";
import { BaseHederaTransactionTool } from "./index26.js";
const WipeTokenAccountZodSchemaCore = z.object({
  tokenId: z.string().describe('The ID of the token to wipe (e.g., "0.0.xxxx").'),
  accountId: z.string().describe(
    'The account ID from which tokens will be wiped (e.g., "0.0.yyyy").'
  ),
  amount: z.union([z.number(), z.string()]).optional().describe(
    "For Fungible Tokens: amount to wipe (smallest unit). Builder handles conversion and validation."
  ),
  serials: z.array(z.union([z.number().int().positive(), z.string()])).optional().describe(
    "For Non-Fungible Tokens: array of serial numbers to wipe. Builder handles conversion and validation."
  )
});
class HederaWipeTokenAccountTool extends BaseHederaTransactionTool {
  constructor(params) {
    super(params);
    this.name = "hedera-hts-wipe-token-account";
    this.description = "Wipes tokens (fungible or non-fungible) from an account. Provide 'amount' for FTs or 'serials' for NFTs. Builder validates inputs.";
    this.specificInputSchema = WipeTokenAccountZodSchemaCore;
    this.namespace = "hts";
  }
  getServiceBuilder() {
    return this.hederaKit.hts();
  }
  async callBuilderMethod(builder, specificArgs) {
    await builder.wipeTokenAccount(
      specificArgs
    );
  }
}
export {
  HederaWipeTokenAccountTool
};
//# sourceMappingURL=index59.js.map
