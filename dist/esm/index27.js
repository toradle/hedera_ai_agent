import { StructuredTool } from "@langchain/core/tools";
import { ModelCapabilityDetector } from "./index78.js";
import { ModelCapability } from "./index91.js";
const MODEL_STRATEGIES = {
  [ModelCapability.SMALL]: {
    maxTokens: 4e3,
    summarizeArrays: true,
    maxArrayLength: 3,
    includeMetadata: true
  },
  [ModelCapability.MEDIUM]: {
    maxTokens: 12e3,
    summarizeArrays: false,
    maxArrayLength: 10,
    includeMetadata: true
  },
  [ModelCapability.LARGE]: {
    maxTokens: 32e3,
    summarizeArrays: false,
    maxArrayLength: 50,
    includeMetadata: false
  },
  [ModelCapability.UNLIMITED]: {
    maxTokens: Infinity,
    summarizeArrays: false,
    includeMetadata: false
  }
};
class BaseHederaQueryTool extends StructuredTool {
  constructor({
    hederaKit,
    logger,
    modelCapability = ModelCapability.MEDIUM,
    customStrategy,
    ...rest
  }) {
    super(rest);
    this.notes = [];
    this.hederaKit = hederaKit;
    this.logger = logger || hederaKit.logger;
    this.modelCapability = modelCapability;
    const baseStrategy = MODEL_STRATEGIES[modelCapability];
    this.responseStrategy = { ...baseStrategy, ...customStrategy };
    this.logger.debug(
      `Initialized query tool with ${modelCapability} capability strategy`
    );
  }
  get schema() {
    return this.specificInputSchema;
  }
  /**
   * Estimate token count (rough approximation: 1 token ≈ 4 characters)
   */
  estimateTokens(text) {
    return Math.ceil(text.length / 4);
  }
  /**
   * Check if a field path matches a pattern (supports wildcards)
   */
  matchesPattern(fieldPath, pattern) {
    if (pattern === fieldPath) return true;
    if (pattern.includes("*")) {
      const regex = new RegExp("^" + pattern.replace(/\*/g, "[^.]*") + "$");
      return regex.test(fieldPath);
    }
    return false;
  }
  /**
   * Process any data structure based on field processors and strategy
   */
  processData(data, args, path = "") {
    if (this.responseStrategy.maxTokens === Infinity) {
      return data;
    }
    const processors = this.getLargeFieldProcessors ? this.getLargeFieldProcessors(args) : {};
    if (data === null || data === void 0) {
      return data;
    }
    if (Array.isArray(data)) {
      return this.processArray(data, args, path);
    }
    if (typeof data === "object" && data !== null && !Array.isArray(data)) {
      return this.processObject(
        data,
        args,
        path,
        processors
      );
    }
    if (typeof data === "string") {
      return this.processString(data, path, processors);
    }
    return data;
  }
  /**
   * Process array data
   */
  processArray(arr, args, path) {
    const processedArray = arr.map(
      (item, index) => this.processData(item, args, `${path}[${index}]`)
    );
    if (this.responseStrategy.summarizeArrays && this.responseStrategy.maxArrayLength && arr.length > this.responseStrategy.maxArrayLength) {
      const maxLength = this.responseStrategy.maxArrayLength;
      const takeFirst = Math.floor(maxLength / 2);
      const takeLast = maxLength - takeFirst - 1;
      return [
        ...processedArray.slice(0, takeFirst),
        {
          _summary: `[${arr.length - maxLength} items truncated]`,
          _originalLength: arr.length,
          _truncatedAt: path
        },
        ...processedArray.slice(-takeLast)
      ];
    }
    return processedArray;
  }
  /**
   * Process object data
   */
  processObject(obj, args, path, processors) {
    const result = {};
    for (const [key, value] of Object.entries(obj)) {
      const fieldPath = path ? `${path}.${key}` : key;
      const matchingEntry = Object.entries(processors).find(
        ([pattern]) => this.matchesPattern(fieldPath, pattern)
      );
      const matchingProcessor = matchingEntry ? matchingEntry[1] : void 0;
      if (matchingProcessor && matchingProcessor.exclude) {
        continue;
      }
      result[key] = this.processData(value, args, fieldPath);
    }
    return result;
  }
  /**
   * Process string data
   */
  processString(str, path, processors) {
    const matchingEntry = Object.entries(processors).find(
      ([pattern]) => this.matchesPattern(path, pattern)
    );
    const matchingProcessor = matchingEntry ? matchingEntry[1] : void 0;
    if (matchingProcessor && matchingProcessor.maxLength && str.length > matchingProcessor.maxLength) {
      const truncated = str.substring(0, matchingProcessor.maxLength);
      const message = matchingProcessor.truncateMessage ? matchingProcessor.truncateMessage : `[TRUNCATED: ${str.length} chars total]`;
      return `${truncated}...${message}`;
    }
    return str;
  }
  /**
   * Format the query result for return to the LLM.
   * Override this method to customize result formatting.
   */
  formatResult(result, args) {
    if (typeof result === "string") {
      return result;
    }
    let processedResult = result;
    if (this.processCustomResponse && args) {
      processedResult = this.processCustomResponse(processedResult, args);
    }
    processedResult = this.processData(
      processedResult,
      args || {}
    );
    const jsonString = JSON.stringify(processedResult, null, 2);
    const estimatedTokens = this.estimateTokens(jsonString);
    if (this.responseStrategy.includeMetadata && estimatedTokens > this.responseStrategy.maxTokens * 0.8) {
      const responseWithMeta = {
        ...typeof processedResult === "object" && processedResult !== null ? processedResult : { data: processedResult },
        _meta: {
          estimatedTokens,
          maxTokens: this.responseStrategy.maxTokens,
          capability: Object.keys(MODEL_STRATEGIES).find(
            (key) => MODEL_STRATEGIES[key] === this.responseStrategy
          ),
          note: "Response may be truncated. Use higher model capability for full data."
        }
      };
      return JSON.stringify(responseWithMeta, null, 2);
    }
    return jsonString;
  }
  /**
   * Handle errors that occur during query execution.
   */
  handleError(error) {
    const errorMessage = error instanceof Error ? error.message : JSON.stringify(error);
    this.logger.error(`Error in query tool: ${errorMessage}`, error);
    return JSON.stringify({
      success: false,
      error: errorMessage
    });
  }
  /**
   * Main method called when the tool is executed.
   * Processes arguments, executes the query, and formats the result.
   */
  async _call(args, runManager) {
    this.clearNotes();
    try {
      this.logger.info(
        `Executing ${this.name} with model capability: ${this.modelCapability}`
      );
      const rawData = await this.executeQuery(args, runManager);
      const processed = await this.processLargeFields(rawData, args);
      const allNotes = this.getNotes();
      if (typeof processed.data === "object" && processed.data !== null && "success" in processed.data) {
        const toolResponse = processed.data;
        const response2 = {
          ...toolResponse,
          ...allNotes.length > 0 && {
            notes: [...toolResponse.notes || [], ...allNotes]
          }
        };
        return JSON.stringify(response2);
      }
      const response = {
        success: true,
        data: processed.data,
        ...allNotes.length > 0 && { notes: allNotes }
      };
      return JSON.stringify(response);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      this.logger.error(`Error in ${this.name}: ${errorMessage}`, error);
      const allNotes = this.getNotes();
      return JSON.stringify({
        success: false,
        error: errorMessage,
        ...allNotes.length > 0 && { notes: allNotes }
      });
    }
  }
  async getModelCapabilityLimits() {
    if (this.modelCapability === ModelCapability.UNLIMITED) {
      return { maxTokens: Infinity, arrayLimit: Infinity };
    }
    try {
      const detector = ModelCapabilityDetector.getInstance();
      if (this.hederaKit.modelName) {
        const contextWindow = await detector.getContextWindow(
          this.hederaKit.modelName
        );
        if (contextWindow > 0) {
          const toolDefinitionsReserve = Math.floor(contextWindow * 0.6);
          const responseReserve = Math.floor(contextWindow * 0.2);
          const availableTokens = contextWindow - toolDefinitionsReserve - responseReserve;
          const arrayLimit = this.calculateArrayLimit(availableTokens);
          return {
            maxTokens: Math.max(availableTokens, 1e3),
            arrayLimit
          };
        }
      }
      const allModels = await detector.getAllModels();
      let maxContextWindow = 0;
      for (const [, config] of Object.entries(allModels)) {
        if (config.capability === this.modelCapability && config.contextWindow > maxContextWindow) {
          maxContextWindow = config.contextWindow;
        }
      }
      if (maxContextWindow > 0) {
        const toolDefinitionsReserve = Math.floor(maxContextWindow * 0.6);
        const responseReserve = Math.floor(maxContextWindow * 0.2);
        const availableTokens = maxContextWindow - toolDefinitionsReserve - responseReserve;
        const arrayLimit = this.calculateArrayLimit(availableTokens);
        return {
          maxTokens: Math.max(availableTokens, 1e3),
          arrayLimit
        };
      }
    } catch (error) {
      this.logger.warn(
        "Failed to get model context window, using fallback limits",
        error
      );
    }
    switch (this.modelCapability) {
      case ModelCapability.SMALL:
        return { maxTokens: 1e3, arrayLimit: 3 };
      case ModelCapability.MEDIUM:
        return { maxTokens: 4e3, arrayLimit: 10 };
      case ModelCapability.LARGE:
        return { maxTokens: 12e3, arrayLimit: 30 };
      default:
        return { maxTokens: 4e3, arrayLimit: 10 };
    }
  }
  calculateArrayLimit(availableTokens) {
    if (availableTokens < 8e3) {
      return 5;
    }
    if (availableTokens < 5e4) {
      return 20;
    }
    if (availableTokens < 1e5) {
      return 50;
    }
    return 100;
  }
  addNote(note) {
    this.notes.push(note);
  }
  clearNotes() {
    this.notes = [];
  }
  getNotes() {
    return [...this.notes];
  }
  async processLargeFields(data, args) {
    const result = {
      data: JSON.parse(JSON.stringify(data)),
      notes: []
    };
    if (this.modelCapability === ModelCapability.UNLIMITED) {
      return result;
    }
    const processors = this.getLargeFieldProcessors && args ? this.getLargeFieldProcessors(args) : {};
    const limits = await this.getModelCapabilityLimits();
    for (const [path, processorConfig] of Object.entries(processors)) {
      const value = this.getNestedValue(result.data, path);
      if (typeof value === "string" && processorConfig.maxLength && value.length > processorConfig.maxLength) {
        const truncated = value.substring(0, processorConfig.maxLength);
        this.setNestedValue(result.data, path, truncated);
        const userFriendlyMessage = processorConfig.truncateMessage ? processorConfig.truncateMessage : `Large data field was shortened to fit your model's capacity`;
        this.addNote(
          `${userFriendlyMessage}. Original size: ${value.length} characters, shown: ${processorConfig.maxLength} characters.`
        );
      }
    }
    result.data = this.processDataStructure(result.data, limits, result.notes);
    return result;
  }
  processDataStructure(data, limits, notes) {
    if (Array.isArray(data)) {
      if (data.length > limits.arrayLimit) {
        const truncated = data.slice(0, limits.arrayLimit);
        this.addNote(
          `List was shortened to fit your model's capacity. Showing ${limits.arrayLimit} of ${data.length} items.`
        );
        return truncated.map(
          (item) => this.processDataStructure(item, limits, notes)
        );
      }
      return data.map((item) => this.processDataStructure(item, limits, notes));
    }
    if (data && typeof data === "object" && !Array.isArray(data)) {
      const processed = {};
      for (const [key, value] of Object.entries(
        data
      )) {
        processed[key] = this.processDataStructure(value, limits, notes);
      }
      return processed;
    }
    return data;
  }
  getNestedValue(obj, path) {
    return path.split(".").reduce((current, key) => {
      if (!current || typeof current !== "object") {
        return void 0;
      }
      const currentObj = current;
      if (key.includes("[") && key.includes("]")) {
        const [arrayKey, indexStr] = key.split("[");
        const index = parseInt(indexStr.replace("]", ""));
        const arrayValue = currentObj[arrayKey];
        return Array.isArray(arrayValue) ? arrayValue[index] : void 0;
      }
      return currentObj[key];
    }, obj);
  }
  setNestedValue(obj, path, value) {
    if (!obj || typeof obj !== "object") {
      return;
    }
    const keys = path.split(".");
    const lastKey = keys.pop();
    const target = keys.reduce((current, key) => {
      if (!current || typeof current !== "object") {
        return current;
      }
      const currentObj = current;
      if (key.includes("[") && key.includes("]")) {
        const [arrayKey, indexStr] = key.split("[");
        const index = parseInt(indexStr.replace("]", ""));
        const arrayValue = currentObj[arrayKey];
        return Array.isArray(arrayValue) ? arrayValue[index] : void 0;
      }
      return currentObj[key];
    }, obj);
    if (!target || typeof target !== "object") {
      return;
    }
    const targetObj = target;
    if (lastKey.includes("[") && lastKey.includes("]")) {
      const [arrayKey, indexStr] = lastKey.split("[");
      const index = parseInt(indexStr.replace("]", ""));
      const arrayValue = targetObj[arrayKey];
      if (Array.isArray(arrayValue)) {
        arrayValue[index] = value;
      }
    } else {
      targetObj[lastKey] = value;
    }
  }
}
export {
  BaseHederaQueryTool
};
//# sourceMappingURL=index27.js.map
