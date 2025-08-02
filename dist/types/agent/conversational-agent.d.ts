import { AbstractSigner } from '../signer/abstract-signer';
import { HederaAgentKit, PluginConfig } from './agent';
import { BaseChatModel } from '@langchain/core/language_models/chat_models';
import { TransactionReceipt } from '@hashgraph/sdk';
import { AgentOperationalMode, MirrorNodeConfig } from '../types';
import { ModelCapability } from '../types/model-capability';
import { TokenUsage, CostCalculation } from '../utils/token-usage-tracker';
/**
 * Configuration for the HederaConversationalAgent.
 */
export interface HederaConversationalAgentConfig {
    operationalMode?: AgentOperationalMode;
    pluginConfig?: PluginConfig;
    userAccountId?: string | undefined;
    customSystemMessagePreamble?: string;
    customSystemMessagePostamble?: string;
    verbose?: boolean;
    llm?: BaseChatModel;
    openAIApiKey?: string;
    openAIModelName?: string;
    scheduleUserTransactionsInBytesMode?: boolean;
    modelCapability?: ModelCapability;
    mirrorNodeConfig?: MirrorNodeConfig;
    disableLogging?: boolean;
}
/**
 * Defines the structured response from the HederaConversationalAgent's processMessage method.
 */
export interface AgentResponse {
    output: string;
    message?: string;
    transactionBytes?: string | undefined;
    receipt?: TransactionReceipt | object | undefined;
    scheduleId?: string | undefined;
    transactionId?: string | undefined;
    notes?: string[];
    error?: string | undefined;
    intermediateSteps?: unknown;
    rawToolOutput?: unknown;
    tokenUsage?: TokenUsage | undefined;
    cost?: CostCalculation | undefined;
    [key: string]: unknown;
}
/**
 * HederaConversationalAgent orchestrates interactions between an LLM, HederaAgentKit tools,
 * and the user to facilitate Hedera Network operations via a conversational interface.
 */
export declare class HederaConversationalAgent {
    private hederaKit;
    private llm;
    private agentExecutor;
    private logger;
    private config;
    private systemMessage;
    private tokenUsageHandler;
    /**
     * Creates an instance of HederaConversationalAgent.
     * @param {AbstractSigner} signer - The signer implementation for Hedera transactions.
     * @param {HederaConversationalAgentConfig} [config={}] - Configuration options for the agent.
     */
    constructor(signer: AbstractSigner, config?: HederaConversationalAgentConfig);
    /**
     * Constructs the system message for the LLM based on configuration.
     * @returns {string} The system message string.
     */
    private constructSystemMessage;
    /**
     * Initializes the conversational agent, including its internal HederaAgentKit and LangChain components.
     * Must be called before `processMessage`.
     */
    initialize(): Promise<void>;
    /**
     * Processes a user's input message and returns the agent's response.
     * @param {string} userInput - The user's input string.
     * @param {Array<{ type: 'human' | 'ai'; content: string }>} [chatHistoryInput] - Optional existing chat history.
     * @returns {Promise<AgentResponse>} The agent's structured response.
     */
    processMessage(userInput: string, chatHistoryInput?: Array<{
        type: 'human' | 'ai';
        content: string;
    }>): Promise<AgentResponse>;
    /**
     * Allows updating the operational mode of the agent after instantiation.
     * This also updates the underlying HederaAgentKit's mode and reconstructs the system message for the LLM.
     * Note: For the new system prompt to take full effect with the existing LangChain agent,
     * re-initialization (calling `initialize()`) or recreation of the agent executor might be needed.
     * @param {AgentOperationalMode} mode - The new operational mode.
     */
    setOperationalMode(mode: AgentOperationalMode): void;
    /**
     * Get cumulative token usage across all requests
     * @returns {TokenUsage & { cost: CostCalculation }} Total token usage and cost
     */
    getTotalTokenUsage(): TokenUsage & {
        cost: CostCalculation;
    };
    /**
     * Get token usage history for all requests
     * @returns {Array<TokenUsage & { cost: CostCalculation }>} Array of token usage records with costs
     */
    getTokenUsageHistory(): Array<TokenUsage & {
        cost: CostCalculation;
    }>;
    /**
     * Reset token usage tracking
     */
    resetTokenUsageTracking(): void;
    getKit(): HederaAgentKit;
}
