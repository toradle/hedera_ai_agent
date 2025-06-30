import { BasePlugin } from '../BasePlugin';
import type { GenericPluginContext, HederaTool, IPlugin } from '../PluginInterface';
import {
  HederaCreateTopicTool,
  HederaDeleteTopicTool,
  HederaUpdateTopicTool,
  HederaSubmitMessageTool,
  HederaGetTopicInfoTool,
  HederaGetTopicFeesTool,
  HederaGetTopicMessages
} from '../../langchain';
import { ModelCapability } from '../../types/model-capability';

export class HederaHCSPlugin extends BasePlugin<GenericPluginContext> implements IPlugin<GenericPluginContext> {
  id = 'hedera-hcs';
  name = 'Hedera Consensus Service Plugin';
  description = 'Provides tools for interacting with the Hedera Consensus Service (HCS).';
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
      new HederaCreateTopicTool(toolParams),
      new HederaDeleteTopicTool(toolParams),
      new HederaUpdateTopicTool(toolParams),
      new HederaSubmitMessageTool(toolParams),
      new HederaGetTopicInfoTool(queryToolParams),
      new HederaGetTopicFeesTool(queryToolParams),
      new HederaGetTopicMessages(queryToolParams)
    ];
  }

  override getTools(): HederaTool[] {
    return this.tools;
  }
}

export default HederaHCSPlugin; 