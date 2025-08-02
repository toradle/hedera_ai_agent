import { z } from "zod";
import { BaseHederaQueryTool } from "./index27.js";
const GetContractZodSchema = z.object({
  contractIdOrAddress: z.string().describe("The contract ID or EVM address"),
  timestamp: z.string().optional().describe("Optional timestamp for historical data"),
  includeBytecode: z.boolean().optional().default(false).describe(
    "Whether to include full bytecode in response (may be very large)"
  )
});
class HederaGetContractTool extends BaseHederaQueryTool {
  constructor(params) {
    super(params);
    this.name = "hedera-get-contract";
    this.description = "Retrieves a specific contract by ID or EVM address from the Hedera network. Use includeBytecode=true for full bytecode (may be large).";
    this.specificInputSchema = GetContractZodSchema;
    this.namespace = "scs";
  }
  getLargeFieldProcessors(args) {
    if (args.includeBytecode) {
      return {};
    }
    return {
      "contract.bytecode": {
        maxLength: 200,
        truncateMessage: "[Use includeBytecode=true for full bytecode]"
      },
      "contract.runtime_bytecode": {
        maxLength: 200,
        truncateMessage: "[Use includeBytecode=true for full runtime bytecode]"
      },
      "contract.creation_bytecode": {
        maxLength: 200,
        truncateMessage: "[Use includeBytecode=true for full creation bytecode]"
      },
      bytecode: {
        maxLength: 200,
        truncateMessage: "[Use includeBytecode=true for full bytecode]"
      },
      runtime_bytecode: {
        maxLength: 200,
        truncateMessage: "[Use includeBytecode=true for full runtime bytecode]"
      },
      creation_bytecode: {
        maxLength: 200,
        truncateMessage: "[Use includeBytecode=true for full creation bytecode]"
      }
    };
  }
  async executeQuery(args) {
    this.logger.info(`Getting contract: ${args.contractIdOrAddress}`);
    const contract = await this.hederaKit.query().getContract(args.contractIdOrAddress, args.timestamp);
    if (contract === null) {
      return {
        success: false,
        error: `Contract ${args.contractIdOrAddress} not found`
      };
    }
    return {
      success: true,
      contract,
      summary: {
        contractId: contract.contract_id,
        evmAddress: contract.evm_address,
        created: contract.created_timestamp,
        expiration: contract.expiration_timestamp,
        deleted: contract.deleted,
        memo: contract.memo || "No memo",
        autoRenewPeriod: contract.auto_renew_period,
        maxAutomaticTokenAssociations: contract.max_automatic_token_associations,
        hasAdminKey: Boolean(contract.admin_key),
        hasBytecode: Boolean(contract.bytecode),
        hasRuntimeBytecode: Boolean(contract.runtime_bytecode),
        bytecodeIncluded: args.includeBytecode
      }
    };
  }
}
export {
  HederaGetContractTool
};
//# sourceMappingURL=index62.js.map
