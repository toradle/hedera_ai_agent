import { Context } from '@/shared/configuration';
import { getMirrornodeService } from '@/shared/hedera-utils/mirrornode/hedera-mirrornode-utils';
import { topicMessagesQueryParameters } from '@/shared/parameter-schemas/account-query.zod';
import { Client } from '@hashgraph/sdk';
import { z } from 'zod';
import { Tool } from '@/shared/tools';
import { TopicMessage, TopicMessagesQueryParams } from '@/shared/hedera-utils/mirrornode/types';
import { PromptGenerator } from '@/shared/utils/prompt-generator';

export const getTopicMessagesQueryPrompt = (context: Context = {}) => {
  const contextSnippet = PromptGenerator.getContextSnippet(context);
  const usageInstructions = PromptGenerator.getParameterUsageInstructions();

  return `
${contextSnippet}

This tool will return the messages for a given Hedera topic.

Parameters:
- topicId (str, required): The topic ID to query
- startTime (datetime, optional): The start datetime to query. If set, the messages will be returned after this datetime
- endTime (datetime, optional): The end datetime to query. If set, the messages will be returned before this datetime
- limit (int, optional): The limit of messages to query. If set, the number of messages to return
${usageInstructions}
`;
};

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
  try {
    const mirrornodeService = getMirrornodeService(context.mirrornodeService!, client.ledgerId!);
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

export const GET_TOPIC_MESSAGES_QUERY_TOOL = 'get_topic_messages_query_tool';

const tool = (context: Context): Tool => ({
  method: GET_TOPIC_MESSAGES_QUERY_TOOL,
  name: 'Get Topic Messages',
  description: getTopicMessagesQueryPrompt(context),
  parameters: topicMessagesQueryParameters(context),
  execute: getTopicMessagesQuery,
});

export default tool;
