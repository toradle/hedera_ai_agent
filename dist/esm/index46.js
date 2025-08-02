import { z } from "zod";
import { BaseHederaTransactionTool } from "./index26.js";
const GrantKycTokenZodSchemaCore = z.object({
  tokenId: z.string().describe('The ID of the token (e.g., "0.0.xxxx").'),
  accountId: z.string().describe(
    'The account ID to be granted KYC for the token (e.g., "0.0.yyyy").'
  )
});
class HederaGrantKycTokenTool extends BaseHederaTransactionTool {
  constructor(params) {
    super(params);
    this.name = "hedera-hts-grant-kyc-token";
    this.description = "Grants KYC to an account for a specific token.";
    this.specificInputSchema = GrantKycTokenZodSchemaCore;
    this.namespace = "hts";
  }
  getServiceBuilder() {
    return this.hederaKit.hts();
  }
  async callBuilderMethod(builder, specificArgs) {
    await builder.grantKycToken(
      specificArgs
    );
  }
}
export {
  HederaGrantKycTokenTool
};
//# sourceMappingURL=index46.js.map
