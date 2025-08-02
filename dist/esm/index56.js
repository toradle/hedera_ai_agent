import { z } from "zod";
import { BaseHederaTransactionTool } from "./index26.js";
const UnpauseTokenZodSchemaCore = z.object({
  tokenId: z.string().describe('The ID of the token to unpause (e.g., "0.0.xxxx").')
});
class HederaUnpauseTokenTool extends BaseHederaTransactionTool {
  constructor(params) {
    super(params);
    this.name = "hedera-hts-unpause-token";
    this.description = "Unpauses a token. Requires the tokenId. Use metaOptions for execution control.";
    this.specificInputSchema = UnpauseTokenZodSchemaCore;
    this.namespace = "hts";
  }
  getServiceBuilder() {
    return this.hederaKit.hts();
  }
  async callBuilderMethod(builder, specificArgs) {
    await builder.unpauseToken(
      specificArgs
    );
  }
}
export {
  HederaUnpauseTokenTool
};
//# sourceMappingURL=index56.js.map
