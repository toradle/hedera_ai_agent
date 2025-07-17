import { Context } from '../../configuration';
import { getMirrornodeService } from '../../hedera-utils/mirrornode/hedera-mirrornode-utils';
import { topicMessagesQueryParameters } from '../../parameter-schemas/account-query.zod';
import { Client } from '@hashgraph/sdk';
import { z } from 'zod';
import { Tool } from '@/shared/tools';
import { TopicMessage, TopicMessagesQueryParams } from '@/shared/hedera-utils/mirrornode/types';

export const getTopicMessagesQueryPrompt = (_context: Context = {}) => `
This tool will return the messages for a given Hedera topic.

It takes four arguments:
- topicId (str): The topic ID to query.
- startTime (datetime, optional): The start datetime to query. If set, the messages will be returned after this datetime.
- endTime (datetime, optional): The end datetime to query. If set, the messages will be returned before this datetime.
- limit (int, optional): The limit of messages to query. If set, the number of messages to return.
`;

const getTopicMessagesQueryParams = (
  params: z.infer<ReturnType<typeof topicMessagesQueryParameters>>,
): TopicMessagesQueryParams => {
  return {
    topicId: params.topicId,
    lowerTimestamp: params.startTime
      ? `${Math.floor(new Date(params.startTime).getTime() / 1000)}.000000000`
      : '',
    upperTimestamp: params.endTime
      ? `${Math.floor(new Date(params.endTime).getTime() / 1000)}.000000000`
      : '',
    limit: params.limit || 100,
  };
};

const convertMessagesFromBase64ToString = (messages: TopicMessage[]) => {
  return messages.map(message => {
    return {
      ...message,
      message: Buffer.from(message.message, 'base64').toString('utf-8'),
    };
  });
};

export const getTopicMessagesQuery = async (
  client: Client,
  context: Context,
  params: z.infer<ReturnType<typeof topicMessagesQueryParameters>>,
) => {
  console.log('Getting topic messages for topic', params.topicId);
  console.log('Params', JSON.stringify(params, null, 2));
  try {
    const mirrornodeService = getMirrornodeService(context.mirrornodeConfig!);
    const messages = await mirrornodeService.getTopicMessages(getTopicMessagesQueryParams(params));

    return {
      topicId: messages.topicId,
      messages: convertMessagesFromBase64ToString(messages.messages),
    };
  } catch (error) {
    console.error('Error getting topic messages', error);
    if (error instanceof Error) {
      return error.message;
    }
    return 'Failed to get topic messages';
  }
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
