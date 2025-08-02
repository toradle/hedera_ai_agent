import { z } from "zod";
import { BaseHederaTransactionTool } from "./index26.js";
const PauseTokenZodSchemaCore = z.object({
  tokenId: z.string().describe('The ID of the token to pause (e.g., "0.0.xxxx").')
});
class HederaPauseTokenTool extends BaseHederaTransactionTool {
  constructor(params) {
    super(params);
    this.name = "hedera-hts-pause-token";
    this.description = "Pauses a token. Requires the tokenId. Use metaOptions for execution control.";
    this.specificInputSchema = PauseTokenZodSchemaCore;
    this.namespace = "hts";
  }
  getServiceBuilder() {
    return this.hederaKit.hts();
  }
  async callBuilderMethod(builder, specificArgs) {
    await builder.pauseToken(
      specificArgs
    );
  }
}
export {
  HederaPauseTokenTool
};
//# sourceMappingURL=index49.js.map
