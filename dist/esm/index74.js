import { ContractCreateTransaction, Long, Hbar, ContractExecuteTransaction, ContractUpdateTransaction, ContractDeleteTransaction, ContractCallQuery, TransactionId } from "@hashgraph/sdk";
import { Buffer } from "buffer";
import { BaseServiceBuilder } from "./index70.js";
import { detectKeyTypeFromString } from "./index82.js";
const DEFAULT_CONTRACT_AUTORENEW_PERIOD_SECONDS = 7776e3;
class ScsBuilder extends BaseServiceBuilder {
  constructor(hederaKit) {
    super(hederaKit);
  }
  /**
   * @param {CreateContractParams} params
   * @returns {this}
   * @throws {Error}
   */
  createContract(params) {
    this.clearNotes();
    const transaction = new ContractCreateTransaction();
    if (params.bytecodeFileId) {
      transaction.setBytecodeFileId(params.bytecodeFileId);
    } else if (params.bytecode) {
      if (typeof params.bytecode === "string") {
        transaction.setBytecode(Buffer.from(params.bytecode, "hex"));
      } else {
        transaction.setBytecode(params.bytecode);
      }
    } else {
      throw new Error(
        "Either bytecodeFileId or bytecode must be provided to create a contract."
      );
    }
    if (params.adminKey) {
      if (typeof params.adminKey === "string") {
        const keyDetection = detectKeyTypeFromString(params.adminKey);
        transaction.setAdminKey(keyDetection.privateKey);
      } else {
        transaction.setAdminKey(params.adminKey);
      }
    }
    if (typeof params.gas === "number") {
      transaction.setGas(params.gas);
    } else {
      transaction.setGas(Long.fromValue(params.gas));
    }
    if (params.initialBalance) {
      let balance;
      if (typeof params.initialBalance === "number") {
        balance = new Hbar(params.initialBalance);
      } else {
        balance = Hbar.fromTinybars(
          Long.fromString(params.initialBalance.toString())
        );
      }
      transaction.setInitialBalance(balance);
    }
    if (params.constructorParameters) {
      transaction.setConstructorParameters(params.constructorParameters);
    }
    if (params.memo) {
      transaction.setContractMemo(params.memo);
    }
    if (params.autoRenewPeriod) {
      transaction.setAutoRenewPeriod(params.autoRenewPeriod);
    } else {
      transaction.setAutoRenewPeriod(DEFAULT_CONTRACT_AUTORENEW_PERIOD_SECONDS);
      this.addNote(`Default auto-renew period of ${DEFAULT_CONTRACT_AUTORENEW_PERIOD_SECONDS} seconds applied for contract.`);
    }
    if (params.stakedAccountId) {
      transaction.setStakedAccountId(params.stakedAccountId);
    }
    if (params.stakedNodeId) {
      transaction.setStakedNodeId(params.stakedNodeId);
    }
    if (params.declineStakingReward) {
      transaction.setDeclineStakingReward(params.declineStakingReward);
    }
    if (params.maxAutomaticTokenAssociations) {
      transaction.setMaxAutomaticTokenAssociations(
        params.maxAutomaticTokenAssociations
      );
    }
    this.setCurrentTransaction(transaction);
    return this;
  }
  /**
   * @param {ExecuteContractParams} params
   * @returns {this}
   */
  executeContract(params) {
    this.clearNotes();
    let gasValue;
    if (typeof params.gas === "number") {
      gasValue = params.gas;
    } else {
      gasValue = Long.fromValue(params.gas);
    }
    const transaction = new ContractExecuteTransaction().setContractId(params.contractId).setGas(gasValue).setFunction(params.functionName, params.functionParameters);
    if (params.payableAmount) {
      let hbarAmount;
      if (params.payableAmount instanceof Hbar) {
        hbarAmount = params.payableAmount;
      } else if (typeof params.payableAmount === "number") {
        hbarAmount = new Hbar(params.payableAmount);
      } else {
        hbarAmount = Hbar.fromTinybars(
          Long.fromString(params.payableAmount.toString())
        );
      }
      transaction.setPayableAmount(hbarAmount);
    }
    if (params.memo) {
      transaction.setTransactionMemo(params.memo);
    }
    this.setCurrentTransaction(transaction);
    return this;
  }
  /**
   * @param {UpdateContractParams} params
   * @returns {this}
   * @throws {Error}
   */
  updateContract(params) {
    this.clearNotes();
    if (params.contractId === void 0) {
      throw new Error("Contract ID is required to update a contract.");
    }
    const transaction = new ContractUpdateTransaction().setContractId(
      params.contractId
    );
    if (params.adminKey) {
      if (typeof params.adminKey === "string") {
        const keyDetection = detectKeyTypeFromString(params.adminKey);
        transaction.setAdminKey(keyDetection.privateKey);
      } else {
        transaction.setAdminKey(params.adminKey);
      }
    }
    if (params.autoRenewPeriod) {
      transaction.setAutoRenewPeriod(params.autoRenewPeriod);
    }
    if (params.memo) {
      transaction.setContractMemo(params.memo);
    }
    if (params.stakedAccountId) {
      transaction.setStakedAccountId(params.stakedAccountId);
    }
    if (params.stakedNodeId) {
      transaction.setStakedNodeId(params.stakedNodeId);
    }
    if (params.declineStakingReward) {
      transaction.setDeclineStakingReward(params.declineStakingReward);
    }
    if (params.maxAutomaticTokenAssociations) {
      transaction.setMaxAutomaticTokenAssociations(
        params.maxAutomaticTokenAssociations
      );
    }
    if (params.proxyAccountId) {
      transaction.setProxyAccountId(params.proxyAccountId);
    }
    this.setCurrentTransaction(transaction);
    return this;
  }
  /**
   * @param {DeleteContractParams} params
   * @returns {this}
   * @throws {Error}
   */
  deleteContract(params) {
    this.clearNotes();
    if (params.contractId === void 0) {
      throw new Error("Contract ID is required to delete a contract.");
    }
    const transaction = new ContractDeleteTransaction().setContractId(
      params.contractId
    );
    if (params.transferAccountId) {
      transaction.setTransferAccountId(params.transferAccountId);
    } else if (params.transferContractId) {
      transaction.setTransferContractId(params.transferContractId);
    }
    this.setCurrentTransaction(transaction);
    return this;
  }
  /**
   * Executes a local smart contract query (does not modify state, no consensus needed).
   * @param {ContractCallQueryParams} params - Parameters for the contract query.
   * @returns {Promise<ContractFunctionResult>} A promise that resolves to the result of the contract call.
   * @throws {Error} If query execution fails.
   */
  async callContract(params) {
    const query = new ContractCallQuery().setContractId(params.contractId);
    if (params.gas) {
      if (typeof params.gas === "number") {
        query.setGas(params.gas);
      } else {
        query.setGas(Long.fromValue(params.gas));
      }
    }
    if (params.functionName) {
      if (params.functionParameters) {
        query.setFunction(params.functionName, params.functionParameters);
      } else {
        query.setFunction(params.functionName);
      }
    }
    if (params.maxQueryPayment) {
      query.setQueryPayment(params.maxQueryPayment);
    }
    if (params.paymentTransactionId) {
      if (typeof params.paymentTransactionId === "string") {
        query.setPaymentTransactionId(
          TransactionId.fromString(params.paymentTransactionId)
        );
      } else {
        query.setPaymentTransactionId(params.paymentTransactionId);
      }
    }
    try {
      this.logger.info(
        `Executing ContractCallQuery for contract ${params.contractId.toString()}`
      );
      return await query.execute(this.kit.client);
    } catch (error) {
      this.logger.error(
        `ContractCallQuery failed for contract ${params.contractId.toString()}: ${error instanceof Error ? error.message : JSON.stringify(error)}`
      );
      throw error;
    }
  }
}
export {
  ScsBuilder
};
//# sourceMappingURL=index74.js.map
