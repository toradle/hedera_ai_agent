import { z } from 'zod';
import { Context } from '../configuration';

export const createTopicParameters = (_context: Context = {}) => {
  return z.object({
    isAdminKey: z
      .boolean()
      .optional()
      .default(false)
      .describe('Whether to set an admin key for the topic (optional)'),
    adminKey: z.string().optional().describe('Admin key for the topic (optional)'),
    isSubmitKey: z
      .boolean()
      .optional()
      .default(false)
      .describe('Whether to set a submit key for the topic (optional)'),
    submitKey: z.string().optional().describe('Submit key for the topic (optional)'),
    topicMemo: z.string().optional().describe('Memo for the topic (optional)'),
  });
};

export const submitTopicMessageParameters = (_context: Context = {}) => {
  return z.object({
    topicId: z.string().describe('The ID of the topic to submit the message to'),
    message: z.string().describe('The message to submit to the topic'),
    sender: z.string().optional().describe('The account ID of the sender (optional)'),
  });
};
