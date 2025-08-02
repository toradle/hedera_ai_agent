import { BaseCallbackHandler } from '@langchain/core/callbacks/base';
import { LLMResult } from '@langchain/core/outputs';
import { Logger } from './logger';
/**
 * Token usage data structure
 */
export interface TokenUsage {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
    modelName?: string | undefined;
    timestamp?: Date | undefined;
}
/**
 * Cost calculation result
 */
export interface CostCalculation {
    promptCost: number;
    completionCost: number;
    totalCost: number;
    currency: string;
}
/**
 * OpenRouter model pricing structure
 */
export interface OpenRouterModel {
    id: string;
    name: string;
    pricing: {
        prompt: string;
        completion: string;
    };
}
/**
 * Model pricing manager that fetches and caches pricing from OpenRouter API
 */
export declare class ModelPricingManager {
    private static instance;
    private pricingCache;
    private lastFetchTime;
    private readonly CACHE_DURATION;
    private readonly OPENROUTER_API_URL;
    private readonly DEFAULT_MODEL;
    private logger;
    private constructor();
    static getInstance(): ModelPricingManager;
    private initializeFallbackPricing;
    private fetchPricingFromAPI;
    private getSimplifiedModelId;
    private ensurePricingLoaded;
    getPricing(modelName: string): Promise<{
        prompt: number;
        completion: number;
    }>;
    getPricingSync(modelName: string): {
        prompt: number;
        completion: number;
    };
}
/**
 * Callback handler to track token usage from OpenAI API responses
 */
export declare class TokenUsageCallbackHandler extends BaseCallbackHandler {
    name: string;
    private tokenUsageHistory;
    private currentTokenUsage;
    private logger;
    private modelName?;
    constructor(modelName?: string, logger?: Logger);
    handleLLMEnd(output: LLMResult): Promise<void>;
    getLatestTokenUsage(): TokenUsage | undefined;
    getTokenUsageHistory(): TokenUsage[];
    getTotalTokenUsage(): TokenUsage;
    reset(): void;
}
/**
 * Calculate cost based on token usage and model with dynamic pricing
 */
export declare function calculateTokenCost(tokenUsage: TokenUsage, modelName?: string): Promise<CostCalculation>;
/**
 * Synchronous version of calculateTokenCost using cached pricing
 */
export declare function calculateTokenCostSync(tokenUsage: TokenUsage, modelName?: string): CostCalculation;
/**
 * Format cost for display
 */
export declare function formatCost(cost: CostCalculation, precision?: number): string;
/**
 * Estimate tokens from text (rough approximation)
 */
export declare function estimateTokens(text: string): number;
