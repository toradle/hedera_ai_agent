import { PublicKey } from '@hashgraph/sdk';
import { Logger } from '../../utils/logger';
import { AccountResponse, CustomFees, ScheduleInfo, TokenInfoResponse, TopicResponse, Transaction as HederaTransaction, AccountTokenBalance, NftDetail, ContractCallQueryResponse, TokenAirdrop, Block, ContractResult, ContractLog, ContractAction, ContractEntity, ContractState, NftInfo, NetworkInfo, NetworkFees, NetworkSupply, NetworkStake, OpcodesResponse, HCSMessage } from './types';
import { HederaNetworkType } from '../../types';
/**
 * Configuration for retry attempts.
 */
export interface RetryConfig {
    maxRetries?: number;
    initialDelayMs?: number;
    maxDelayMs?: number;
    backoffFactor?: number;
}
/**
 * Configuration for custom mirror node providers.
 *
 * @example
 * // Using HGraph with API key in URL
 * const config = {
 *   customUrl: 'https://mainnet.hedera.api.hgraph.dev/v1/<API-KEY>',
 *   apiKey: 'your-api-key-here'
 * };
 *
 * @example
 * // Using custom provider with API key in headers
 * const config = {
 *   customUrl: 'https://custom-mirror-node.com',
 *   apiKey: 'your-api-key',
 *   headers: {
 *     'X-Custom-Header': 'value'
 *   }
 * };
 */
