import { TopicResponse, CustomFees, TokenInfoResponse, HCSMessage, AccountResponse, ScheduleInfo, Transaction as HederaTransaction, AccountTokenBalance, NftDetail, NftInfo, ContractCallQueryResponse, TokenAirdrop, Block, ContractResult, ContractLog, ContractAction, NetworkStake, NetworkSupply, ContractEntity, ContractState, NetworkInfo, NetworkFees, OpcodesResponse } from '../../services/mirror-node';
import { HederaAgentKit } from '../../agent';
import { TopicId, AccountId, PublicKey } from '@hashgraph/sdk';
/**
 * Builder class for Hedera query operations.
 * Provides a fluent interface for querying the Hedera network via Mirror Node.
 */
export declare class QueryBuilder {
    private hederaKit;
    private mirrorNode;
    constructor(hederaKit: HederaAgentKit);
    /**
     * Get topic information for a given topic ID
     */
    getTopicInfo(topicId: string | TopicId): Promise<TopicResponse>;
    /**
     * Get messages for a given topic ID
     */
    getTopicMessages(topicId: string | TopicId): Promise<HCSMessage[]>;
    /**
     * Get filtered topic messages with optional parameters
     */
    getTopicMessagesByFilter(topicId: string | TopicId, options?: {
        sequenceNumber?: string;
        startTime?: string;
        endTime?: string;
        limit?: number;
        order?: 'asc' | 'desc';
    }): Promise<HCSMessage[] | null>;
    /**
     * Get account information for a given account ID
     */
    getAccountInfo(accountId: string | AccountId): Promise<AccountResponse>;
    /**
     * Get account balance in HBAR for a given account ID
     */
    getAccountBalance(accountId: string | AccountId): Promise<number | null>;
    /**
     * Get account memo for a given account ID
     */
    getAccountMemo(accountId: string | AccountId): Promise<string | null>;
    /**
     * Get token information for a given token ID
     */
    getTokenInfo(tokenId: string): Promise<TokenInfoResponse | null>;
    /**
     * Get token balances for a given account ID
     */
    getAccountTokens(accountId: string | AccountId, limit?: number): Promise<AccountTokenBalance[] | null>;
    /**
     * Get NFTs for a given account ID
     */
    getAccountNfts(accountId: string | AccountId, tokenId?: string, limit?: number): Promise<NftDetail[] | null>;
    /**
     * Validate NFT ownership
     */
    validateNftOwnership(accountId: string | AccountId, tokenId: string, serialNumber: number): Promise<NftDetail | null>;
    /**
     * Get transaction details by ID or hash
     */
    getTransaction(transactionIdOrHash: string): Promise<HederaTransaction | null>;
    /**
     * Get transaction details by consensus timestamp
     */
    getTransactionByTimestamp(timestamp: string): Promise<HederaTransaction[]>;
    /**
     * Get schedule information for a given schedule ID
     */
    getScheduleInfo(scheduleId: string): Promise<ScheduleInfo | null>;
    /**
     * Get scheduled transaction status
     */
    getScheduledTransactionStatus(scheduleId: string): Promise<{
        executed: boolean;
        executedDate?: Date | undefined;
        deleted: boolean;
    }>;
    /**
     * Get HBAR price for a given date
     */
    getHbarPrice(date: Date): Promise<number | null>;
    /**
     * Read smart contract query (view/pure functions)
     */
    readSmartContract(contractIdOrAddress: string, functionSelector: string, payerAccountId: string | AccountId, options?: {
        estimate?: boolean;
        block?: string;
        value?: number;
        gas?: number;
        gasPrice?: number;
    }): Promise<ContractCallQueryResponse | null>;
    /**
     * Get public key for a given account ID
     */
    getPublicKey(accountId: string | AccountId): Promise<PublicKey>;
    /**
     * Get custom fees for a given topic ID
     */
    getTopicFees(topicId: string | TopicId): Promise<CustomFees | null>;
    /**
     * Check if a user has access to a given key list
     */
    checkKeyListAccess(keyBytes: Buffer, userPublicKey: PublicKey): Promise<boolean>;
    /**
     * Get outstanding token airdrops sent by an account
     */
    getOutstandingTokenAirdrops(accountIdOrArgs: string | AccountId | {
        accountId: string;
        limit?: number | undefined;
        order?: 'asc' | 'desc' | undefined;
        receiverId?: string | undefined;
        serialNumber?: string | undefined;
        tokenId?: string | undefined;
    }, options?: {
        limit?: number;
        order?: 'asc' | 'desc';
        receiverId?: string;
        serialNumber?: string;
        tokenId?: string;
    }): Promise<TokenAirdrop[] | null>;
    /**
     * Get pending token airdrops received by an account
     */
    getPendingTokenAirdrops(accountIdOrArgs: string | AccountId | {
        accountId: string;
        limit?: number | undefined;
        order?: 'asc' | 'desc' | undefined;
        senderId?: string | undefined;
        serialNumber?: string | undefined;
        tokenId?: string | undefined;
    }, options?: {
        limit?: number;
        order?: 'asc' | 'desc';
        senderId?: string;
        serialNumber?: string;
        tokenId?: string;
    }): Promise<TokenAirdrop[] | null>;
    /**
     * Get blocks with optional filtering
     */
    getBlocks(options?: {
        blockNumber?: string | undefined;
        timestamp?: string | undefined;
        limit?: number | undefined;
        order?: 'asc' | 'desc' | undefined;
    }): Promise<Block[] | null>;
    /**
     * Get a specific block by number or hash
     */
    getBlock(blockNumberOrHash: string): Promise<Block | null>;
    /**
     * Get contract results with optional filtering
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
     * Get contract result by transaction ID
     */
    getContractResult(transactionIdOrHash: string, nonce?: number): Promise<ContractResult | null>;
    /**
     * Get contract logs with optional filtering
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
     * Get contract actions for a transaction
     */
    getContractActions(transactionIdOrHash: string, options?: {
        index?: string;
        limit?: number;
        order?: 'asc' | 'desc';
    }): Promise<ContractAction[] | null>;
    /**
     * Get NFT information by token ID and serial number
     */
    getNftInfo(tokenId: string, serialNumber: number): Promise<NftInfo | null>;
    /**
     * Get all NFTs for a token ID
     */
    getNftsByToken(tokenId: string, options?: {
        accountId?: string;
        limit?: number;
        order?: 'asc' | 'desc';
        serialNumber?: string;
    }): Promise<NftInfo[] | null>;
    /**
     * Get network stake information
     */
    getNetworkStake(timestamp?: string): Promise<NetworkStake | null>;
    /**
     * Get network supply information
     */
    getNetworkSupply(timestamp?: string): Promise<NetworkSupply | null>;
    /**
     * Get contract entities from the network
     */
    getContracts(options?: {
        contractId?: string | undefined;
        limit?: number | undefined;
        order?: 'asc' | 'desc' | undefined;
    }): Promise<ContractEntity[] | null>;
    /**
     * Get a specific contract by ID or address
     */
    getContract(contractIdOrAddress: string, timestamp?: string, includeBytecode?: boolean): Promise<ContractEntity | null>;
    /**
     * Get contract results by contract
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
     * Get contract state for a specific contract
     */
    getContractState(contractIdOrAddress: string, options?: {
        limit?: number;
        order?: 'asc' | 'desc';
        slot?: string;
        timestamp?: string;
    }): Promise<ContractState[] | null>;
    /**
     * Get contract logs by contract
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
     * Get network information
     */
    getNetworkInfo(): Promise<NetworkInfo | null>;
    /**
     * Get network fees
     */
    getNetworkFees(timestamp?: string): Promise<NetworkFees | null>;
    /**
     * Get opcode traces for a specific transaction
     */
    getOpcodeTraces(transactionIdOrHash: string, options?: {
        stack?: boolean;
        memory?: boolean;
        storage?: boolean;
    }): Promise<OpcodesResponse | null>;
}
