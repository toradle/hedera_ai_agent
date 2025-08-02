import { ModelCapability } from '../types/model-capability';
/**
 * Model capability configuration for different AI models
 */
interface ModelConfig {
    capability: ModelCapability;
    contextWindow: number;
    description: string;
}
/**
 * Model capability detector that provides scalable model capability inference
 * Fetches comprehensive model data from OpenRouter API and caches it
 */
export declare class ModelCapabilityDetector {
    private static instance;
    private registry;
    private lastFetchTime;
    private readonly CACHE_DURATION;
    private readonly OPENROUTER_API_URL;
    private constructor();
    /**
     * Get singleton instance
     */
    static getInstance(): ModelCapabilityDetector;
    /**
     * Determine model capability based on context window and model characteristics
     */
    private determineCapability;
    /**
     * Fetch models from OpenRouter API
     */
    private fetchModelsFromAPI;
    /**
     * Get simplified model ID for common patterns
     */
    private getSimplifiedModelId;
    /**
     * Ensure models are loaded and up-to-date
     */
    private ensureModelsLoaded;
    /**
     * Register a new model configuration
     */
    registerModel(modelName: string, config: ModelConfig): void;
    /**
     * Register multiple models at once
     */
    registerModels(models: Record<string, ModelConfig>): void;
    /**
     * Get model capability for a given model name
     */
    getModelCapability(modelName?: string): Promise<ModelCapability>;
    /**
     * Synchronous version that uses cached data only
     */
    getModelCapabilitySync(modelName?: string): ModelCapability;
    /**
     * Fallback heuristics for unknown models
     */
    private getCapabilityFromHeuristics;
    /**
     * Get model configuration for a given model name
     */
    getModelConfig(modelName: string): Promise<ModelConfig | undefined>;
    /**
     * Get context window size for a given model name
     */
    getContextWindow(modelName?: string): Promise<number>;
    /**
     * Synchronous version that uses cached data only for context window
     */
    getContextWindowSync(modelName?: string): number;
    /**
     * Get all registered models
     */
    getAllModels(): Promise<Record<string, ModelConfig>>;
    /**
     * Check if a model is registered
     */
    isModelRegistered(modelName: string): Promise<boolean>;
    /**
     * Get models by capability
     */
    getModelsByCapability(capability: ModelCapability): Promise<string[]>;
    /**
     * Force refresh models from API
     */
    refreshModels(): Promise<void>;
    /**
     * Get cache status
     */
    getCacheStatus(): {
        lastFetch: Date;
        isStale: boolean;
        modelCount: number;
    };
}
export {};
