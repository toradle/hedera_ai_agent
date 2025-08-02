import { z } from "zod";
import { BaseHederaTransactionTool } from "./index26.js";
const DeleteAccountZodSchemaCore = z.object({
  deleteAccountId: z.string().describe(
    'The ID of the account to be deleted (e.g., "0.0.xxxx"). This account must sign.'
  ),
  transferAccountId: z.string().describe(
    'The ID of the account to transfer the remaining HBAR balance to (e.g., "0.0.yyyy").'
  )
});
class HederaDeleteAccountTool extends BaseHederaTransactionTool {
  constructor(params) {
    super(params);
    this.name = "hedera-account-delete";
    this.description = "Deletes an account, transferring its HBAR balance to another account.";
    this.specificInputSchema = DeleteAccountZodSchemaCore;
    this.namespace = "account";
  }
  getServiceBuilder() {
    return this.hederaKit.accounts();
  }
  async callBuilderMethod(builder, specificArgs) {
    await builder.deleteAccount(
      specificArgs
    );
  }
}
export {
  HederaDeleteAccountTool
};
//# sourceMappingURL=index10.js.map
