import { AccountId, TransactionId, ScheduleCreateTransaction, KeyList, PublicKey, PrivateKey, Long } from "@hashgraph/sdk";
import { Buffer } from "buffer";
import { Logger } from "./index77.js";
import { detectKeyTypeFromString } from "./index82.js";
class BaseServiceBuilder {
  /**
   * @param {HederaAgentKit} kit - The HederaAgentKit instance
   */
  constructor(hederaKit) {
    this.hederaKit = hederaKit;
    this.currentTransaction = null;
    this.notes = [];
    this.kit = hederaKit;
    const shouldDisableLogs = process.env.DISABLE_LOGS === "true";
    this.logger = new Logger({
      module: "ServiceBuilder",
      level: shouldDisableLogs ? "silent" : "info",
      silent: shouldDisableLogs
    });
  }
  /**
   * Helper method to get the effective sender account to use for transactions.
   * In user-centric contexts, this will be the user's account. Otherwise, it falls back to the signer's account.
   * @returns {AccountId} The account ID to use as sender
   */
  getEffectiveSenderAccountId() {
    if (this.kit.userAccountId) {
      return AccountId.fromString(this.kit.userAccountId);
    }
    return this.kit.signer.getAccountId();
  }
  /**
   * Helper method to determine if a transaction is a user-initiated transfer.
   * Used for properly constructing transfer arrays.
   * @param {boolean} isUserInitiated Whether this is a user-initiated transfer
   * @returns {AccountId} The account that should be used as the sender
   */
  getTransferSourceAccount(isUserInitiated = true) {
    if (isUserInitiated && this.kit.userAccountId) {
      return AccountId.fromString(this.kit.userAccountId);
    }
    return this.kit.signer.getAccountId();
  }
  /**
   * @param {string} memo
   * @returns {this}
   * @throws {Error}
   */
  setTransactionMemo(memo) {
    if (!this.currentTransaction) {
      throw new Error(
        "No transaction is currently being built. Call a specific transaction method first (e.g., createTopic)."
      );
    }
    this.currentTransaction.setTransactionMemo(memo);
    return this;
  }
  /**
   * @param {TransactionId} transactionId
   * @returns {this}
   * @throws {Error}
   */
  setTransactionId(transactionId) {
    if (!this.currentTransaction) {
      throw new Error(
        "No transaction is currently being built. Call a specific transaction method first."
      );
    }
    this.currentTransaction.setTransactionId(transactionId);
    return this;
  }
  /**
   * @param {AccountId[]} nodeAccountIds
   * @returns {this}
   * @throws {Error}
   */
  setNodeAccountIds(nodeAccountIds) {
    if (!this.currentTransaction) {
      throw new Error(
        "No transaction is currently being built. Call a specific transaction method first."
      );
    }
    this.currentTransaction.setNodeAccountIds(nodeAccountIds);
    return this;
  }
  /**
   * @param {object} [options]
   * @param {boolean} [options.schedule]
   * @param {string} [options.scheduleMemo]
   * @param {string | AccountId} [options.schedulePayerAccountId]
   * @returns {Promise<ExecuteResult>}
   * @throws {Error}
   */
  async execute(options) {
    const innerTx = this.currentTransaction;
    if (!innerTx) {
      return { success: false, error: "No transaction to execute." };
    }
    let transactionToExecute = innerTx;
    let originalTransactionIdForReporting = innerTx.transactionId?.toString();
    if (options?.schedule) {
      if (!innerTx.isFrozen() && this.kit.userAccountId) {
        innerTx.setTransactionId(
          TransactionId.generate(this.kit.userAccountId)
        );
      }
      const scheduleCreateTx = new ScheduleCreateTransaction().setScheduledTransaction(innerTx);
      if (options.scheduleMemo) {
        scheduleCreateTx.setScheduleMemo(options.scheduleMemo);
      }
      if (this.kit.userAccountId) {
        scheduleCreateTx.setPayerAccountId(
          AccountId.fromString(this.kit.userAccountId)
        );
      } else if (options.schedulePayerAccountId) {
        const payerForScheduleCreate = typeof options.schedulePayerAccountId === "string" ? AccountId.fromString(options.schedulePayerAccountId) : options.schedulePayerAccountId;
        scheduleCreateTx.setPayerAccountId(payerForScheduleCreate);
      } else {
        scheduleCreateTx.setPayerAccountId(this.kit.signer.getAccountId());
        this.addNote(
          `Your agent account (${this.kit.signer.getAccountId().toString()}) will pay the fee to create this schedule.`
        );
      }
      const agentOperator = await this.kit.getOperator();
      const adminKeyList = new KeyList().setThreshold(1);
      if (agentOperator.publicKey) {
        adminKeyList.push(agentOperator.publicKey);
        this.addNote(
          `The schedule admin key allows both your agent and user (${this.kit.userAccountId}) to manage the schedule.`
        );
      }
      if (this.kit.userAccountId) {
        try {
          const mirrorNode = this.kit.mirrorNode;
          const userAccountInfo = await mirrorNode.requestAccount(
            this.kit.userAccountId
          );
          if (userAccountInfo?.key?.key) {
            adminKeyList.push(PublicKey.fromString(userAccountInfo.key.key));
            this.addNote(
              `The schedule admin key allows both your agent and user (${this.kit.userAccountId}) to manage the schedule.`
            );
          } else {
            this.addNote(
              `The schedule admin key is set to your agent. User (${this.kit.userAccountId}) key not found or not a single key.`
            );
          }
        } catch (e) {
          this.logger.warn(
            `Failed to get user key for schedule admin key for ${this.kit.userAccountId}: ${e.message}`
          );
          this.addNote(
            `The schedule admin key is set to your agent. Could not retrieve user (${this.kit.userAccountId}) key.`
          );
        }
      }
      if (Array.from(adminKeyList).length > 0) {
        scheduleCreateTx.setAdminKey(adminKeyList);
      } else {
        this.addNote(
          "No admin key could be set for the schedule (agent key missing and user key not found/retrieved)."
        );
      }
      transactionToExecute = scheduleCreateTx;
    }
    try {
      if (!transactionToExecute.isFrozen() && !transactionToExecute.transactionId) {
        await transactionToExecute.freezeWith(this.kit.client);
      }
      if (options?.schedule && transactionToExecute.transactionId) {
        originalTransactionIdForReporting = transactionToExecute.transactionId.toString();
      }
      const receipt = await this.kit.signer.signAndExecuteTransaction(
        transactionToExecute
      );
      const finalTransactionId = transactionToExecute.transactionId?.toString() || originalTransactionIdForReporting;
      const result = {
        success: true,
        receipt,
        transactionId: finalTransactionId
      };
      if (options?.schedule && receipt.scheduleId) {
        result.scheduleId = receipt.scheduleId.toString();
      }
      return result;
    } catch (e) {
      console.log("error is:", e);
      const error = e;
      this.logger.error(
        `Transaction execution failed: ${error.message}`,
        error
      );
      const errorResult = {
        success: false,
        error: error.message || "An unknown error occurred during transaction execution.",
        transactionId: originalTransactionIdForReporting
      };
      return errorResult;
    }
  }
  /**
   * @param {object} [options]
   * @param {boolean} [options.schedule]
   * @param {string} [options.scheduleMemo]
   * @param {string | AccountId} [options.schedulePayerAccountId]
   * @param {Key} [options.scheduleAdminKey]
   * @returns {Promise<string>}
   * @throws {Error}
   */
  async getTransactionBytes(options) {
    if (!this.currentTransaction) {
      throw new Error(
        "No transaction to get bytes for. Call a specific transaction method first."
      );
    }
    let transactionForBytes = this.currentTransaction;
    if (options?.schedule) {
      const scheduleCreateTx = new ScheduleCreateTransaction().setScheduledTransaction(
        this.currentTransaction
      );
      if (options.scheduleMemo) {
        scheduleCreateTx.setScheduleMemo(options.scheduleMemo);
      }
      if (options.schedulePayerAccountId) {
        const payerAccountId = typeof options.schedulePayerAccountId === "string" ? AccountId.fromString(options.schedulePayerAccountId) : options.schedulePayerAccountId;
        scheduleCreateTx.setPayerAccountId(payerAccountId);
      }
      if (options.scheduleAdminKey) {
        scheduleCreateTx.setAdminKey(options.scheduleAdminKey);
      }
      transactionForBytes = scheduleCreateTx;
    }
    return Buffer.from(transactionForBytes.toBytes()).toString("base64");
  }
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
  async executeWithSigner(newSigner) {
    if (!this.currentTransaction) {
      return {
        success: false,
        error: "No transaction to execute. Call a specific transaction method first."
      };
    }
    let transactionToExecute = this.currentTransaction;
    if (transactionToExecute.isFrozen()) {
      throw new Error(
        "Transaction is frozen, try to call the builder method again and then executeWithSigner."
      );
    }
    try {
      const receipt = await newSigner.signAndExecuteTransaction(
        transactionToExecute
      );
      const transactionId = transactionToExecute.transactionId?.toString();
      return {
        success: true,
        receipt,
        transactionId
      };
    } catch (e) {
      const error = e;
      this.logger.error(
        `Transaction execution with new signer failed: ${error.message}`
      );
      return {
        success: false,
        error: error.message || "An unknown error occurred during transaction execution with new signer."
      };
    }
  }
  /**
   * @param {Transaction} transaction
   */
  setCurrentTransaction(transaction) {
    this.currentTransaction = transaction;
  }
  /**
   * Retrieves the current transaction object being built.
   * @returns {Transaction | null} The current transaction or null.
   */
  getCurrentTransaction() {
    return this.currentTransaction;
  }
  addNote(note) {
    this.notes.push(note);
  }
  getNotes() {
    return this.notes;
  }
  clearNotes() {
    this.notes = [];
  }
  async parseKey(keyInput) {
    if (keyInput === void 0 || keyInput === null) {
      return void 0;
    }
    if (typeof keyInput === "object" && ("_key" in keyInput || keyInput instanceof PublicKey || keyInput instanceof PrivateKey || keyInput instanceof KeyList)) {
      return keyInput;
    }
    if (typeof keyInput === "string") {
      if (keyInput.toLowerCase() === "current_signer") {
        if (this.kit.signer) {
          this.logger.info(
            `[BaseServiceBuilder.parseKey] Substituting "current_signer" with signer's public key.`
          );
          return await this.kit.signer.getPublicKey();
        } else {
          throw new Error(
            '[BaseServiceBuilder.parseKey] Signer is not available to resolve "current_signer".'
          );
        }
      }
      try {
        return PublicKey.fromString(keyInput);
      } catch (e) {
        const error = e;
        try {
          this.logger.warn(
            "[BaseServiceBuilder.parseKey] Attempting to parse key string as PrivateKey to derive PublicKey. This is generally not recommended for public-facing keys.",
            { error: error.message }
          );
          const keyDetection = detectKeyTypeFromString(keyInput);
          return keyDetection.privateKey;
        } catch (e2) {
          const error2 = e2;
          this.logger.error(
            `[BaseServiceBuilder.parseKey] Failed to parse key string as PublicKey or PrivateKey: ${keyInput.substring(
              0,
              30
            )}...`,
            { error: error2.message }
          );
          throw new Error(
            `[BaseServiceBuilder.parseKey] Invalid key string format: ${keyInput.substring(
              0,
              30
            )}...`
          );
        }
      }
    }
    this.logger.warn(
      `[BaseServiceBuilder.parseKey] Received an object that is not an SDK Key instance or a recognized string format: ${JSON.stringify(
        keyInput
      )}`
    );
    return void 0;
  }
  parseAmount(amount) {
    if (amount === void 0) {
      return Long.fromNumber(0);
    }
    if (typeof amount === "number") {
      return Long.fromNumber(amount);
    }
    if (typeof amount === "string") {
      return Long.fromString(amount);
    }
    if (amount instanceof BigNumber) {
      return Long.fromString(amount.toString());
    }
    return amount;
  }
}
export {
  BaseServiceBuilder
};
//# sourceMappingURL=index70.js.map
