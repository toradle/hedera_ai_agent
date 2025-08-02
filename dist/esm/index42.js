import { z } from "zod";
import { BaseHederaTransactionTool } from "./index26.js";
const DeleteTokenZodSchemaCore = z.object({
  tokenId: z.string().describe('The ID of the token to delete (e.g., "0.0.xxxx").')
});
class HederaDeleteTokenTool extends BaseHederaTransactionTool {
  constructor(params) {
    super(params);
    this.name = "hedera-hts-delete-token";
    this.description = "Deletes a token. Requires the tokenId. Use metaOptions for execution control.";
    this.specificInputSchema = DeleteTokenZodSchemaCore;
    this.namespace = "hts";
  }
  getServiceBuilder() {
    return this.hederaKit.hts();
  }
  async callBuilderMethod(builder, specificArgs) {
    await builder.deleteToken(
      specificArgs
    );
  }
}
export {
  HederaDeleteTokenTool
};
//# sourceMappingURL=index42.js.map
