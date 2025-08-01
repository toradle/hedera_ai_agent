import { Plugin } from '@/shared/plugin';
import { Context } from '@/shared/configuration';
import getHbarBalanceQuery, {
  GET_HBAR_BALANCE_QUERY_TOOL,
} from '@/plugins/core-queries-plugin/tools/queries/get-hbar-balance-query';
import getAccountQuery, {
  GET_ACCOUNT_QUERY_TOOL,
} from '@/plugins/core-queries-plugin/tools/queries/get-account-query';
import getAccountTokenBalancesQuery, {
  GET_ACCOUNT_TOKEN_BALANCES_QUERY_TOOL,
} from '@/plugins/core-queries-plugin/tools/queries/get-account-token-balances-query';
import getTopicMessagesQuery, {
  GET_TOPIC_MESSAGES_QUERY_TOOL,
} from '@/plugins/core-queries-plugin/tools/queries/get-topic-messages-query';

export const coreQueriesPlugin: Plugin = {
  name: 'core-queries-plugin',
  version: '1.0.0',
  description: 'A plugin for the Hedera Queries Service',
  tools: (context: Context) => {
    return [
      getHbarBalanceQuery(context),
      getAccountQuery(context),
      getAccountTokenBalancesQuery(context),
      getTopicMessagesQuery(context),
    ];
  },
};

export const coreQueriesPluginToolNames = {
  GET_HBAR_BALANCE_QUERY_TOOL,
  GET_ACCOUNT_QUERY_TOOL,
  GET_ACCOUNT_TOKEN_BALANCES_QUERY_TOOL,
  GET_TOPIC_MESSAGES_QUERY_TOOL,
} as const;

export default { coreQueriesPlugin, coreQueriesPluginToolNames };
