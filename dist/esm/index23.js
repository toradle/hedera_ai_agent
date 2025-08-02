import { z } from "zod";
import { BaseHederaQueryTool } from "./index27.js";
const GetAccountPublicKeyZodSchema = z.object({
  accountId: z.string().describe('The account ID to get the public key for (e.g., "0.0.12345")')
});
class HederaGetAccountPublicKeyTool extends BaseHederaQueryTool {
  constructor(params) {
    super(params);
    this.name = "hedera-get-account-public-key";
    this.description = "Retrieves the public key for a Hedera account. Returns the public key in string format.";
    this.specificInputSchema = GetAccountPublicKeyZodSchema;
    this.namespace = "account";
  }
  async executeQuery(args) {
    this.logger.info(`Getting public key for account ID: ${args.accountId}`);
    const publicKey = await this.hederaKit.query().getPublicKey(args.accountId);
    if (!publicKey) {
      return {
        success: false,
        error: `Could not retrieve public key for account ${args.accountId}`
      };
    }
    return {
      success: true,
      accountId: args.accountId,
      publicKey: publicKey.toString(),
      publicKeyDer: publicKey.toStringDer(),
      publicKeyRaw: publicKey.toStringRaw()
    };
  }
}
export {
  HederaGetAccountPublicKeyTool
};
//# sourceMappingURL=index23.js.map
