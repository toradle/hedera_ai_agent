import { z } from 'zod';
import type { Context } from '@/shared/configuration.js';
import type { Tool } from '@/shared/tools.js';
import { Client } from '@hashgraph/sdk';
import { handleTransaction } from '@/shared/strategies/tx-mode-strategy.js';
import HederaBuilder from '@/shared/hedera-utils/hedera-builder.js';
import { createTopicParameters } from '@/shared/parameter-schemas/hcs.zod.js';
import HederaParameterNormaliser from '@/shared/hedera-utils/hedera-parameter-normaliser.js';
import { getMirrornodeService } from '@/shared/hedera-utils/mirrornode/hedera-mirrornode-utils.js';
import { IHederaMirrornodeService } from '@/shared/hedera-utils/mirrornode/hedera-mirrornode-service.interface.js';
import { PromptGenerator } from '@/shared/utils/prompt-generator.js';

const createTopicPrompt = (context: Context = {}) => {
  const contextSnippet = PromptGenerator.getContextSnippet(context);
  const usageInstructions = PromptGenerator.getParameterUsageInstructions();

  return `
${contextSnippet}

This tool will create a new topic on the Hedera network.

Parameters:
- topicMemo (str, optional): A memo for the topic
- isSubmitKey (bool, optional): Whether to set a submit key for the topic. Set to true if user wants to set a submit key, otherwise false
${usageInstructions}
`;
};

const createTopic = async (
  client: Client,
  context: Context,
  params: z.infer<ReturnType<typeof createTopicParameters>>,
) => {
  try {
    const mirrornodeService: IHederaMirrornodeService = getMirrornodeService(
      context.mirrornodeService!,
      client.ledgerId!,
    );
    const normalisedParams = await HederaParameterNormaliser.normaliseCreateTopicParams(
      params,
      context,
      client,
      mirrornodeService,
    );
    const tx = HederaBuilder.createTopic(normalisedParams);
    const result = await handleTransaction(tx, client, context);
    return result;
  } catch (error) {
    if (error instanceof Error) {
      return error.message;
    }
    return 'Failed to create topic';
  }
};

export const CREATE_TOPIC_TOOL = 'create_topic_tool';

const tool = (context: Context): Tool => ({
  method: CREATE_TOPIC_TOOL,
  name: 'Create Topic',
  description: createTopicPrompt(context),
  parameters: createTopicParameters(context),
  execute: createTopic,
});

export default tool;
