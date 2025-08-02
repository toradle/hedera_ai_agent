import { z } from "zod";
import { BaseHederaTransactionTool } from "./index26.js";
const RevokeKycTokenZodSchemaCore = z.object({
  tokenId: z.string().describe('The ID of the token (e.g., "0.0.xxxx").'),
  accountId: z.string().describe(
    'The account ID to have KYC revoked for the token (e.g., "0.0.yyyy").'
  )
});
class HederaRevokeKycTokenTool extends BaseHederaTransactionTool {
  constructor(params) {
    super(params);
    this.name = "hedera-hts-revoke-kyc-token";
    this.description = "Revokes KYC from an account for a specific token.";
    this.specificInputSchema = RevokeKycTokenZodSchemaCore;
    this.namespace = "hts";
  }
  getServiceBuilder() {
    return this.hederaKit.hts();
  }
  async callBuilderMethod(builder, specificArgs) {
    await builder.revokeKycToken(
      specificArgs
    );
  }
}
export {
  HederaRevokeKycTokenTool
};
//# sourceMappingURL=index51.js.map
