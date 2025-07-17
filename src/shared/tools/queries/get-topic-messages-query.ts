import { Context } from '@/shared/configuration';
import { getMirrornodeService } from '../../hedera-utils/mirrornode/hedera-mirrornode-utils';
import { topicMessagesQueryParameters } from '../../parameter-schemas/account-query.zod';
import { Client } from '@hashgraph/sdk';
import { z } from 'zod';
import { Tool } from '@/shared/tools';

export const getTopicMessagesQueryPrompt = (_context: Context = {}) => `
This tool will return the messages for a given Hedera topic.

It takes four arguments:
- topicId (str): The topic ID to query.
- lowerTimestamp (str, optional): The lower timestamp to query. If set, the messages will be returned after this timestamp.
- upperTimestamp (str, optional): The upper timestamp to query. If set, the messages will be returned before this timestamp.
- limit (int, optional): The limit of messages to query. If set, the number of messages to return.
`;

export const getTopicMessagesQuery = async (
  client: Client,
  context: Context,
  params: z.infer<ReturnType<typeof topicMessagesQueryParameters>>,
) => {
  console.log('Getting topic messages for topic', params.topicId);
  try {
    const mirrornodeService = getMirrornodeService(context.mirrornodeConfig!);
    const messages = await mirrornodeService.getTopicMessages({
      topicId: params.topicId,
      lowerTimestamp: params.lowerTimestamp || '',
      upperTimestamp: params.upperTimestamp || '',
      limit: params.limit || 100,
    });
    return { topicId: params.topicId, messages: messages };
  } catch (error) {
    console.error('Error getting topic messages', error);
  }
  return 'Failed to get topic messages';
};

const tool = (context: Context): Tool => ({
  method: 'get_topic_messages_query',
  name: 'Get Topic Messages',
  description: getTopicMessagesQueryPrompt(context),
  parameters: topicMessagesQueryParameters(context),
  actions: {
    accountQuery: {
      getTopicMessagesQuery: true,
    },
  },
  execute: getTopicMessagesQuery,
});

export default tool;
