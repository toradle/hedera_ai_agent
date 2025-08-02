import { z } from "zod";
import { BaseHederaQueryTool } from "./index27.js";
const GetContractsZodSchema = z.object({
  contractId: z.string().optional().describe("Filter by specific contract ID"),
  limit: z.number().optional().describe("Maximum number of contracts to return"),
  order: z.enum(["asc", "desc"]).optional().describe("Order of results")
});
class HederaGetContractsTool extends BaseHederaQueryTool {
  constructor(params) {
    super(params);
    this.name = "hedera-get-contracts";
    this.description = "Retrieves contract entities from the Hedera network with optional filtering.";
    this.specificInputSchema = GetContractsZodSchema;
    this.namespace = "scs";
  }
  async executeQuery(args) {
    this.logger.info("Getting contracts from the network");
    const contracts = await this.hederaKit.query().getContracts(args);
    if (contracts === null) {
      return {
        success: false,
        error: "Could not retrieve contracts from the network"
      };
    }
    return {
      success: true,
      contracts,
      count: contracts.length
    };
  }
}
export {
  HederaGetContractsTool
};
//# sourceMappingURL=index63.js.map
