import { z } from 'zod';
import type { Context } from '@/shared/configuration';
import type { Tool } from '@/shared/tools';
import { Client } from '@hashgraph/sdk';
import { handleTransaction } from '@/shared/strategies/tx-mode-strategy';
import HederaBuilder from '@/shared/hedera-utils/hedera-builder';
import { submitTopicMessageParameters } from '@/shared/parameter-schemas/hcs.zod';
import { PromptGenerator } from '@/shared/utils/prompt-generator';

const submitTopicMessagePrompt = (_context: Context = {}) => {
  const usageInstructions = PromptGenerator.getParameterUsageInstructions();

  return `
This tool will submit a message to a topic on the Hedera network.

Parameters:
- topicId (str, required): The ID of the topic to submit the message to
- message (str, required): The message to submit to the topic
${usageInstructions}
`;
};

const submitTopicMessage = async (
  client: Client,
  context: Context,
  params: z.infer<ReturnType<typeof submitTopicMessageParameters>>,
) => {
  try {
    const tx = HederaBuilder.submitTopicMessage(params);
    const result = await handleTransaction(tx, client, context);
    return result;
  } catch (error) {
    if (error instanceof Error) {
      return error.message;
    }
    return 'Failed to submit message to topic';
  }
};

export const SUBMIT_TOPIC_MESSAGE_TOOL = 'submit_topic_message_tool';

const tool = (context: Context): Tool => ({
  method: SUBMIT_TOPIC_MESSAGE_TOOL,
  name: 'Submit Topic Message',
  description: submitTopicMessagePrompt(context),
  parameters: submitTopicMessageParameters(context),
  execute: submitTopicMessage,
});

export default tool;
