import { AccountId, PublicKey, Transaction, TransactionReceipt, PrivateKey, Client } from '@hashgraph/sdk';
import { HederaMirrorNode } from '../services/mirror-node';
import { HederaNetworkType } from '../types';
/**
 * AbstractSigner provides a common interface and shared functionality for different signing mechanisms.
 * Concrete implementations will handle specifics for server-side, browser (WalletConnect), etc.
 */
export declare abstract class AbstractSigner {
    mirrorNode: HederaMirrorNode;
    /**
     * Retrieves the Hedera account ID associated with this signer.
     * This must be implemented by concrete classes.
     * @returns {AccountId} The Hedera AccountId object.
     */
    abstract getAccountId(): AccountId;
    /**
     * Retrieves the public key associated with this signer's account using the Hedera Mirror Node.
     * This method relies on the `mirrorNode` property being initialized by the concrete signer.
     * @returns {Promise<PublicKey>} A promise that resolves to the Hedera PublicKey object.
     * @throws {Error} If the public key cannot be retrieved from the mirror node or if mirrorNode is not initialized.
     */
    getPublicKey(): Promise<PublicKey>;
    /**
     * Signs and executes a Hedera transaction, returning its receipt.
     * Concrete implementations will manage their own client interactions for this process.
     * @param {Transaction} transaction - The transaction to sign and execute.
     * @returns {Promise<TransactionReceipt>} A promise that resolves to the transaction receipt.
     */
    abstract signAndExecuteTransaction(transaction: Transaction): Promise<TransactionReceipt>;
    /**
     * Retrieves the Hedera network type this signer is configured for.
     * This must be implemented by concrete classes.
     * @returns {HederaNetworkType} The configured Hedera network type ('mainnet' or 'testnet').
     */
    abstract getNetwork(): HederaNetworkType;
    /**
     * Retrieves the operator's private key.
     * This is needed by HederaAgentKit to set the operator on its internal client.
     * Concrete implementations must provide this.
     * @returns {PrivateKey} The operator's private key.
     */
    abstract getOperatorPrivateKey(): PrivateKey;
    /**
     * Retrieves the client instance configured for this signer.
     * This is needed for operations like freezing transactions with the correct payer.
     * @returns {Client} The Hedera Client object.
     */
    abstract getClient(): Client;
    /**
     * Initializes the HederaMirrorNode instance for the signer.
     * Concrete classes must call this in their constructor.
     * @param {HederaNetworkType} network - The network for the mirror node.
     * @param {string} moduleName - A descriptive name for the logger module (e.g., 'ServerSigner').
     */
    protected initializeMirrorNode(network: HederaNetworkType, moduleName: string): void;
}
