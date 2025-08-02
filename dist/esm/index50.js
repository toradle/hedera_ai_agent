import { z } from "zod";
import { BaseHederaTransactionTool } from "./index26.js";
const RejectTokensZodSchemaCore = z.object({
  tokenId: z.string().describe(
    'The ID of the token type to reject future associations with (e.g., "0.0.xxxx").'
  ),
  memo: z.string().optional().describe("Optional. Memo for the transaction.")
});
class HederaRejectTokensTool extends BaseHederaTransactionTool {
  constructor(params) {
    super(params);
    this.name = "hedera-hts-reject-tokens";
    this.description = "Configures the operator to reject future auto-associations with a specific token type.";
    this.specificInputSchema = RejectTokensZodSchemaCore;
    this.namespace = "hts";
  }
  getServiceBuilder() {
    return this.hederaKit.hts();
  }
  async callBuilderMethod(builder, specificArgs) {
    await builder.rejectTokens(
      specificArgs
    );
  }
}
export {
  HederaRejectTokensTool
};
//# sourceMappingURL=index50.js.map
