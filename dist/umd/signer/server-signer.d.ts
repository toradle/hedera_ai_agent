import { AccountId, Client, PrivateKey, Transaction, TransactionReceipt } from '@hashgraph/sdk';
import { AbstractSigner } from './abstract-signer';
import { HederaNetworkType } from '../types';
/**
 * A signer implementation for server-side environments that uses a private key for signing.
 * It directly interacts with the Hedera network using an operator-configured client.
 */
export declare class ServerSigner extends AbstractSigner {
    private client;
    private accountIdInternal;
    private privateKey;
    private networkInternal;
    private keyType;
    private logger;
    private privateKeyString;
    private keyTypeVerified;
    /**
     * Constructs a ServerSigner instance.
     * @param {string | AccountId} accountId - The Hedera account ID.
     * @param {string | PrivateKey} privateKey - The private key for the account.
     * @param {HederaNetworkType} network - The Hedera network to connect to ('mainnet' or 'testnet').
     */
    constructor(accountId: string | AccountId, privateKey: string | PrivateKey, network: HederaNetworkType);
    /**
     * Initializes the operator by verifying the key type against the mirror node.
     * This follows the pattern from standards-sdk to ensure the correct key type is used.
     */
    private initializeOperator;
    /**
     * Retrieves the Hedera account ID associated with this signer.
     * @returns {AccountId} The Hedera AccountId object.
     */
    getAccountId(): AccountId;
    /**
     * Signs and executes a Hedera transaction using the configured client and private key,
     * and returns the transaction receipt.
     * @param {Transaction} transaction - The transaction to sign and execute.
     * @returns {Promise<TransactionReceipt>} A promise that resolves to the transaction receipt.
     */
    signAndExecuteTransaction(transaction: Transaction): Promise<TransactionReceipt>;
    /**
     * Retrieves the Hedera network type this signer is configured for.
     * @returns {HederaNetworkType} The configured Hedera network type ('mainnet' or 'testnet').
     */
    getNetwork(): HederaNetworkType;
    /**
     * Retrieves the operator's private key associated with this signer.
     * @returns {PrivateKey} The Hedera PrivateKey object.
     */
    getOperatorPrivateKey(): PrivateKey;
    /**
     * Retrieves the client instance configured for this ServerSigner.
     * @returns {Client} The Hedera Client object.
     */
    getClient(): Client;
    /**
     * Retrieves the key type of the operator's private key.
     * @returns {Promise<'ed25519' | 'ecdsa'>} The key type.
     */
    getKeyType(): Promise<'ed25519' | 'ecdsa'>;
    /**
     * Retrieves the key type synchronously (without mirror node verification).
     * @returns {'ed25519' | 'ecdsa'} The key type.
     */
    getKeyTypeSync(): 'ed25519' | 'ecdsa';
}
