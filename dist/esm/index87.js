import { BasePlugin } from "./index84.js";
import { HederaCreateAccountTool } from "./index7.js";
import { HederaTransferHbarTool } from "./index8.js";
import { HederaUpdateAccountTool } from "./index9.js";
import { HederaDeleteAccountTool } from "./index10.js";
import { HederaApproveHbarAllowanceTool } from "./index11.js";
import { HederaApproveFungibleTokenAllowanceTool } from "./index12.js";
import { HederaApproveTokenNftAllowanceTool } from "./index13.js";
import { HederaRevokeHbarAllowanceTool } from "./index14.js";
import { HederaRevokeFungibleTokenAllowanceTool } from "./index15.js";
import { HederaDeleteNftSpenderAllowanceTool } from "./index16.js";
import { HederaDeleteNftSerialAllowancesTool } from "./index17.js";
import { HederaGetOutstandingAirdropsTool } from "./index18.js";
import { HederaGetPendingAirdropsTool } from "./index19.js";
import { HederaGetAccountBalanceTool } from "./index20.js";
import { HederaGetAccountInfoTool } from "./index21.js";
import { HederaGetAccountNftsTool } from "./index22.js";
import { HederaGetAccountPublicKeyTool } from "./index23.js";
import { HederaGetAccountTokensTool } from "./index24.js";
import { SignAndExecuteScheduledTransactionTool } from "./index25.js";
import "./index26.js";
import "./index27.js";
import "./index28.js";
import "./index29.js";
import "./index30.js";
import "./index31.js";
import "./index32.js";
import "./index33.js";
import "./index34.js";
import "./index35.js";
import "./index36.js";
import "./index37.js";
import "./index38.js";
import "./index39.js";
import "./index40.js";
import "./index41.js";
import "./index42.js";
import "./index43.js";
import "./index44.js";
import "./index45.js";
import "./index46.js";
import "./index47.js";
import "./index48.js";
import "./index49.js";
import "./index50.js";
import "./index51.js";
import "./index52.js";
import "./index53.js";
import "./index54.js";
import "./index55.js";
import "./index56.js";
import "./index57.js";
import "./index58.js";
import "./index59.js";
import "@hashgraph/sdk";
import "./index61.js";
import "./index62.js";
import "./index63.js";
import "./index64.js";
import "./index65.js";
import "./index66.js";
import "./index67.js";
import "./index68.js";
import "./index69.js";
import { ModelCapability } from "./index91.js";
class HederaAccountPlugin extends BasePlugin {
  constructor() {
    super(...arguments);
    this.id = "hedera-account";
    this.name = "Hedera Account Plugin";
    this.description = "Provides tools for interacting with Hedera accounts.";
    this.version = "1.0.0";
    this.author = "Hedera Hashgraph";
    this.tools = [];
  }
  async initialize(context) {
    await super.initialize(context);
    const hederaKit = context.config.hederaKit;
    const logger = context.logger;
    let modelCapability = ModelCapability.MEDIUM;
    if (context.config.modelCapability && Object.values(ModelCapability).includes(context.config.modelCapability)) {
      modelCapability = context.config.modelCapability;
    }
    const toolParams = { hederaKit, logger };
    const queryToolParams = { hederaKit, logger, modelCapability };
    this.tools = [
      new HederaApproveFungibleTokenAllowanceTool(toolParams),
      new HederaApproveHbarAllowanceTool(toolParams),
      new HederaApproveTokenNftAllowanceTool(toolParams),
      new HederaCreateAccountTool(toolParams),
      new HederaDeleteAccountTool(toolParams),
      new HederaUpdateAccountTool(toolParams),
      new HederaTransferHbarTool(toolParams),
      new HederaRevokeHbarAllowanceTool(toolParams),
      new HederaRevokeFungibleTokenAllowanceTool(toolParams),
      new SignAndExecuteScheduledTransactionTool(toolParams),
      new HederaDeleteNftSpenderAllowanceTool(toolParams),
      new HederaDeleteNftSerialAllowancesTool(toolParams),
      new HederaGetAccountBalanceTool(queryToolParams),
      new HederaGetAccountPublicKeyTool(queryToolParams),
      new HederaGetAccountInfoTool(queryToolParams),
      new HederaGetAccountTokensTool(queryToolParams),
      new HederaGetAccountNftsTool(queryToolParams),
      new HederaGetOutstandingAirdropsTool(queryToolParams),
      new HederaGetPendingAirdropsTool(queryToolParams)
    ];
  }
  getTools() {
    return this.tools;
  }
}
export {
  HederaAccountPlugin,
  HederaAccountPlugin as default
};
//# sourceMappingURL=index87.js.map
