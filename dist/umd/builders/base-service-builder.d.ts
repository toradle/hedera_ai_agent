import { AccountId, Transaction, TransactionId, TransactionReceipt, ScheduleId, Key, PublicKey, Long } from '@hashgraph/sdk';
import { AbstractSigner } from '../signer/abstract-signer';
import { Logger } from '../utils/logger';
import { HederaAgentKit } from '../agent/agent';
/**
 * Defines the structure for the result of an execute operation.
 */
export interface ExecuteResult {
    success: boolean;
    receipt?: TransactionReceipt;
    scheduleId?: ScheduleId | string | undefined;
    error?: string;
    transactionId?: string | undefined;
}
/**
 * BaseServiceBuilder provides common functionality for service-specific builders.
 * It manages the current transaction being built and offers common execution and byte generation methods.
 */
export declare abstract class BaseServiceBuilder {
    protected readonly hederaKit: HederaAgentKit;
    protected currentTransaction: Transaction | null;
    protected logger: Logger;
    protected kit: HederaAgentKit;
    protected notes: string[];
    /**
     * @param {HederaAgentKit} kit - The HederaAgentKit instance
     */
    constructor(hederaKit: HederaAgentKit);
    /**
     * Helper method to get the effective sender account to use for transactions.
     * In user-centric contexts, this will be the user's account. Otherwise, it falls back to the signer's account.
     * @returns {AccountId} The account ID to use as sender
     */
    protected getEffectiveSenderAccountId(): AccountId;
    /**
     * Helper method to determine if a transaction is a user-initiated transfer.
     * Used for properly constructing transfer arrays.
     * @param {boolean} isUserInitiated Whether this is a user-initiated transfer
     * @returns {AccountId} The account that should be used as the sender
     */
    protected getTransferSourceAccount(isUserInitiated?: boolean): AccountId;
    /**
     * @param {string} memo
     * @returns {this}
     * @throws {Error}
     */
    setTransactionMemo(memo: string): this;
    /**
     * @param {TransactionId} transactionId
     * @returns {this}
     * @throws {Error}
     */
    setTransactionId(transactionId: TransactionId): this;
    /**
     * @param {AccountId[]} nodeAccountIds
     * @returns {this}
     * @throws {Error}
     */
    setNodeAccountIds(nodeAccountIds: AccountId[]): this;
    /**
     * @param {object} [options]
     * @param {boolean} [options.schedule]
     * @param {string} [options.scheduleMemo]
     * @param {string | AccountId} [options.schedulePayerAccountId]
     * @returns {Promise<ExecuteResult>}
     * @throws {Error}
     */
    execute(options?: {
        schedule?: boolean;
        scheduleMemo?: string;
        schedulePayerAccountId?: string | AccountId;
    }): Promise<ExecuteResult>;
    /**
     * @param {object} [options]
     * @param {boolean} [options.schedule]
     * @param {string} [options.scheduleMemo]
     * @param {string | AccountId} [options.schedulePayerAccountId]
     * @param {Key} [options.scheduleAdminKey]
     * @returns {Promise<string>}
     * @throws {Error}
     */
    getTransactionBytes(options?: {
        schedule?: boolean;
        scheduleMemo?: string;
        schedulePayerAccountId?: string | AccountId;
        scheduleAdminKey?: Key;
    }): Promise<string>;
    /**
     * Executes the current transaction using a provided signer.
     * This is useful if the transaction needs to be signed and paid for by a different account
     * than the one initially configured with the HederaAgentKit/builder instance.
     * Note: The transaction should ideally not be frozen, or if frozen, its transactionId
     * should be compatible with the newSigner's accountId as the payer.
     * @param {AbstractSigner} newSigner - The signer to use for this specific execution.
     * @returns {Promise<ExecuteResult>}
     * @throws {Error}
     */
    executeWithSigner(newSigner: AbstractSigner): Promise<ExecuteResult>;
    /**
     * @param {Transaction} transaction
     */
    protected setCurrentTransaction(transaction: Transaction): void;
    /**
     * Retrieves the current transaction object being built.
     * @returns {Transaction | null} The current transaction or null.
     */
    getCurrentTransaction(): Transaction | null;
    addNote(note: string): void;
    getNotes(): string[];
    clearNotes(): void;
    protected parseKey(keyInput?: string | PublicKey | Key | null): Promise<Key | undefined>;
    protected parseAmount(amount?: number | string | Long | BigNumber): Long;
}
