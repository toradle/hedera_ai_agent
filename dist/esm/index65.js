import { z } from "zod";
import { BaseHederaQueryTool } from "./index27.js";
const GetHbarPriceZodSchema = z.object({
  date: z.string().optional().describe(
    'Date to get HBAR price for in ISO format (e.g., "2023-12-01T00:00:00Z"). Defaults to current date.'
  )
});
class HederaGetHbarPriceTool extends BaseHederaQueryTool {
  constructor(params) {
    super(params);
    this.name = "hedera-get-hbar-price";
    this.description = "Retrieves the HBAR price in USD for a specific date. Defaults to current date if no date provided.";
    this.specificInputSchema = GetHbarPriceZodSchema;
    this.namespace = "network";
  }
  async executeQuery(args) {
    const date = args.date ? new Date(args.date) : /* @__PURE__ */ new Date();
    this.logger.info(`Getting HBAR price for date: ${date.toISOString()}`);
    const price = await this.hederaKit.query().getHbarPrice(date);
    if (price === null) {
      return {
        success: false,
        error: `Could not retrieve HBAR price for date ${date.toISOString()}`
      };
    }
    return {
      success: true,
      date: date.toISOString(),
      priceUsd: price,
      currency: "USD"
    };
  }
}
export {
  HederaGetHbarPriceTool
};
//# sourceMappingURL=index65.js.map
