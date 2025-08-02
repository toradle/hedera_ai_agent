import { StructuredTool, ToolParams } from '@langchain/core/tools';
import { CallbackManagerForToolRun } from '@langchain/core/callbacks/manager';
import { z } from 'zod';
import { HederaAgentKit } from '../../../agent/agent';
import { ModelCapability } from '../../../types/model-capability';
import { Logger } from '../../../utils/logger';
/**
 * Field processing configuration
 */
export interface FieldProcessor {
    maxLength?: number;
    truncateMessage?: string;
    summarize?: boolean;
    exclude?: boolean;
}
/**
 * Response processing strategy
 */
export interface ResponseStrategy {
    maxTokens: number;
    summarizeArrays?: boolean;
    maxArrayLength?: number;
    includeMetadata?: boolean;
}
/**
 * Parameters required to initialize a BaseHederaQueryTool.
 */
export interface BaseHederaQueryToolParams extends ToolParams {
    hederaKit: HederaAgentKit;
    logger?: Logger;
    modelCapability?: ModelCapability;
    customStrategy?: Partial<ResponseStrategy>;
}
/**
 * Base class for all Hedera query tools.
 * Handles common query processing logic across different tool types.
 * Unlike transaction tools, query tools are read-only and don't require signing.
 *
 * @template S - The Zod schema that defines the input parameters for the specific tool
 */
export declare abstract class BaseHederaQueryTool<S extends z.ZodObject<unknown, unknown, unknown, unknown>> extends StructuredTool<S> {
    protected hederaKit: HederaAgentKit;
    protected logger: Logger;
    protected responseStrategy: ResponseStrategy;
    protected modelCapability: ModelCapability;
    private notes;
    abstract specificInputSchema: S;
    abstract namespace: string;
    get schema(): S;
    constructor({ hederaKit, logger, modelCapability, customStrategy, ...rest }: BaseHederaQueryToolParams);
    /**
     * Execute the specific query operation.
     * This method should be implemented by concrete query tools.
     */
    protected abstract executeQuery(args: z.infer<S>, runManager?: CallbackManagerForToolRun): Promise<unknown>;
    /**
     * Tools can define which fields should be processed for size optimization.
     * Return a map of field paths to processing configurations.
     * Field paths support dot notation (e.g., 'contract.bytecode') and wildcards (e.g., '*.bytecode')
     */
    protected getLargeFieldProcessors?(args: z.infer<S>): Record<string, FieldProcessor>;
    /**
     * Allow tools to define custom response processing logic
     */
    protected processCustomResponse?(result: unknown, args: z.infer<S>): unknown;
    /**
     * Estimate token count (rough approximation: 1 token ≈ 4 characters)
     */
    private estimateTokens;
    /**
     * Check if a field path matches a pattern (supports wildcards)
     */
    private matchesPattern;
    /**
     * Process any data structure based on field processors and strategy
     */
    private processData;
    /**
     * Process array data
     */
    private processArray;
    /**
     * Process object data
     */
    private processObject;
    /**
     * Process string data
     */
    private processString;
    /**
     * Format the query result for return to the LLM.
     * Override this method to customize result formatting.
     */
    protected formatResult(result: unknown, args?: z.infer<S>): string;
    /**
     * Handle errors that occur during query execution.
     */
    protected handleError(error: unknown): string;
    /**
     * Main method called when the tool is executed.
     * Processes arguments, executes the query, and formats the result.
     */
    protected _call(args: z.infer<S>, runManager?: CallbackManagerForToolRun): Promise<string>;
    private getModelCapabilityLimits;
    private calculateArrayLimit;
    private addNote;
    private clearNotes;
    private getNotes;
    private processLargeFields;
    private processDataStructure;
    private getNestedValue;
    private setNestedValue;
}
