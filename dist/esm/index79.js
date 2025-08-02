import { BaseCallbackHandler } from "@langchain/core/callbacks/base";
import { Logger } from "./index77.js";
const DEFAULT_MODEL = "gpt-4o-mini";
class ModelPricingManager {
  constructor() {
    this.pricingCache = /* @__PURE__ */ new Map();
    this.lastFetchTime = 0;
    this.CACHE_DURATION = 24 * 60 * 60 * 1e3;
    this.OPENROUTER_API_URL = "https://openrouter.ai/api/v1/models";
    this.DEFAULT_MODEL = "gpt-4o-mini";
    this.logger = new Logger({ module: "ModelPricingManager", level: "info" });
    this.initializeFallbackPricing();
  }
  static getInstance() {
    if (!ModelPricingManager.instance) {
      ModelPricingManager.instance = new ModelPricingManager();
    }
    return ModelPricingManager.instance;
  }
  initializeFallbackPricing() {
    const fallbackPricing = {
      "gpt-4o": { prompt: 5e-3, completion: 0.015 },
      [this.DEFAULT_MODEL]: { prompt: 15e-5, completion: 6e-4 },
      "gpt-4-turbo": { prompt: 0.01, completion: 0.03 },
      "gpt-4": { prompt: 0.03, completion: 0.06 },
      "gpt-3.5-turbo": { prompt: 5e-4, completion: 15e-4 }
    };
    for (const [model, pricing] of Object.entries(fallbackPricing)) {
      this.pricingCache.set(model, pricing);
    }
  }
  async fetchPricingFromAPI() {
    try {
      const response = await fetch(this.OPENROUTER_API_URL, {
        headers: {
          Accept: "application/json",
          "User-Agent": "hedera-agent-kit/1.0"
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      const models = data.data || [];
      for (const model of models) {
        if (model.pricing?.prompt && model.pricing?.completion) {
          const promptPrice = parseFloat(model.pricing.prompt);
          const completionPrice = parseFloat(model.pricing.completion);
          if (!isNaN(promptPrice) && !isNaN(completionPrice)) {
            this.pricingCache.set(model.id, {
              prompt: promptPrice * 1e3,
              completion: completionPrice * 1e3
            });
            const simplifiedId = this.getSimplifiedModelId(model.id);
            if (simplifiedId !== model.id) {
              this.pricingCache.set(simplifiedId, {
                prompt: promptPrice * 1e3,
                completion: completionPrice * 1e3
              });
            }
          }
        }
      }
      this.lastFetchTime = Date.now();
      this.logger.info(
        `Loaded pricing for ${models.length} models from OpenRouter API`
      );
    } catch (error) {
      this.logger.warn(
        "Failed to fetch pricing from API, using fallback pricing",
        error
      );
    }
  }
  getSimplifiedModelId(fullId) {
    const prefixes = [
      "openai/",
      "anthropic/",
      "google/",
      "mistralai/",
      "meta-llama/"
    ];
    for (const prefix of prefixes) {
      if (fullId.startsWith(prefix)) {
        return fullId.replace(prefix, "");
      }
    }
    return fullId;
  }
  async ensurePricingLoaded() {
    const now = Date.now();
    const shouldRefresh = now - this.lastFetchTime > this.CACHE_DURATION;
    if (shouldRefresh || this.pricingCache.size < 10) {
      await this.fetchPricingFromAPI();
    }
  }
  async getPricing(modelName) {
    await this.ensurePricingLoaded();
    const exactMatch = this.pricingCache.get(modelName);
    if (exactMatch) {
      return exactMatch;
    }
    const normalizedName = modelName.toLowerCase();
    for (const [key, value] of this.pricingCache.entries()) {
      if (key.toLowerCase().includes(normalizedName) || normalizedName.includes(key.toLowerCase())) {
        return value;
      }
    }
    return this.pricingCache.get(this.DEFAULT_MODEL) || {
      prompt: 15e-5,
      completion: 6e-4
    };
  }
  getPricingSync(modelName) {
    const exactMatch = this.pricingCache.get(modelName);
    if (exactMatch) {
      return exactMatch;
    }
    const normalizedName = modelName.toLowerCase();
    for (const [key, value] of this.pricingCache.entries()) {
      if (key.toLowerCase().includes(normalizedName) || normalizedName.includes(key.toLowerCase())) {
        return value;
      }
    }
    return this.pricingCache.get(this.DEFAULT_MODEL) || {
      prompt: 15e-5,
      completion: 6e-4
    };
  }
}
class TokenUsageCallbackHandler extends BaseCallbackHandler {
  constructor(modelName, logger) {
    super();
    this.name = "TokenUsageCallbackHandler";
    this.tokenUsageHistory = [];
    this.currentTokenUsage = void 0;
    this.modelName = modelName;
    this.logger = logger || new Logger({ module: "TokenUsageTracker", level: "info" });
  }
  async handleLLMEnd(output) {
    try {
      if (output.llmOutput?.tokenUsage) {
        this.currentTokenUsage = {
          promptTokens: output.llmOutput.tokenUsage.promptTokens || 0,
          completionTokens: output.llmOutput.tokenUsage.completionTokens || 0,
          totalTokens: output.llmOutput.tokenUsage.totalTokens || 0,
          modelName: this.modelName,
          timestamp: /* @__PURE__ */ new Date()
        };
        this.tokenUsageHistory.push(this.currentTokenUsage);
        this.logger.debug("Token usage tracked:", {
          promptTokens: this.currentTokenUsage.promptTokens,
          completionTokens: this.currentTokenUsage.completionTokens,
          totalTokens: this.currentTokenUsage.totalTokens,
          model: this.modelName
        });
      }
    } catch (error) {
      this.logger.error("Failed to track token usage:", error);
    }
  }
  getLatestTokenUsage() {
    return this.currentTokenUsage;
  }
  getTokenUsageHistory() {
    return [...this.tokenUsageHistory];
  }
  getTotalTokenUsage() {
    const total = this.tokenUsageHistory.reduce(
      (acc, usage) => ({
        promptTokens: acc.promptTokens + usage.promptTokens,
        completionTokens: acc.completionTokens + usage.completionTokens,
        totalTokens: acc.totalTokens + usage.totalTokens
      }),
      { promptTokens: 0, completionTokens: 0, totalTokens: 0 }
    );
    return {
      ...total,
      modelName: this.modelName,
      timestamp: /* @__PURE__ */ new Date()
    };
  }
  reset() {
    this.currentTokenUsage = void 0;
    this.tokenUsageHistory = [];
  }
}
async function calculateTokenCost(tokenUsage, modelName) {
  const model = modelName || tokenUsage.modelName || DEFAULT_MODEL;
  const pricingManager = ModelPricingManager.getInstance();
  const pricing = await pricingManager.getPricing(model);
  const promptCost = tokenUsage.promptTokens / 1e3 * pricing.prompt;
  const completionCost = tokenUsage.completionTokens / 1e3 * pricing.completion;
  return {
    promptCost,
    completionCost,
    totalCost: promptCost + completionCost,
    currency: "USD"
  };
}
function calculateTokenCostSync(tokenUsage, modelName) {
  const model = modelName || tokenUsage.modelName || DEFAULT_MODEL;
  const pricingManager = ModelPricingManager.getInstance();
  const pricing = pricingManager.getPricingSync(model);
  const promptCost = tokenUsage.promptTokens / 1e3 * pricing.prompt;
  const completionCost = tokenUsage.completionTokens / 1e3 * pricing.completion;
  return {
    promptCost,
    completionCost,
    totalCost: promptCost + completionCost,
    currency: "USD"
  };
}
function formatCost(cost, precision = 6) {
  return `$${cost.totalCost.toFixed(precision)} ${cost.currency}`;
}
function estimateTokens(text) {
  return Math.ceil(text.length / 4);
}
export {
  ModelPricingManager,
  TokenUsageCallbackHandler,
  calculateTokenCost,
  calculateTokenCostSync,
  estimateTokens,
  formatCost
};
//# sourceMappingURL=index79.js.map
