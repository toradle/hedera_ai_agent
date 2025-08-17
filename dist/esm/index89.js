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
import { HederaAirdropTokenTool } from "./index35.js";
import { HederaAssociateTokensTool } from "./index36.js";
import { HederaBurnFungibleTokenTool } from "./index37.js";
import { HederaBurnNftTool } from "./index38.js";
import { HederaClaimAirdropTool } from "./index39.js";
import { HederaCreateFungibleTokenTool } from "./index40.js";
import { HederaCreateNftTool } from "./index41.js";
import { HederaDeleteTokenTool } from "./index42.js";
import { HederaDissociateTokensTool } from "./index43.js";
import { HederaFreezeTokenAccountTool } from "./index44.js";
import { HederaGetTokenInfoTool } from "./index45.js";
import { HederaGrantKycTokenTool } from "./index46.js";
import { HederaMintFungibleTokenTool } from "./index47.js";
import { HederaMintNftTool } from "./index48.js";
import { HederaPauseTokenTool } from "./index49.js";
import { HederaRejectTokensTool } from "./index50.js";
import { HederaRevokeKycTokenTool } from "./index51.js";
import { HederaTokenFeeScheduleUpdateTool } from "./index52.js";
import { HederaTransferNftTool } from "./index53.js";
import { HederaTransferTokensTool } from "./index54.js";
import { HederaUnfreezeTokenAccountTool } from "./index55.js";
import { HederaUnpauseTokenTool } from "./index56.js";
import { HederaUpdateTokenTool } from "./index57.js";
import { HederaValidateNftOwnershipTool } from "./index58.js";
import { HederaWipeTokenAccountTool } from "./index59.js";
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
class HederaHTSPlugin extends BasePlugin {
  constructor() {
    super(...arguments);
    this.id = "hedera-hts";
    this.name = "Hedera Token Service Plugin";
    this.description = "Provides tools for interacting with the Hedera Token Service (HTS).";
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
      new HederaAirdropTokenTool(toolParams),
      new HederaAssociateTokensTool(toolParams),
      new HederaClaimAirdropTool(toolParams),
      new HederaCreateFungibleTokenTool(toolParams),
      new HederaCreateNftTool(toolParams),
      new HederaMintFungibleTokenTool(toolParams),
      new HederaMintNftTool(toolParams),
      new HederaRejectTokensTool(toolParams),
      new HederaTransferTokensTool(toolParams),
      new HederaDissociateTokensTool(toolParams),
      new HederaUpdateTokenTool(toolParams),
      new HederaDeleteTokenTool(toolParams),
      new HederaPauseTokenTool(toolParams),
      new HederaUnpauseTokenTool(toolParams),
      new HederaFreezeTokenAccountTool(toolParams),
      new HederaUnfreezeTokenAccountTool(toolParams),
      new HederaGrantKycTokenTool(toolParams),
      new HederaRevokeKycTokenTool(toolParams),
      new HederaWipeTokenAccountTool(toolParams),
      new HederaTokenFeeScheduleUpdateTool(toolParams),
      new HederaTransferNftTool(toolParams),
      new HederaBurnFungibleTokenTool(toolParams),
      new HederaBurnNftTool(toolParams),
      new HederaGetTokenInfoTool(queryToolParams),
      new HederaValidateNftOwnershipTool(queryToolParams)
    ];
  }
  getTools() {
    return this.tools;
  }
}
export {
  HederaHTSPlugin,
  HederaHTSPlugin as default
};
//# sourceMappingURL=index89.js.map
