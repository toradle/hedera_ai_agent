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
import { HederaCreateTopicTool } from "./index28.js";
import { HederaSubmitMessageTool } from "./index29.js";
import { HederaDeleteTopicTool } from "./index30.js";
import { HederaUpdateTopicTool } from "./index31.js";
import { HederaGetTopicMessages } from "./index32.js";
import { HederaGetTopicInfoTool } from "./index33.js";
import { HederaGetTopicFeesTool } from "./index34.js";
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
class HederaHCSPlugin extends BasePlugin {
  constructor() {
    super(...arguments);
    this.id = "hedera-hcs";
    this.name = "Hedera Consensus Service Plugin";
    this.description = "Provides tools for interacting with the Hedera Consensus Service (HCS).";
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
    const toolParams = { hederaKit, logger };
    const queryToolParams = { hederaKit, logger, modelCapability };
    this.tools = [
      new HederaCreateTopicTool(toolParams),
      new HederaDeleteTopicTool(toolParams),
      new HederaUpdateTopicTool(toolParams),
      new HederaSubmitMessageTool(toolParams),
      new HederaGetTopicInfoTool(queryToolParams),
      new HederaGetTopicFeesTool(queryToolParams),
      new HederaGetTopicMessages(queryToolParams)
    ];
  }
  getTools() {
    return this.tools;
  }
}
export {
  HederaHCSPlugin,
  HederaHCSPlugin as default
};
//# sourceMappingURL=index88.js.map
