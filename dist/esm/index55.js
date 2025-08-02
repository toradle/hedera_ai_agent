import { z } from "zod";
import { BaseHederaTransactionTool } from "./index26.js";
const UnfreezeTokenAccountZodSchemaCore = z.object({
  tokenId: z.string().describe('The ID of the token (e.g., "0.0.xxxx").'),
  accountId: z.string().describe(
    'The account ID to be unfrozen for the token (e.g., "0.0.yyyy").'
  )
});
class HederaUnfreezeTokenAccountTool extends BaseHederaTransactionTool {
  constructor(params) {
    super(params);
    this.name = "hedera-hts-unfreeze-token-account";
    this.description = "Unfreezes an account for a specific token.";
    this.specificInputSchema = UnfreezeTokenAccountZodSchemaCore;
    this.namespace = "hts";
  }
  getServiceBuilder() {
    return this.hederaKit.hts();
  }
  async callBuilderMethod(builder, specificArgs) {
    await builder.unfreezeTokenAccount(
      specificArgs
    );
  }
}
export {
  HederaUnfreezeTokenAccountTool
};
//# sourceMappingURL=index55.js.map
