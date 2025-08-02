import { z } from "zod";
import { BaseHederaQueryTool } from "./index27.js";
const GetTransactionZodSchema = z.object({
  transactionIdOrHash: z.string().describe(
    'The transaction ID (e.g., "0.0.12345-1234567890-123456789") or hash to get details for'
  )
});
class HederaGetTransactionTool extends BaseHederaQueryTool {
  constructor(params) {
    super(params);
    this.name = "hedera-get-transaction";
    this.description = "Retrieves detailed information about a Hedera transaction by transaction ID or hash.";
    this.specificInputSchema = GetTransactionZodSchema;
    this.namespace = "transaction";
  }
  async executeQuery(args) {
    this.logger.info(
      `Getting transaction details for: ${args.transactionIdOrHash}`
    );
    const transaction = await this.hederaKit.query().getTransaction(args.transactionIdOrHash);
    if (!transaction) {
      return {
        success: false,
        error: `Transaction ${args.transactionIdOrHash} not found`
      };
    }
    return {
      success: true,
      transactionIdOrHash: args.transactionIdOrHash,
      transaction
    };
  }
}
export {
  HederaGetTransactionTool
};
//# sourceMappingURL=index69.js.map
