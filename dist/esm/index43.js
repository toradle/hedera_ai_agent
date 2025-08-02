import { z } from "zod";
import { BaseHederaTransactionTool } from "./index26.js";
const DissociateTokensZodSchemaCore = z.object({
  accountId: z.string().describe('The account ID to dissociate tokens from (e.g., "0.0.xxxx").'),
  tokenIds: z.array(z.string().describe('A token ID (e.g., "0.0.yyyy").')).min(1).describe("An array of one or more token IDs to dissociate.")
});
class HederaDissociateTokensTool extends BaseHederaTransactionTool {
  constructor(params) {
    super(params);
    this.name = "hedera-hts-dissociate-tokens";
    this.description = "Dissociates one or more Hedera tokens from an account.";
    this.specificInputSchema = DissociateTokensZodSchemaCore;
    this.namespace = "hts";
  }
  getServiceBuilder() {
    return this.hederaKit.hts();
  }
  async callBuilderMethod(builder, specificArgs) {
    await builder.dissociateTokens(
      specificArgs
    );
  }
}
export {
  HederaDissociateTokensTool
};
//# sourceMappingURL=index43.js.map
