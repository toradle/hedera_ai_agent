import { z } from "zod";
import { BaseHederaTransactionTool } from "./index26.js";
const FreezeTokenAccountZodSchemaCore = z.object({
  tokenId: z.string().describe('The ID of the token (e.g., "0.0.xxxx").'),
  accountId: z.string().describe('The account ID to be frozen for the token (e.g., "0.0.yyyy").')
});
class HederaFreezeTokenAccountTool extends BaseHederaTransactionTool {
  constructor(params) {
    super(params);
    this.name = "hedera-hts-freeze-token-account";
    this.description = "Freezes an account for a specific token.";
    this.specificInputSchema = FreezeTokenAccountZodSchemaCore;
    this.namespace = "hts";
  }
  getServiceBuilder() {
    return this.hederaKit.hts();
  }
  async callBuilderMethod(builder, specificArgs) {
    await builder.freezeTokenAccount(
      specificArgs
    );
  }
}
export {
  HederaFreezeTokenAccountTool
};
//# sourceMappingURL=index44.js.map
