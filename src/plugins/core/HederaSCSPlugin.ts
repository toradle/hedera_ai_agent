import { BasePlugin } from '../BasePlugin';
import type { GenericPluginContext, HederaTool, IPlugin } from '../PluginInterface';
import {
  HederaUpdateContractTool,
  HederaDeleteContractTool,
  HederaGetContractsTool,
  HederaGetContractTool
} from '../../langchain';
import { ModelCapability } from '../../types/model-capability';

export class HederaSCSPlugin extends BasePlugin<GenericPluginContext> implements IPlugin<GenericPluginContext> {
  id = 'hedera-scs';
  name = 'Hedera Smart Contract Service Plugin';
  description = 'Provides tools for interacting with the Hedera Smart Contract Service (SCS).';
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
    const toolParams = { hederaKit, logger };
    const queryToolParams = { hederaKit, logger, modelCapability };
    this.tools = [
      new HederaUpdateContractTool(toolParams),
      new HederaDeleteContractTool(toolParams),
      new HederaGetContractsTool(queryToolParams),
      new HederaGetContractTool(queryToolParams)
    ];
  }

  override getTools(): HederaTool[] {
    return this.tools;
  }
}

export default HederaSCSPlugin; 