import { z } from "zod";
import { BaseHederaTransactionTool } from "./index26.js";
const AssociateTokensZodSchemaCore = z.object({
  accountId: z.string().describe('The account ID to associate tokens with (e.g., "0.0.xxxx").'),
  tokenIds: z.array(z.string().describe('A token ID (e.g., "0.0.yyyy").')).min(1).describe("An array of one or more token IDs to associate.")
});
class HederaAssociateTokensTool extends BaseHederaTransactionTool {
  constructor(params) {
    super(params);
    this.name = "hedera-hts-associate-tokens";
    this.description = "Associates one or more Hedera tokens with an account.";
    this.specificInputSchema = AssociateTokensZodSchemaCore;
    this.namespace = "hts";
  }
  getServiceBuilder() {
    return this.hederaKit.hts();
  }
  async callBuilderMethod(builder, specificArgs) {
    await builder.associateTokens(
      specificArgs
    );
  }
}
export {
  HederaAssociateTokensTool
};
//# sourceMappingURL=index36.js.map
