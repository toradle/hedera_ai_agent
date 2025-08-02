import { z } from "zod";
import { BaseHederaQueryTool } from "./index27.js";
const GetNetworkInfoZodSchema = z.object({});
class HederaGetNetworkInfoTool extends BaseHederaQueryTool {
  constructor(params) {
    super(params);
    this.name = "hedera-get-network-info";
    this.description = "Retrieves network information from the Hedera network.";
    this.specificInputSchema = GetNetworkInfoZodSchema;
    this.namespace = "network";
  }
  async executeQuery() {
    this.logger.info("Getting network information");
    const networkInfo = await this.hederaKit.query().getNetworkInfo();
    if (networkInfo === null) {
      return {
        success: false,
        error: "Could not retrieve network information"
      };
    }
    return {
      success: true,
      networkInfo
    };
  }
}
export {
  HederaGetNetworkInfoTool
};
//# sourceMappingURL=index66.js.map
