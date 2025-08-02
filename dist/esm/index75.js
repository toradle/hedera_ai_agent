function filterUndefined(obj) {
  const filtered = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value !== void 0) {
      filtered[key] = value;
    }
  }
  return filtered;
}
class QueryBuilder {
  constructor(hederaKit) {
    this.hederaKit = hederaKit;
    this.mirrorNode = hederaKit.mirrorNode;
  }
  /**
   * Get topic information for a given topic ID
   */
  async getTopicInfo(topicId) {
    const topicIdString = typeof topicId === "string" ? topicId : topicId.toString();
    return await this.mirrorNode.getTopicInfo(topicIdString);
  }
  /**
   * Get messages for a given topic ID
   */
  async getTopicMessages(topicId) {
    const topicIdString = typeof topicId === "string" ? topicId : topicId.toString();
    return await this.mirrorNode.getTopicMessages(topicIdString);
  }
  /**
   * Get filtered topic messages with optional parameters
   */
  async getTopicMessagesByFilter(topicId, options) {
    const topicIdString = typeof topicId === "string" ? topicId : topicId.toString();
    return await this.mirrorNode.getTopicMessagesByFilter(
      topicIdString,
      options
    );
  }
  /**
   * Get account information for a given account ID
   */
  async getAccountInfo(accountId) {
    const accountIdString = typeof accountId === "string" ? accountId : accountId.toString();
    return await this.mirrorNode.requestAccount(accountIdString);
  }
  /**
   * Get account balance in HBAR for a given account ID
   */
  async getAccountBalance(accountId) {
    const accountIdString = typeof accountId === "string" ? accountId : accountId.toString();
    return await this.mirrorNode.getAccountBalance(accountIdString);
  }
  /**
   * Get account memo for a given account ID
   */
  async getAccountMemo(accountId) {
    const accountIdString = typeof accountId === "string" ? accountId : accountId.toString();
    return await this.mirrorNode.getAccountMemo(accountIdString);
  }
  /**
   * Get token information for a given token ID
   */
  async getTokenInfo(tokenId) {
    return await this.mirrorNode.getTokenInfo(tokenId);
  }
  /**
   * Get token balances for a given account ID
   */
  async getAccountTokens(accountId, limit = 100) {
    const accountIdString = typeof accountId === "string" ? accountId : accountId.toString();
    return await this.mirrorNode.getAccountTokens(accountIdString, limit);
  }
  /**
   * Get NFTs for a given account ID
   */
  async getAccountNfts(accountId, tokenId, limit = 100) {
    const accountIdString = typeof accountId === "string" ? accountId : accountId.toString();
    return await this.mirrorNode.getAccountNfts(
      accountIdString,
      tokenId,
      limit
    );
  }
  /**
   * Validate NFT ownership
   */
  async validateNftOwnership(accountId, tokenId, serialNumber) {
    const accountIdString = typeof accountId === "string" ? accountId : accountId.toString();
    return await this.mirrorNode.validateNFTOwnership(
      accountIdString,
      tokenId,
      serialNumber
    );
  }
  /**
   * Get transaction details by ID or hash
   */
  async getTransaction(transactionIdOrHash) {
    return await this.mirrorNode.getTransaction(transactionIdOrHash);
  }
  /**
   * Get transaction details by consensus timestamp
   */
  async getTransactionByTimestamp(timestamp) {
    return await this.mirrorNode.getTransactionByTimestamp(timestamp);
  }
  /**
   * Get schedule information for a given schedule ID
   */
  async getScheduleInfo(scheduleId) {
    return await this.mirrorNode.getScheduleInfo(scheduleId);
  }
  /**
   * Get scheduled transaction status
   */
  async getScheduledTransactionStatus(scheduleId) {
    return await this.mirrorNode.getScheduledTransactionStatus(scheduleId);
  }
  /**
   * Get HBAR price for a given date
   */
  async getHbarPrice(date) {
    return await this.mirrorNode.getHBARPrice(date);
  }
  /**
   * Read smart contract query (view/pure functions)
   */
  async readSmartContract(contractIdOrAddress, functionSelector, payerAccountId, options) {
    const payerIdString = typeof payerAccountId === "string" ? payerAccountId : payerAccountId.toString();
    return await this.mirrorNode.readSmartContractQuery(
      contractIdOrAddress,
      functionSelector,
      payerIdString,
      options
    );
  }
  /**
   * Get public key for a given account ID
   */
  async getPublicKey(accountId) {
    const accountIdString = typeof accountId === "string" ? accountId : accountId.toString();
    return await this.mirrorNode.getPublicKey(accountIdString);
  }
  /**
   * Get custom fees for a given topic ID
   */
  async getTopicFees(topicId) {
    const topicIdString = typeof topicId === "string" ? topicId : topicId.toString();
    return await this.mirrorNode.getTopicFees(topicIdString);
  }
  /**
   * Check if a user has access to a given key list
   */
  async checkKeyListAccess(keyBytes, userPublicKey) {
    return await this.mirrorNode.checkKeyListAccess(keyBytes, userPublicKey);
  }
  /**
   * Get outstanding token airdrops sent by an account
   */
  async getOutstandingTokenAirdrops(accountIdOrArgs, options) {
    let accountIdString;
    let finalOptions;
    if (typeof accountIdOrArgs === "object" && "accountId" in accountIdOrArgs) {
      accountIdString = accountIdOrArgs.accountId;
      finalOptions = filterUndefined({
        limit: accountIdOrArgs.limit,
        order: accountIdOrArgs.order,
        receiverId: accountIdOrArgs.receiverId,
        serialNumber: accountIdOrArgs.serialNumber,
        tokenId: accountIdOrArgs.tokenId
      });
    } else {
      accountIdString = typeof accountIdOrArgs === "string" ? accountIdOrArgs : accountIdOrArgs.toString();
      finalOptions = options;
    }
    if (!finalOptions) {
      return await this.mirrorNode.getOutstandingTokenAirdrops(accountIdString);
    }
    const filteredOptions = filterUndefined(finalOptions);
    const hasFilters = Object.keys(filteredOptions).length > 0;
    return await this.mirrorNode.getOutstandingTokenAirdrops(
      accountIdString,
      hasFilters ? filteredOptions : void 0
    );
  }
  /**
   * Get pending token airdrops received by an account
   */
  async getPendingTokenAirdrops(accountIdOrArgs, options) {
    let accountIdString;
    let finalOptions;
    if (typeof accountIdOrArgs === "object" && "accountId" in accountIdOrArgs) {
      accountIdString = accountIdOrArgs.accountId;
      finalOptions = filterUndefined({
        limit: accountIdOrArgs.limit,
        order: accountIdOrArgs.order,
        senderId: accountIdOrArgs.senderId,
        serialNumber: accountIdOrArgs.serialNumber,
        tokenId: accountIdOrArgs.tokenId
      });
    } else {
      accountIdString = typeof accountIdOrArgs === "string" ? accountIdOrArgs : accountIdOrArgs.toString();
      finalOptions = options;
    }
    if (!finalOptions) {
      return await this.mirrorNode.getPendingTokenAirdrops(accountIdString);
    }
    const filteredOptions = filterUndefined(finalOptions);
    const hasFilters = Object.keys(filteredOptions).length > 0;
    return await this.mirrorNode.getPendingTokenAirdrops(
      accountIdString,
      hasFilters ? filteredOptions : void 0
    );
  }
  /**
   * Get blocks with optional filtering
   */
  async getBlocks(options) {
    if (!options) {
      return await this.mirrorNode.getBlocks();
    }
    const filteredOptions = filterUndefined(options);
    const hasFilters = Object.keys(filteredOptions).length > 0;
    return await this.mirrorNode.getBlocks(
      hasFilters ? filteredOptions : void 0
    );
  }
  /**
   * Get a specific block by number or hash
   */
  async getBlock(blockNumberOrHash) {
    return await this.mirrorNode.getBlock(blockNumberOrHash);
  }
  /**
   * Get contract results with optional filtering
   */
  async getContractResults(options) {
    return await this.mirrorNode.getContractResults(options);
  }
  /**
   * Get contract result by transaction ID
   */
  async getContractResult(transactionIdOrHash, nonce) {
    return await this.mirrorNode.getContractResult(transactionIdOrHash, nonce);
  }
  /**
   * Get contract logs with optional filtering
   */
  async getContractLogs(options) {
    return await this.mirrorNode.getContractLogs(options);
  }
  /**
   * Get contract actions for a transaction
   */
  async getContractActions(transactionIdOrHash, options) {
    return await this.mirrorNode.getContractActions(
      transactionIdOrHash,
      options
    );
  }
  /**
   * Get NFT information by token ID and serial number
   */
  async getNftInfo(tokenId, serialNumber) {
    return await this.mirrorNode.getNftInfo(tokenId, serialNumber);
  }
  /**
   * Get all NFTs for a token ID
   */
  async getNftsByToken(tokenId, options) {
    return await this.mirrorNode.getNftsByToken(tokenId, options);
  }
  /**
   * Get network stake information
   */
  async getNetworkStake(timestamp) {
    return await this.mirrorNode.getNetworkStake(timestamp);
  }
  /**
   * Get network supply information
   */
  async getNetworkSupply(timestamp) {
    return await this.mirrorNode.getNetworkSupply(timestamp);
  }
  /**
   * Get contract entities from the network
   */
  async getContracts(options) {
    if (!options) {
      return await this.mirrorNode.getContracts();
    }
    const filteredOptions = filterUndefined(options);
    const hasFilters = Object.keys(filteredOptions).length > 0;
    return await this.mirrorNode.getContracts(
      hasFilters ? filteredOptions : void 0
    );
  }
  /**
   * Get a specific contract by ID or address
   */
  async getContract(contractIdOrAddress, timestamp, includeBytecode) {
    const response = await this.mirrorNode.getContract(
      contractIdOrAddress,
      timestamp
    );
    if (!includeBytecode) {
      delete response?.bytecode;
    }
    return response;
  }
  /**
   * Get contract results by contract
   */
  async getContractResultsByContract(contractIdOrAddress, options) {
    return await this.mirrorNode.getContractResultsByContract(
      contractIdOrAddress,
      options
    );
  }
  /**
   * Get contract state for a specific contract
   */
  async getContractState(contractIdOrAddress, options) {
    return await this.mirrorNode.getContractState(contractIdOrAddress, options);
  }
  /**
   * Get contract logs by contract
   */
  async getContractLogsByContract(contractIdOrAddress, options) {
    return await this.mirrorNode.getContractLogsByContract(
      contractIdOrAddress,
      options
    );
  }
  /**
   * Get network information
   */
  async getNetworkInfo() {
    return await this.mirrorNode.getNetworkInfo();
  }
  /**
   * Get network fees
   */
  async getNetworkFees(timestamp) {
    return await this.mirrorNode.getNetworkFees(timestamp);
  }
  /**
   * Get opcode traces for a specific transaction
   */
  async getOpcodeTraces(transactionIdOrHash, options) {
    return await this.mirrorNode.getOpcodeTraces(transactionIdOrHash, options);
  }
}
export {
  QueryBuilder
};
//# sourceMappingURL=index75.js.map
