import { z } from "zod";
import { BaseHederaTransactionTool } from "./index26.js";
const ApproveTokenNftAllowanceZodSchemaCore = z.object({
  ownerAccountId: z.string().optional().describe(
    'Optional. The NFT owner account ID (e.g., "0.0.xxxx"). Defaults to operator.'
  ),
  spenderAccountId: z.string().describe('The spender account ID (e.g., "0.0.yyyy").'),
  tokenId: z.string().describe('The NFT collection ID (e.g., "0.0.zzzz").'),
  serials: z.array(z.union([z.number().int().positive(), z.string()])).optional().describe(
    "Optional. Specific serial numbers to approve. Use this OR allSerials. Builder handles conversion."
  ),
  allSerials: z.boolean().optional().describe(
    "Optional. If true, approves spender for all serials of the NFT ID. Use this OR serials."
  ),
  memo: z.string().optional().describe("Optional. Memo for the transaction.")
});
class HederaApproveTokenNftAllowanceTool extends BaseHederaTransactionTool {
  constructor(params) {
    super(params);
    this.name = "hedera-account-approve-nft-allowance";
    this.description = "Approves an NFT allowance. Builder validates serials/allSerials logic and handles serial conversion.";
    this.specificInputSchema = ApproveTokenNftAllowanceZodSchemaCore;
    this.namespace = "account";
  }
  getServiceBuilder() {
    return this.hederaKit.accounts();
  }
  async callBuilderMethod(builder, specificArgs) {
    await builder.approveTokenNftAllowance(
      specificArgs
    );
  }
}
export {
  HederaApproveTokenNftAllowanceTool
};
//# sourceMappingURL=index13.js.map