export interface MirrorNodeConfig {
    /** Custom mirror node URL. Can include <API-KEY> placeholder for URL-based API keys. */
    customUrl?: string;
    /** API key for authentication. Will be used in both Authorization header and URL replacement. */
    apiKey?: string;
    /** Additional custom headers to include with requests. */
    headers?: Record<string, string>;
}
export declare class HederaMirrorNode {
    private network;
    private baseUrl;
    private logger;
    private isServerEnvironment;
    private apiKey?;
    private customHeaders;
    private maxRetries;
    private initialDelayMs;
    private maxDelayMs;
    private backoffFactor;
    constructor(network: HederaNetworkType, logger?: Logger, config?: MirrorNodeConfig);
    /**
     * Configures the retry mechanism for API requests.
     * @param config The retry configuration.
     */
    configureRetry(config: RetryConfig): void;
    /**
     * Updates the mirror node configuration.
     * @param config The new mirror node configuration.
     */
    configureMirrorNode(config: MirrorNodeConfig): void;
    /**
     * Constructs a full URL for API requests, handling custom providers with API keys in the path.
     * @param endpoint The API endpoint (e.g., '/api/v1/accounts/0.0.123')
     * @returns The full URL for the request
     */
    private constructUrl;
    /**
     * Returns the base URL for the Hedera mirror node based on the network type
     * @returns The mirror node base URL
     * @private
     */
    private getMirrorNodeUrl;
    getBaseUrl(): string;
    /**
     * Retrieves the public key for a given account ID from the mirror node.
     * @param accountId The ID of the account to retrieve the public key for.
     * @returns A promise that resolves to the public key for the given account.
     * @throws An error if the account ID is invalid or the public key cannot be retrieved.
     */
    getPublicKey(accountId: string): Promise<PublicKey>;
    /**
     * Retrieves the memo for a given account ID from the mirror node.
     * @param accountId The ID of the account to retrieve the memo for.
     * @returns A promise that resolves to the memo for the given account.
     * @throws An error if the account ID is invalid or the memo cannot be retrieved.
     */
    getAccountMemo(accountId: string): Promise<string | null>;
    /**
     * Retrieves topic information for a given topic ID from the mirror node.
     * @param topicId The ID of the topic to retrieve information for.
     * @returns A promise that resolves to the topic information.
     * @throws An error if the topic ID is invalid or the information cannot be retrieved.
     */
    getTopicInfo(topicId: string): Promise<TopicResponse>;
    /**
     * Retrieves custom fees for a given topic ID from the mirror node.
     * @param topicId The ID of the topic to retrieve custom fees for.
     * @returns A promise that resolves to the custom fees for the given topic.
     * @throws An error if the topic ID is invalid or the custom fees cannot be retrieved.
     */
    getTopicFees(topicId: string): Promise<CustomFees | null>;
    /**
     * Retrieves the current HBAR price from the mirror node.
     * @param date The date to retrieve the HBAR price for.
     * @returns A promise that resolves to the HBAR price for the given date.
     * @throws An error if the date is invalid or the price cannot be retrieved.
     */
    getHBARPrice(date: Date): Promise<number | null>;
    /**
     * Retrieves token information for a given token ID from the mirror node.
     * @param tokenId The ID of the token to retrieve information for.
     * @returns A promise that resolves to the token information.
     * @throws An error if the token ID is invalid or the information cannot be retrieved.
     */
    getTokenInfo(tokenId: string): Promise<TokenInfoResponse | null>;
    /**
     * Retrieves messages for a given topic ID from the mirror node. Supports filtering by sequence number
     * based on the OpenAPI specification.
     * @param topicId The ID of the topic to retrieve messages for.
     * @param options Optional filtering parameters.
     * @returns A promise that resolves to the messages for the given topic.
     */
    getTopicMessages(topicId: string, options?: {
        sequenceNumber?: string | number;
        limit?: number;
        order?: 'asc' | 'desc';
    }): Promise<HCSMessage[]>;
    /**
     * Requests account information for a given account ID from the mirror node.
     * @param accountId The ID of the account to retrieve information for.
     * @returns A promise that resolves to the account information.
     * @throws An error if the account ID is invalid or the information cannot be retrieved.
     */
    requestAccount(accountId: string): Promise<AccountResponse>;
    /**
     * Checks if a user has access to a given key list.
     * @param keyBytes The key list to check access for.
     * @param userPublicKey The public key of the user to check access for.
     * @returns A promise that resolves to true if the user has access, false otherwise.
     */
    checkKeyListAccess(keyBytes: Buffer, userPublicKey: PublicKey): Promise<boolean>;
    /**
     * Evaluates the access of a given key to a user's public key.
     * @param key The key to evaluate access for.
     * @param userPublicKey The public key of the user to evaluate access for.
     * @returns A promise that resolves to true if the key has access, false otherwise.
     */
    private evaluateKeyAccess;
    /**
     * Evaluates the access of a given key list to a user's public key.
     * @param keyList The key list to evaluate access for.
     * @param userPublicKey The public key of the user to evaluate access for.
     * @returns A promise that resolves to true if the key list has access, false otherwise.
     */
    private evaluateKeyList;
    /**
     * Compares an Ed25519 key with a user's public key.
     * @param keyData The Ed25519 key data to compare.
     * @param userPublicKey The public key of the user to compare with.
     * @returns A boolean indicating whether the key matches the user's public key.
     */
    private compareEd25519Key;
    /**
     * Retrieves information about a scheduled transaction
     * @param scheduleId The ID of the scheduled transaction
     * @returns A promise that resolves to the scheduled transaction information
     */
    getScheduleInfo(scheduleId: string): Promise<ScheduleInfo | null>;
    /**
     * Checks the status of a scheduled transaction
     * @param scheduleId The schedule ID to check
     * @returns Status of the scheduled transaction
     */
    getScheduledTransactionStatus(scheduleId: string): Promise<{
        executed: boolean;
        executedDate: Date | undefined;
        deleted: boolean;
    }>;
    /**
     * Retrieves details for a given transaction ID or hash from the mirror node.
     * @param transactionIdOrHash The ID or hash of the transaction.
     * @returns A promise that resolves to the transaction details.
     * @throws An error if the transaction ID/hash is invalid or details cannot be retrieved.
     */
    getTransaction(transactionIdOrHash: string): Promise<HederaTransaction | null>;
    /**
     * Private helper to make GET requests with retry logic using Axios.
     */
    private _requestWithRetry;
    /**
     * Private helper to make fetch requests with retry logic.
     */
    private _fetchWithRetry;
    /**
     * Retrieves the numerical balance (in HBAR) for a given account ID.
     * @param accountId The ID of the account.
     * @returns A promise that resolves to the HBAR balance or null if an error occurs.
     */
    getAccountBalance(accountId: string): Promise<number | null>;
    /**
     * Retrieves messages for a given topic ID with optional filters.
     * @param topicId The ID of the topic.
     * @param sequenceNumber Filter by sequence number (e.g., "gt:10", "lte:20").
     * @param startTime Filter by consensus timestamp (e.g., "gt:1629400000.000000000").
     * @param endTime Filter by consensus timestamp (e.g., "lt:1629500000.000000000").
     * @param limit The maximum number of messages to return.
     * @returns A promise that resolves to an array of HCSMessages or null.
     */
    getTopicMessagesByFilter(topicId: string, options?: {
        sequenceNumber?: string;
        startTime?: string;
        endTime?: string;
        limit?: number;
        order?: 'asc' | 'desc';
    }): Promise<HCSMessage[] | null>;
    /**
     * Retrieves token balances for a given account ID.
     * @param accountId The ID of the account.
     * @param limit The maximum number of tokens to return.
     * @returns A promise that resolves to an array of AccountTokenBalance or null.
     */
    getAccountTokens(accountId: string, limit?: number): Promise<AccountTokenBalance[] | null>;
    /**
     * Retrieves transaction details by consensus timestamp.
     * @param timestamp The consensus timestamp of the transaction (e.g., "1629400000.000000000").
     * @returns A promise that resolves to the transaction details or null.
     */
    getTransactionByTimestamp(timestamp: string): Promise<HederaTransaction[]>;
    /**
     * Retrieves NFTs for a given account ID, optionally filtered by token ID.
     * @param accountId The ID of the account.
     * @param tokenId Optional ID of the token to filter NFTs by.
     * @param limit The maximum number of NFTs to return per page (API has its own max).
     * @returns A promise that resolves to an array of NftDetail or null.
     */
    getAccountNfts(accountId: string, tokenId?: string, limit?: number): Promise<NftDetail[] | null>;
    /**
     * Validates NFT ownership by checking if a specific serial number of a token ID exists for an account.
     * @param accountId The ID of the account.
     * @param tokenId The ID of the NFT's token.
     * @param serialNumber The serial number of the NFT.
     * @returns A promise that resolves to the NftDetail if owned, or null otherwise.
     */
    validateNFTOwnership(accountId: string, tokenId: string, serialNumber: number): Promise<NftDetail | null>;
    /**
     * Performs a read-only query against a smart contract (eth_call like).
     * @param contractIdOrAddress The contract ID (e.g., "0.0.123") or EVM address (e.g., "0x...").
     * @param functionSelector The function selector and encoded parameters (e.g., "0xabcdef12...").
     * @param payerAccountId The account ID of the payer (not strictly payer for read-only, but often required as 'from').
     * @param estimate Whether this is an estimate call. Mirror node might not support this directly in /contracts/call for true estimation.
     * @param block Block parameter, e.g., "latest", "pending", or block number.
     * @param value The value in tinybars to send with the call (for payable view/pure functions, usually 0).
     * @returns A promise that resolves to the contract call query response or null.
     */
    readSmartContractQuery(contractIdOrAddress: string, functionSelector: string, payerAccountId: string, options?: {
        estimate?: boolean;
        block?: string;
        value?: number;
        gas?: number;
        gasPrice?: number;
    }): Promise<ContractCallQueryResponse | null>;
    /**
     * Retrieves outstanding token airdrops sent by an account.
     * @param accountId The ID of the account that sent the airdrops.
     * @param options Optional parameters for filtering airdrops.
     * @returns A promise that resolves to an array of TokenAirdrop or null.
     */
    getOutstandingTokenAirdrops(accountId: string, options?: {
        limit?: number;
        order?: 'asc' | 'desc';
        receiverId?: string;
        serialNumber?: string;
        tokenId?: string;
    }): Promise<TokenAirdrop[] | null>;
    /**
     * Retrieves pending token airdrops received by an account.
     * @param accountId The ID of the account that received the airdrops.
     * @param options Optional parameters for filtering airdrops.
     * @returns A promise that resolves to an array of TokenAirdrop or null.
     */
    getPendingTokenAirdrops(accountId: string, options?: {
        limit?: number;
        order?: 'asc' | 'desc';
        senderId?: string;
        serialNumber?: string;
        tokenId?: string;
    }): Promise<TokenAirdrop[] | null>;
    /**
     * Retrieves blocks from the network.
     * @param options Optional parameters for filtering blocks.
     * @returns A promise that resolves to an array of Block or null.
     */
    getBlocks(options?: {
        limit?: number;
        order?: 'asc' | 'desc';
        timestamp?: string;
        blockNumber?: string;
    }): Promise<Block[] | null>;
    /**
     * Retrieves a specific block by number or hash.
     * @param blockNumberOrHash The block number or hash.
     * @returns A promise that resolves to a Block or null.
     */
    getBlock(blockNumberOrHash: string): Promise<Block | null>;
    /**
     * Retrieves contract entities from the network.
     * @param options Optional parameters for filtering contracts.
     * @returns A promise that resolves to an array of ContractEntity or null.
     */
    getContracts(options?: {
        contractId?: string;
        limit?: number;
        order?: 'asc' | 'desc';
    }): Promise<ContractEntity[] | null>;
    /**
     * Retrieves a specific contract by ID or address.
     * @param contractIdOrAddress The contract ID or EVM address.
     * @param timestamp Optional timestamp for historical data.
     * @returns A promise that resolves to a ContractEntity or null.
     */
    getContract(contractIdOrAddress: string, timestamp?: string): Promise<ContractEntity | null>;
    /**
     * Retrieves contract results from the network.
     * @param options Optional parameters for filtering contract results.
     * @returns A promise that resolves to an array of ContractResult or null.
     */
    getContractResults(options?: {
        from?: string;
        blockHash?: string;
        blockNumber?: string;
        internal?: boolean;
        limit?: number;
        order?: 'asc' | 'desc';
        timestamp?: string;
        transactionIndex?: number;
    }): Promise<ContractResult[] | null>;
    /**
     * Retrieves a specific contract result by transaction ID or hash.
     * @param transactionIdOrHash The transaction ID or hash.
     * @param nonce Optional nonce filter.
     * @returns A promise that resolves to a ContractResult or null.
     */
    getContractResult(transactionIdOrHash: string, nonce?: number): Promise<ContractResult | null>;
    /**
     * Retrieves contract results for a specific contract.
     * @param contractIdOrAddress The contract ID or EVM address.
     * @param options Optional parameters for filtering.
     * @returns A promise that resolves to an array of ContractResult or null.
     */
    getContractResultsByContract(contractIdOrAddress: string, options?: {
        blockHash?: string;
        blockNumber?: string;
        from?: string;
        internal?: boolean;
        limit?: number;
        order?: 'asc' | 'desc';
        timestamp?: string;
        transactionIndex?: number;
    }): Promise<ContractResult[] | null>;
    /**
     * Retrieves contract state for a specific contract.
     * @param contractIdOrAddress The contract ID or EVM address.
     * @param options Optional parameters for filtering.
     * @returns A promise that resolves to an array of ContractState or null.
     */
    getContractState(contractIdOrAddress: string, options?: {
        limit?: number;
        order?: 'asc' | 'desc';
        slot?: string;
        timestamp?: string;
    }): Promise<ContractState[] | null>;
    /**
     * Retrieves contract actions for a specific transaction.
     * @param transactionIdOrHash The transaction ID or hash.
     * @param options Optional parameters for filtering.
     * @returns A promise that resolves to an array of ContractAction or null.
     */
    getContractActions(transactionIdOrHash: string, options?: {
        index?: string;
        limit?: number;
        order?: 'asc' | 'desc';
    }): Promise<ContractAction[] | null>;
    /**
     * Retrieves contract logs from the network.
     * @param options Optional parameters for filtering logs.
     * @returns A promise that resolves to an array of ContractLog or null.
     */
    getContractLogs(options?: {
        index?: string;
        limit?: number;
        order?: 'asc' | 'desc';
        timestamp?: string;
        topic0?: string;
        topic1?: string;
        topic2?: string;
        topic3?: string;
        transactionHash?: string;
    }): Promise<ContractLog[] | null>;
    /**
     * Retrieves contract logs for a specific contract.
     * @param contractIdOrAddress The contract ID or EVM address.
     * @param options Optional parameters for filtering logs.
     * @returns A promise that resolves to an array of ContractLog or null.
     */
    getContractLogsByContract(contractIdOrAddress: string, options?: {
        index?: string;
        limit?: number;
        order?: 'asc' | 'desc';
        timestamp?: string;
        topic0?: string;
        topic1?: string;
        topic2?: string;
        topic3?: string;
    }): Promise<ContractLog[] | null>;
    /**
     * Retrieves NFT information by token ID and serial number.
     * @param tokenId The token ID.
     * @param serialNumber The serial number of the NFT.
     * @returns A promise that resolves to an NftInfo or null.
     */
    getNftInfo(tokenId: string, serialNumber: number): Promise<NftInfo | null>;
    /**
     * Retrieves NFTs for a specific token.
     * @param tokenId The token ID.
     * @param options Optional parameters for filtering NFTs.
     * @returns A promise that resolves to an array of NftInfo or null.
     */
    getNftsByToken(tokenId: string, options?: {
        accountId?: string;
        limit?: number;
        order?: 'asc' | 'desc';
        serialNumber?: string;
    }): Promise<NftInfo[] | null>;
    /**
     * Retrieves network information.
     * @returns A promise that resolves to NetworkInfo or null.
     */
    getNetworkInfo(): Promise<NetworkInfo | null>;
    /**
     * Retrieves network fees.
     * @param timestamp Optional timestamp for historical fees.
     * @returns A promise that resolves to NetworkFees or null.
     */
    getNetworkFees(timestamp?: string): Promise<NetworkFees | null>;
    /**
     * Retrieves network supply information.
     * @param timestamp Optional timestamp for historical supply data.
     * @returns A promise that resolves to NetworkSupply or null.
     */
    getNetworkSupply(timestamp?: string): Promise<NetworkSupply | null>;
    /**
     * Retrieves network stake information.
     * @param timestamp Optional timestamp for historical stake data.
     * @returns A promise that resolves to NetworkStake or null.
     */
    getNetworkStake(timestamp?: string): Promise<NetworkStake | null>;
    /**
     * Retrieves opcode traces for a specific transaction.
     * @param transactionIdOrHash The transaction ID or hash.
     * @param options Optional parameters for trace details.
     * @returns A promise that resolves to an OpcodesResponse or null.
     */
    getOpcodeTraces(transactionIdOrHash: string, options?: {
        stack?: boolean;
        memory?: boolean;
        storage?: boolean;
    }): Promise<OpcodesResponse | null>;
}
