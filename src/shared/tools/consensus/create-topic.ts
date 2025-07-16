import { z } from 'zod';
import type { Context } from '../../configuration';
import type { Tool } from '../../tools';
import { Client } from '@hashgraph/sdk';
import { handleTransaction } from '../../strategies/tx-mode-strategy';
import HederaBuilder from '../../hedera-utils/hedera-builder';
import { createTopicParameters } from '@/shared/parameter-schemas/hcs.zod';
import HederaParameterNormaliser from '@/shared/hedera-utils/hedera-parameter-normaliser';

const createTopicPrompt = (_context: Context = {}) => `
This tool will create a new topic on the Hedera network.

It takes the following optional arguments:
- topicMemo (str, optional): A memo for the topic.
- adminKey(str, optional): the admin key for topic.
- isAdminKey (bool, optional): Whether to set an admin key for the topic. If true, and adminKey wasn't passed, the current operator account or account form context is set
- submitKey(str, optional): the submit key for topic.
- isSubmitKey (bool, optional): Whether to set a submit key for the topic. If true, and submitKey wasn't passed, the current operator account or account form context is set
`;

const createTopic = async (
  client: Client,
  context: Context,
  params: z.infer<ReturnType<typeof createTopicParameters>>,
) => {
  try {
    const normalisedParams = HederaParameterNormaliser.normaliseCreateTopicParams(
      params,
      context,
      client,
    );
    const tx = HederaBuilder.createTopic(normalisedParams);
    const result = await handleTransaction(tx, client, context);
    console.log('Result from create topic', result);
    return result;
  } catch (error) {
    if (error instanceof Error) {
      return error.message;
    }
    return 'Failed to create topic';
  }
};

const tool = (context: Context): Tool => ({
  method: 'create_topic_tool',
  name: 'Create Topic',
  description: createTopicPrompt(context),
  parameters: createTopicParameters(context),
  actions: {
    consensus: {
      createTopic: true,
    },
  },
  execute: createTopic,
});

export default tool;
