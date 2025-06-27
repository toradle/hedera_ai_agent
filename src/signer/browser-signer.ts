import {
  AccountId,
  Transaction,
  TransactionReceipt,
  PrivateKey,
  Status,
} from '@hashgraph/sdk';
import { AbstractSigner } from './abstract-signer';
import { HederaNetworkType } from '../types';
import { DAppConnector } from '@hashgraph/hedera-wallet-connect';

/**
 * A signer implementation for browser environments that uses HashConnect for signing.
 * It delegates signing operations to an instance of HashinalsWalletConnectSDK.
 */
export class BrowserSigner extends AbstractSigner {
  private networkInternal: HederaNetworkType;
  private accountIdInternal: AccountId;
  private dAppConnector: DAppConnector;

  /**
   * Constructs a BrowserSigner instance.
   * @param {HashinalsWalletConnectSDK} hwcSdk - An initialized HashinalsWalletConnectSDK instance.
   * @param {HederaNetworkType} network - The Hedera network ('mainnet' or 'testnet').
   * @param {string | AccountId} accountId - The Hedera account ID this signer will represent (must be paired with hwcSdk).
   */
  constructor(
    dAppConnector: DAppConnector,
    network: HederaNetworkType,
    accountId: string | AccountId
  ) {
    super();
    this.dAppConnector = dAppConnector;
    this.networkInternal = network;
    this.accountIdInternal = AccountId.fromString(accountId.toString());

    const foundSigner = this.dAppConnector?.signers?.find((signer) => {
      const signerAccount = signer.getAccountId();
      if (signerAccount) {
        return signerAccount.toString() === this.accountIdInternal.toString();
      }
      return false;
    });

    if (!foundSigner) {
      throw new Error(
        `No HashConnect signer (HederaSdkSigner) could be found or initialized within HashinalsWalletConnectSDK for account ID ${this.accountIdInternal.toString()}. ` +
          `Ensure the account is paired and selected in HashPack for the dApp on network ${this.networkInternal}.`
      );
    }

    this.initializeMirrorNode(this.networkInternal, 'BrowserSigner');
  }

  /**
   * Retrieves the Hedera account ID associated with this signer.
   * @returns {AccountId} The Hedera AccountId object.
   */
  public getAccountId(): AccountId {
    return this.accountIdInternal;
  }

  public async executeTransaction(
    tx: Transaction,
    disableSigner: boolean = false
  ): Promise<TransactionReceipt> {
    const signer = this.dAppConnector.signers.find(
      (signer_) =>
        signer_.getAccountId().toString() === this.accountIdInternal.toString()
    );
    if (!signer) {
      throw new Error(
        `No signer found for account ID ${this.accountIdInternal.toString()}`
      );
    }
    if (!disableSigner) {
      const signedTx = await tx.freezeWithSigner(signer);
      const executedTx = await signedTx.executeWithSigner(signer);
      return await executedTx.getReceiptWithSigner(signer);
    } else {
      const executedTx = await tx.executeWithSigner(signer);
      return await executedTx.getReceiptWithSigner(signer);
    }
  }

  public async executeTransactionWithErrorHandling(
    tx: Transaction,
    disableSigner: boolean
  ): Promise<{
    result?: TransactionReceipt | undefined;
    error?: string | undefined;
  }> {
    try {
      const result = await this.executeTransaction(tx, disableSigner);
      if (result.status._code.toString() === Status.Success.toString()) {
        return {
          result,
          error: undefined,
        };
      } else {
        return {
          result: undefined,
          error: result.status.toString(),
        };
      }
    } catch (e) {
      const error = e as Error;
      const message = error.message?.toLowerCase();

      if (message.includes('insufficient payer balance')) {
        return {
          result: undefined,
          error: 'Insufficient balance to complete the transaction.',
        };
      } else if (message.includes('reject')) {
        return {
          result: undefined,
          error: 'You rejected the transaction',
        };
      } else if (message.includes('invalid signature')) {
        return {
          result: undefined,
          error: 'Invalid signature. Please check your account and try again.',
        };
      } else if (message.includes('transaction expired')) {
        return {
          result: undefined,
          error: 'Transaction expired. Please try again.',
        };
      } else if (message.includes('account not found')) {
        return {
          result: undefined,
          error:
            'Account not found. Please check the account ID and try again.',
        };
      } else if (message.includes('unauthorized')) {
        return {
          result: undefined,
          error:
            'Unauthorized. You may not have the necessary permissions for this action.',
        };
      } else if (message.includes('busy')) {
        return {
          result: undefined,
          error: 'The network is busy. Please try again later.',
        };
      } else if (message.includes('invalid transaction')) {
        return {
          result: undefined,
          error: 'Invalid transaction. Please check your inputs and try again.',
        };
      }
      return {
        result: undefined,
        error: 'An unknown error occurred. Please try again.',
      };
    }
  }

  /**
   * Signs and executes a Hedera transaction using the HashinalsWalletConnectSDK,
   * returning the transaction receipt. Transaction freezing is handled by HashinalsWalletConnectSDK.
   * @param {Transaction} transaction - The transaction to sign and execute.
   * @returns {Promise<TransactionReceipt>} A promise that resolves to the transaction receipt.
   * @throws {Error} If the transaction fails or is rejected.
   */
  public async signAndExecuteTransaction(
    transaction: Transaction
  ): Promise<TransactionReceipt> {
    const outcome = await this.executeTransactionWithErrorHandling(
      transaction,
      false
    );

    if (outcome.error) {
      throw new Error(`Transaction failed: ${outcome.error}`);
    }

    if (outcome.result) {
      return outcome.result;
    }

    throw new Error(
      'Transaction execution with HashinalsWalletConnectSDK yielded no result or error.'
    );
  }

  /**
   * Retrieves the Hedera network type this signer is configured for.
   * @returns {HederaNetworkType} The configured Hedera network type ('mainnet' or 'testnet').
   */
  public getNetwork(): HederaNetworkType {
    return this.networkInternal;
  }

  /**
   * Retrieves the operator's private key.
   * For BrowserSigner, this is not available as signing is delegated to the user's wallet via WalletConnect.
   * @returns {string | PrivateKey} Throws an error as private key is not accessible.
   * @throws {Error} Always, as BrowserSigner does not hold private keys.
   */
  //@ts-ignore
  public getOperatorPrivateKey(): string | PrivateKey {
    throw new Error(
      "BrowserSigner does not have direct access to private keys. Signing is delegated to the user's wallet."
    );
  }

  /**
   * Retrieves the Hedera client instance.
   * @returns {never} Always throws an error as BrowserSigner does not have a client instance.
   */
  //@ts-ignore
  public getClient(): never {
    throw new Error('BrowserSigner does not have a Hedera client instance.');
  }
}
