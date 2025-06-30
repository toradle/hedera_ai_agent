import { BasePlugin } from '../BasePlugin';
import type { GenericPluginContext, HederaTool, IPlugin } from '../PluginInterface';
import {
  HederaCreateFileTool,
  HederaAppendFileTool,
  HederaUpdateFileTool,
  HederaDeleteFileTool,
  HederaGetFileContentsTool
} from '../../langchain';
import { ModelCapability } from '../../types/model-capability';

export class HederaFilePlugin extends BasePlugin<GenericPluginContext> implements IPlugin<GenericPluginContext> {
  id = 'hedera-file';
  name = 'Hedera File Service Plugin';
  description = 'Provides tools for interacting with the Hedera File Service (HFS).';
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
      new HederaCreateFileTool(toolParams),
      new HederaAppendFileTool(toolParams),
      new HederaUpdateFileTool(toolParams),
      new HederaDeleteFileTool(toolParams),
      new HederaGetFileContentsTool(queryToolParams)
    ];
  }

  override getTools(): HederaTool[] {
    return this.tools;
  }
}

export default HederaFilePlugin; 