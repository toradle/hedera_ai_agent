import { Context } from '@/shared';
import { Plugin } from '@/shared/plugin';
import createTopicTool, {
  CREATE_TOPIC_TOOL,
} from '@/plugins/core-consensus-plugin/tools/consensus/create-topic';
import submitTopicMessageTool, {
  SUBMIT_TOPIC_MESSAGE_TOOL,
} from '@/plugins/core-consensus-plugin/tools/consensus/submit-topic-message';

export const coreConsensusPlugin: Plugin = {
  name: 'core-consensus-plugin',
  version: '1.0.0',
  description: 'A plugin for the Hedera Consensus Service',
  tools: (context: Context) => {
    return [createTopicTool(context), submitTopicMessageTool(context)];
  },
};

export const coreConsensusPluginToolNames = {
  CREATE_TOPIC_TOOL,
  SUBMIT_TOPIC_MESSAGE_TOOL,
} as const;

export default { coreConsensusPlugin, coreConsensusPluginToolNames };
