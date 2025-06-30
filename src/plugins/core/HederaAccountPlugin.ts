import { BasePlugin } from '../BasePlugin';
import type { GenericPluginContext, HederaTool, IPlugin } from '../PluginInterface';
import {
  HederaApproveFungibleTokenAllowanceTool,
  HederaApproveHbarAllowanceTool,
  HederaApproveTokenNftAllowanceTool,
  HederaCreateAccountTool,
  HederaDeleteAccountTool,
  HederaUpdateAccountTool,
  HederaTransferHbarTool,
  HederaRevokeHbarAllowanceTool,
  HederaRevokeFungibleTokenAllowanceTool,
  SignAndExecuteScheduledTransactionTool,
  HederaDeleteNftSpenderAllowanceTool,
  HederaDeleteNftSerialAllowancesTool,
  HederaGetAccountBalanceTool,
  HederaGetAccountPublicKeyTool,
  HederaGetAccountInfoTool,
  HederaGetAccountTokensTool,
  HederaGetAccountNftsTool,
  HederaGetOutstandingAirdropsTool,
  HederaGetPendingAirdropsTool
} from '../../langchain';
import { ModelCapability } from '../../types/model-capability';

export class HederaAccountPlugin extends BasePlugin<GenericPluginContext> implements IPlugin<GenericPluginContext> {
  id = 'hedera-account';
  name = 'Hedera Account Plugin';
  description = 'Provides tools for interacting with Hedera accounts.';
  version = '1.0.0';
  author = 'Hedera Hashgraph';

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

  override getTools(): HederaTool[] {
    return this.tools;
  }
}

export default HederaAccountPlugin; 