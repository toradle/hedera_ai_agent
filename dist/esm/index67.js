import { z } from "zod";
import { BaseHederaQueryTool } from "./index27.js";
const GetNetworkFeesZodSchema = z.object({
  timestamp: z.string().optional().describe("Optional timestamp for historical fees")
});
class HederaGetNetworkFeesTool extends BaseHederaQueryTool {
  constructor(params) {
    super(params);
    this.name = "hedera-get-network-fees";
    this.description = "Retrieves network fees from the Hedera network.";
    this.specificInputSchema = GetNetworkFeesZodSchema;
    this.namespace = "network";
  }
  async executeQuery(args) {
    this.logger.info("Getting network fees");
    const networkFees = await this.hederaKit.query().getNetworkFees(args.timestamp);
    if (networkFees === null) {
      return {
        success: false,
        error: "Could not retrieve network fees"
      };
    }
    return {
      success: true,
      networkFees
    };
  }
}
export {
  HederaGetNetworkFeesTool
};
//# sourceMappingURL=index67.js.map
