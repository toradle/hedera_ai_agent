import { BasePlugin } from '../BasePlugin';
import type { GenericPluginContext, HederaTool, IPlugin } from '../PluginInterface';
import {
  HederaGetHbarPriceTool,
  HederaGetBlocksTool,
  HederaGetNetworkInfoTool,
  HederaGetNetworkFeesTool
} from '../../langchain';
import { ModelCapability } from '../../types/model-capability';

export class HederaNetworkPlugin extends BasePlugin<GenericPluginContext> implements IPlugin<GenericPluginContext> {
  id = 'hedera-network';
  name = 'Hedera Network Plugin';
  description = 'Provides tools for interacting with the Hedera network and mirror node.';
  version = '1.0.0';
  author = 'Auto-Generated';

  private tools: HederaTool[] = [];

  override async initialize(context: GenericPluginContext): Promise<void> {
    await super.initialize(context);
    const hederaKit = context.config.hederaKit as import('../../agent/agent').HederaAgentKit;
    const logger = context.logger;
    let modelCapability: ModelCapability = ModelCapability.MEDIUM;
    if (
      context.config.modelCapability &&
      Object.values(ModelCapability).includes(context.config.modelCapability as ModelCapability)
    ) {
      modelCapability = context.config.modelCapability as ModelCapability;
    }
    const queryToolParams = { hederaKit, logger, modelCapability };
    this.tools = [
      new HederaGetHbarPriceTool(queryToolParams),
      new HederaGetBlocksTool(queryToolParams),
      new HederaGetNetworkInfoTool(queryToolParams),
      new HederaGetNetworkFeesTool(queryToolParams)
    ];
  }

  override getTools(): HederaTool[] {
    return this.tools;
  }
}

export default HederaNetworkPlugin; 