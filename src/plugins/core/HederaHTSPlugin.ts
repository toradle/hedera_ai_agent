import { BasePlugin } from '../BasePlugin';
import type { GenericPluginContext, HederaTool, IPlugin } from '../PluginInterface';
import {
  HederaAirdropTokenTool,
  HederaAssociateTokensTool,
  HederaClaimAirdropTool,
  HederaCreateFungibleTokenTool,
  HederaCreateNftTool,
  HederaMintFungibleTokenTool,
  HederaMintNftTool,
  HederaRejectTokensTool,
  HederaTransferTokensTool,
  HederaDissociateTokensTool,
  HederaUpdateTokenTool,
  HederaDeleteTokenTool,
  HederaPauseTokenTool,
  HederaUnpauseTokenTool,
  HederaFreezeTokenAccountTool,
  HederaUnfreezeTokenAccountTool,
  HederaGrantKycTokenTool,
  HederaRevokeKycTokenTool,
  HederaWipeTokenAccountTool,
  HederaTokenFeeScheduleUpdateTool,
  HederaTransferNftTool,
  HederaBurnFungibleTokenTool,
  HederaBurnNftTool,
  HederaGetTokenInfoTool,
  HederaValidateNftOwnershipTool
} from '../../langchain';
import { ModelCapability } from '../../types/model-capability';

export class HederaHTSPlugin extends BasePlugin<GenericPluginContext> implements IPlugin<GenericPluginContext> {
  id = 'hedera-hts';
  name = 'Hedera Token Service Plugin';
  description = 'Provides tools for interacting with the Hedera Token Service (HTS).';
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

  override getTools(): HederaTool[] {
    return this.tools;
  }
}

export default HederaHTSPlugin; 