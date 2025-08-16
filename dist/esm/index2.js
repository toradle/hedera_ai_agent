import { Client, TransactionId, ScheduleId, ScheduleSignTransaction } from "@hashgraph/sdk";
import { HcsBuilder } from "./index73.js";
import { HtsBuilder } from "./index72.js";
import { AccountBuilder } from "./index71.js";
import { ScsBuilder } from "./index74.js";
import { QueryBuilder } from "./index75.js";
import { ModelCapability } from "./index91.js";
import { HederaMirrorNode } from "./index92.js";
import { Logger } from "./index77.js";
const NOT_INITIALIZED_ERROR = "HederaAgentKit not initialized. Call await kit.initialize() first.";
class HederaAgentKit {
  constructor(signer, pluginConfigInput, initialOperationalMode = "returnBytes", userAccountId, scheduleUserTransactionsInBytesMode = true, modelCapability = ModelCapability.MEDIUM, modelName, mirrorNodeConfig, disableLogging = false) {
    this.isInitialized = false;
    this.signer = signer;
    this.network = this.signer.getNetwork();
    const shouldDisableLogs = disableLogging || process.env.DISABLE_LOGS === "true";
    this.logger = new Logger({
      level: shouldDisableLogs ? "silent" : "info",
      module: "HederaAgentKit",
      silent: shouldDisableLogs
    });
    if (this.network === "mainnet") {
      this.client = Client.forMainnet();
    } else if (this.network === "testnet") {
      this.client = Client.forTestnet();
    } else {
      throw new Error(`Unsupported network type: ${this.network}`);
    }
    this.client.setOperator(
      this.signer.getAccountId(),
      this.signer.getOperatorPrivateKey()
    );
    this.mirrorNode = new HederaMirrorNode(
      this.network,
      new Logger({
        level: shouldDisableLogs ? "silent" : "info",
        module: "HederaAgentKit-MirrorNode",
        silent: shouldDisableLogs
      }),
      mirrorNodeConfig
    );
    this.pluginConfigInternal = pluginConfigInput;
    this.loadedPlugins = [];
    this.aggregatedTools = [];
    this.operationalMode = initialOperationalMode;
    this.userAccountId = userAccountId;
    this.scheduleUserTransactionsInBytesMode = scheduleUserTransactionsInBytesMode;
    this.modelCapability = modelCapability;
    this.modelName = modelName;
  }
  /**
   * Initializes the HederaAgentKit, including loading any configured plugins and aggregating tools.
   * This method must be called before `getAggregatedLangChainTools()` can be used.
   */
  async initialize() {
    if (this.isInitialized) {
      this.logger.warn("HederaAgentKit is already initialized.");
      return;
    }
    this.loadedPlugins = [];
    const contextForPlugins = {
      logger: this.logger,
      config: {
        ...this.pluginConfigInternal?.appConfig || {},
        hederaKit: this,
        modelCapability: this.modelCapability
      },
      client: {
        getNetwork: () => this.network
      }
    };
    const uniquePlugins = [];
    const seenIds = /* @__PURE__ */ new Set();
    if (this.pluginConfigInternal?.plugins) {
      for (const pluginInstance of this.pluginConfigInternal.plugins) {
        if (!seenIds.has(pluginInstance.id)) {
          uniquePlugins.push(pluginInstance);
          seenIds.add(pluginInstance.id);
        }
      }
    }
    for (const pluginInstance of uniquePlugins) {
      try {
        this.logger.info(
          `Initializing plugin: ${pluginInstance.name}`
        );
        await pluginInstance.initialize(contextForPlugins);
        this.loadedPlugins.push(pluginInstance);
        this.logger.info(
          `Successfully initialized and added plugin: ${pluginInstance.name}`
        );
      } catch (error) {
        this.logger.error(
          `Failed to initialize plugin ${pluginInstance.name}: ${error instanceof Error ? error.message : String(error)}`
        );
      }
    }
    const pluginTools = this.loadedPlugins.flatMap((plugin) => {
      return plugin.getTools();
    });
    this.aggregatedTools = [...pluginTools];
    this.isInitialized = true;
    this.logger.info(
      "HederaAgentKit initialized successfully with all tools aggregated."
    );
  }
  async getOperator() {
    return {
      id: this.signer.getAccountId(),
      publicKey: await this.signer.getPublicKey()
    };
  }
  /**
   * Retrieves the aggregated list of LangChain tools from the kit, core tools, and plugins.
   * The HederaAgentKit instance must be initialized via `await kit.initialize()` before calling this method.
   * @returns {Tool[]} An array of LangChain Tool objects.
   * @throws {Error} If the kit has not been initialized.
   */
  getAggregatedLangChainTools() {
    if (!this.isInitialized) {
      throw new Error(
        "HederaAgentKit not initialized. Call await kit.initialize() before accessing tools."
      );
    }
    return this.aggregatedTools;
  }
  /**
   * Provides access to the Hedera Consensus Service (HCS) builder.
   * @returns {HcsBuilder} An instance of HcsBuilder.
   * @throws {Error} If HederaAgentKit has not been initialized via `await initialize()`.
   */
  hcs() {
    if (!this.isInitialized) {
      throw new Error(NOT_INITIALIZED_ERROR);
    }
    return new HcsBuilder(this);
  }
  /**
   * Provides access to the Hedera Token Service (HTS) builder.
   * @returns {HtsBuilder} An instance of HtsBuilder.
   * @throws {Error} If HederaAgentKit has not been initialized via `await initialize()`.
   */
  hts() {
    if (!this.isInitialized) {
      throw new Error(NOT_INITIALIZED_ERROR);
    }
    return new HtsBuilder(this);
  }
  /**
   * Provides access to the Hedera Account Service builder.
   * @returns {AccountBuilder} An instance of AccountBuilder.
   * @throws {Error} If HederaAgentKit has not been initialized via `await initialize()`.
   */
  accounts() {
    if (!this.isInitialized) {
      throw new Error(NOT_INITIALIZED_ERROR);
    }
    return new AccountBuilder(this);
  }
  /**
   * Provides access to the Hedera Smart Contract Service (SCS) builder.
   * @returns {ScsBuilder} An instance of ScsBuilder.
   * @throws {Error} If HederaAgentKit has not been initialized via `await initialize()`.
   */
  scs() {
    if (!this.isInitialized) {
      throw new Error(NOT_INITIALIZED_ERROR);
    }
    return new ScsBuilder(this);
  }
  /**
   * Provides access to the Hedera Query builder for read-only operations.
   * @returns {QueryBuilder} An instance of QueryBuilder.
   * @throws {Error} If HederaAgentKit has not been initialized via `await initialize()`.
   */
  query() {
    if (!this.isInitialized) {
      throw new Error(NOT_INITIALIZED_ERROR);
    }
    return new QueryBuilder(this);
  }
  /**
   * Retrieves the transaction receipt for a given transaction ID string.
   * @param {string} transactionIdString - The transaction ID (e.g., "0.0.xxxx@16666666.77777777").
   * @returns {Promise<TransactionReceipt>} A promise that resolves to the TransactionReceipt.
   * @throws {Error} If the transaction ID is invalid or receipt cannot be fetched.
   */
  async getTransactionReceipt(transactionIdInput) {
    const transactionId = typeof transactionIdInput === "string" ? TransactionId.fromString(transactionIdInput) : transactionIdInput;
    try {
      return await transactionId.getReceipt(this.client);
    } catch (error) {
      this.logger.error(
        `Failed to get transaction receipt for ${transactionId.toString()}: ${error instanceof Error ? error.message : String(error)}`
      );
      throw error;
    }
  }
  /**
   * Signs a scheduled transaction.
   * The transaction is signed by the operator configured in the current signer.
   * @param {SignScheduledTransactionParams} params - Parameters for the ScheduleSign transaction.
   * @returns {Promise<ExecuteResult>} A promise that resolves to an object indicating success, receipt, and transactionId.
   * @throws {Error} If the execution fails.
   */
  async signScheduledTransaction(params) {
    if (!this.isInitialized) {
      throw new Error(
        "HederaAgentKit not initialized. Call await kit.initialize() first."
      );
    }
    this.logger.info(
      `Attempting to sign scheduled transaction: ${params.scheduleId.toString()}`
    );
    const scheduleId = typeof params.scheduleId === "string" ? ScheduleId.fromString(params.scheduleId) : params.scheduleId;
    const transaction = new ScheduleSignTransaction().setScheduleId(scheduleId);
    if (params.memo) {
      transaction.setTransactionMemo(params.memo);
    }
    let transactionIdToReport;
    if (!transaction.transactionId) {
      transaction.freezeWith(this.client);
    }
    transactionIdToReport = transaction.transactionId?.toString();
    try {
      const receipt = await this.signer.signAndExecuteTransaction(transaction);
      return {
        success: true,
        receipt,
        transactionId: transactionIdToReport
      };
    } catch (error) {
      this.logger.error(
        `Failed to sign scheduled transaction ${params.scheduleId.toString()}: ${error instanceof Error ? error.message : String(error)}`
      );
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
        transactionId: transactionIdToReport
      };
    }
  }
}
export {
  HederaAgentKit,
  HederaAgentKit as default
};
//# sourceMappingURL=index2.js.map
