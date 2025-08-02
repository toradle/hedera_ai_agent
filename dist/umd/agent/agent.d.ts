import { AccountId, Client, PublicKey, TransactionId, TransactionReceipt } from '@hashgraph/sdk';
import { AbstractSigner } from '../signer/abstract-signer';
import { SignScheduledTransactionParams, AgentOperationalMode, HederaNetworkType, MirrorNodeConfig } from '../types';
import { IPlugin, HederaTool } from '../plugins';
import { HcsBuilder } from '../builders/hcs/hcs-builder';
import { HtsBuilder } from '../builders/hts/hts-builder';
import { AccountBuilder } from '../builders/account/account-builder';
import { ScsBuilder } from '../builders/scs/scs-builder';
import { QueryBuilder } from '../builders/query/query-builder';
import { ExecuteResult } from '../builders/base-service-builder';
import { ModelCapability } from '../types/model-capability';
import { HederaMirrorNode } from '../services/mirror-node';
import { Logger } from '../utils/logger';
export interface PluginConfig {
    plugins?: IPlugin[];
    appConfig?: Record<string, unknown> | undefined;
}
/**
 * HederaAgentKit provides a simplified interface for interacting with the Hedera network,
 * abstracting away the complexities of the underlying SDK for common use cases.
 * It supports various operations related to HCS, HTS, and HBAR transfers through a Signer and Builders.
 * The kit must be initialized using the async `initialize()` method before its tools can be accessed.
 */
export declare class HederaAgentKit {
    readonly client: Client;
    readonly network: HederaNetworkType;
    readonly signer: AbstractSigner;
    readonly mirrorNode: HederaMirrorNode;
    private loadedPlugins;
    private aggregatedTools;
    private pluginConfigInternal?;
    private isInitialized;
    readonly logger: Logger;
    operationalMode: AgentOperationalMode;
    userAccountId?: string | undefined;
    scheduleUserTransactionsInBytesMode: boolean;
    modelCapability: ModelCapability;
    modelName?: string | undefined;
    constructor(signer: AbstractSigner, pluginConfigInput?: PluginConfig | undefined, initialOperationalMode?: AgentOperationalMode, userAccountId?: string, scheduleUserTransactionsInBytesMode?: boolean, modelCapability?: ModelCapability, modelName?: string, mirrorNodeConfig?: MirrorNodeConfig, disableLogging?: boolean);
    /**
     * Initializes the HederaAgentKit, including loading any configured plugins and aggregating tools.
     * This method must be called before `getAggregatedLangChainTools()` can be used.
     */
    initialize(): Promise<void>;
    getOperator(): Promise<{
        id: AccountId;
        publicKey: PublicKey;
    }>;
    /**
     * Retrieves the aggregated list of LangChain tools from the kit, core tools, and plugins.
     * The HederaAgentKit instance must be initialized via `await kit.initialize()` before calling this method.
     * @returns {Tool[]} An array of LangChain Tool objects.
     * @throws {Error} If the kit has not been initialized.
     */
    getAggregatedLangChainTools(): HederaTool[];
    /**
     * Provides access to the Hedera Consensus Service (HCS) builder.
     * @returns {HcsBuilder} An instance of HcsBuilder.
     * @throws {Error} If HederaAgentKit has not been initialized via `await initialize()`.
     */
    hcs(): HcsBuilder;
    /**
     * Provides access to the Hedera Token Service (HTS) builder.
     * @returns {HtsBuilder} An instance of HtsBuilder.
     * @throws {Error} If HederaAgentKit has not been initialized via `await initialize()`.
     */
    hts(): HtsBuilder;
    /**
     * Provides access to the Hedera Account Service builder.
     * @returns {AccountBuilder} An instance of AccountBuilder.
     * @throws {Error} If HederaAgentKit has not been initialized via `await initialize()`.
     */
    accounts(): AccountBuilder;
    /**
     * Provides access to the Hedera Smart Contract Service (SCS) builder.
     * @returns {ScsBuilder} An instance of ScsBuilder.
     * @throws {Error} If HederaAgentKit has not been initialized via `await initialize()`.
     */
    scs(): ScsBuilder;
    /**
     * Provides access to the Hedera Query builder for read-only operations.
     * @returns {QueryBuilder} An instance of QueryBuilder.
     * @throws {Error} If HederaAgentKit has not been initialized via `await initialize()`.
     */
    query(): QueryBuilder;
    /**
     * Retrieves the transaction receipt for a given transaction ID string.
     * @param {string} transactionIdString - The transaction ID (e.g., "0.0.xxxx@16666666.77777777").
     * @returns {Promise<TransactionReceipt>} A promise that resolves to the TransactionReceipt.
     * @throws {Error} If the transaction ID is invalid or receipt cannot be fetched.
     */
    getTransactionReceipt(transactionIdInput: TransactionId | string): Promise<TransactionReceipt>;
    /**
     * Signs a scheduled transaction.
     * The transaction is signed by the operator configured in the current signer.
     * @param {SignScheduledTransactionParams} params - Parameters for the ScheduleSign transaction.
     * @returns {Promise<ExecuteResult>} A promise that resolves to an object indicating success, receipt, and transactionId.
     * @throws {Error} If the execution fails.
     */
    signScheduledTransaction(params: SignScheduledTransactionParams): Promise<ExecuteResult>;
}
export default HederaAgentKit;
