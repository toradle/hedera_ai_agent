import { z } from 'zod';
import type { Context } from '../../configuration';
import type { Tool } from '../../tools';
import { Client } from '@hashgraph/sdk';
import { handleTransaction } from '../../strategies/tx-mode-strategy';
import HederaBuilder from '../../hedera-utils/hedera-builder';
import { submitTopicMessageParameters } from '@/shared/parameter-schemas/hcs.zod';
import HederaParameterNormaliser from '@/shared/hedera-utils/hedera-parameter-normaliser';

const submitTopicMessagePrompt = (_context: Context = {}) => `
This tool will submit a message to a topic on the Hedera network.

It takes the following arguments:
- topicId (str): The ID of the topic to submit the message to.
- message (str): The message to submit to the topic.
- sender (str, optional): The account ID of the sender. If not provided, the current operator account or account from context is used.
`;

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
