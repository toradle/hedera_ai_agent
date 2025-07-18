import { z } from 'zod';
import type { Context } from '@/shared/configuration.js';
import type { Tool } from '@/shared/tools.js';
import { Client } from '@hashgraph/sdk';
import { handleTransaction } from '@/shared/strategies/tx-mode-strategy.js';
import HederaBuilder from '@/shared/hedera-utils/hedera-builder.js';
import { submitTopicMessageParameters } from '@/shared/parameter-schemas/hcs.zod.js';
import HederaParameterNormaliser from '@/shared/hedera-utils/hedera-parameter-normaliser.js';
import { PromptGenerator } from '@/shared/utils/prompt-generator.js';

const submitTopicMessagePrompt = (context: Context = {}) => {
  const contextSnippet = PromptGenerator.getContextSnippet(context);
  const senderDesc = PromptGenerator.getAccountParameterDescription('sender', context);
  const usageInstructions = PromptGenerator.getParameterUsageInstructions();

  return `
${contextSnippet}

This tool will submit a message to a topic on the Hedera network.

Parameters:
- topicId (str, required): The ID of the topic to submit the message to
- message (str, required): The message to submit to the topic
- ${senderDesc}
${usageInstructions}
`;
};

const submitTopicMessage = async (
  client: Client,
  context: Context,
  params: z.infer<ReturnType<typeof submitTopicMessageParameters>>,
) => {
  try {
    const normalisedParams = HederaParameterNormaliser.normaliseSubmitTopicMessageParams(
      params,
      context,
      client,
    );
    const tx = HederaBuilder.submitTopicMessage(normalisedParams);
    const result = await handleTransaction(tx, client, context);
    console.log('Result from submit topic message', result);
    return result;
  } catch (error) {
    if (error instanceof Error) {
      return error.message;
    }
    return 'Failed to submit message to topic';
  }
};

export const SUBMIT_TOPIC_MESSAGE_TOOL = 'submit_topic_message';

const tool = (context: Context): Tool => ({
  method: SUBMIT_TOPIC_MESSAGE_TOOL,
  name: 'Submit Topic Message',
  description: submitTopicMessagePrompt(context),
  parameters: submitTopicMessageParameters(context),
  execute: submitTopicMessage,
});

export default tool;
