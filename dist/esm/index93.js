import { BasePlugin } from "./index84.js";
import "./index7.js";
import "./index8.js";
import "./index9.js";
import "./index10.js";
import "./index11.js";
import "./index12.js";
import "./index13.js";
import "./index14.js";
import "./index15.js";
import "./index16.js";
import "./index17.js";
import "./index18.js";
import "./index19.js";
import "./index20.js";
import "./index21.js";
import "./index22.js";
import "./index23.js";
import "./index24.js";
import "./index25.js";
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
import { HederaGetHbarPriceTool } from "./index65.js";
import { HederaGetNetworkInfoTool } from "./index66.js";
import { HederaGetNetworkFeesTool } from "./index67.js";
import { HederaGetBlocksTool } from "./index68.js";
import "./index69.js";
import { ModelCapability } from "./index91.js";
class HederaNetworkPlugin extends BasePlugin {
  constructor() {
    super(...arguments);
    this.id = "hedera-network";
    this.name = "Hedera Network Plugin";
    this.description = "Provides tools for interacting with the Hedera network and mirror node.";
    this.version = "1.0.0";
    this.author = "Auto-Generated";
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
    const queryToolParams = { hederaKit, logger, modelCapability };
    this.tools = [
      new HederaGetHbarPriceTool(queryToolParams),
      new HederaGetBlocksTool(queryToolParams),
      new HederaGetNetworkInfoTool(queryToolParams),
      new HederaGetNetworkFeesTool(queryToolParams)
    ];
  }
  getTools() {
    return this.tools;
  }
}
export {
  HederaNetworkPlugin,
  HederaNetworkPlugin as default
};
//# sourceMappingURL=index93.js.map
