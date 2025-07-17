import { LedgerId } from '@hashgraph/sdk';
import BigNumber from 'bignumber.js';

export const LedgerIdToBaseUrl: Map<LedgerId, string> = new Map([
  [LedgerId.MAINNET, 'https://mainnet-public.mirrornode.hedera.com/api/v1'],
  [LedgerId.TESTNET, 'https://testnet.mirrornode.hedera.com/api/v1'],
]);

export type AccountTokenBalancesQueryParams = {
  accountId: string;
  tokenId?: string;
};

export type TopicMessagesQueryParams = {
  topicId: string;
  lowerTimestamp: string;
  upperTimestamp: string;
  limit: number;
};

export type TopicMessage = {
  topicId: string;
  message: string;
  timestamp: string;
};

export type TopicMessagesResponse = {
  topicId: string;
  messages: TopicMessage[];
};

export type TokenBalance = {
  account: string;
  balance: number;
  decimals: number;
};
export type TokenBalancesResponse = {
  tokens: TokenBalance[];
};
export type AccountResponse = {
  accountId: string;
  balance: AccountBalanceResponse;
};

export type AccountAPIResponse = {
  accountId: string;
  balance: AccountBalanceResponse;
};

export type AccountBalanceResponse = {
  balance: BigNumber;
  timestamp: string;
  tokens: TokenBalance[];
};

export type TopicMessagesAPIResponse = {
  messages: TopicMessage[];
  links: {
    next: string | null;
  };
};
