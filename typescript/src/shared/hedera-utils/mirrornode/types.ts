import { LedgerId, TokenType } from '@hashgraph/sdk';
import BigNumber from 'bignumber.js';

export const LedgerIdToBaseUrl: Map<string, string> = new Map([
  [LedgerId.MAINNET.toString(), 'https://mainnet-public.mirrornode.hedera.com/api/v1'],
  [LedgerId.TESTNET.toString(), 'https://testnet.mirrornode.hedera.com/api/v1'],
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
  accountPublicKey: string;
  balance: AccountBalanceResponse;
};

export type AccountAPIResponse = {
  accountId: string;
  key: {
    key: string;
    _type: KeyEncryptionType;
  };
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

export type KeyEncryptionType = 'ED25519' | 'ECDSA_SECP256K1';

export type TokenDetails = {
  decimals: string;
  name: string;
  symbol: string;
  maxSupply: number;
  type: TokenType;
};
