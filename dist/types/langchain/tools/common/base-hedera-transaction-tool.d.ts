import { z } from 'zod';
import { StructuredTool, ToolParams } from '@langchain/core/tools';
import { HederaAgentKit } from '../../../agent/agent';
import { CallbackManagerForToolRun } from '@langchain/core/callbacks/manager';
import { BaseServiceBuilder } from '../../../builders/base-service-builder';
import { Logger } from '../../../utils/logger';
/**
 * Zod schema for transaction meta options that can be used with any Hedera transaction tool.
 */
export declare const HederaTransactionMetaOptionsSchema: z.ZodOptional<z.ZodObject<{
    transactionMemo: z.ZodOptional<z.ZodString>;
    transactionId: z.ZodOptional<z.ZodString>;
    nodeAccountIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    schedule: z.ZodOptional<z.ZodBoolean>;
    scheduleMemo: z.ZodOptional<z.ZodString>;
    schedulePayerAccountId: z.ZodOptional<z.ZodString>;
    scheduleAdminKey: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    transactionId?: string | undefined;
    schedule?: boolean | undefined;
    scheduleMemo?: string | undefined;
    schedulePayerAccountId?: string | undefined;
    scheduleAdminKey?: string | undefined;
    transactionMemo?: string | undefined;
    nodeAccountIds?: string[] | undefined;
}, {
    transactionId?: string | undefined;
    schedule?: boolean | undefined;
    scheduleMemo?: string | undefined;
    schedulePayerAccountId?: string | undefined;
    scheduleAdminKey?: string | undefined;
    transactionMemo?: string | undefined;
    nodeAccountIds?: string[] | undefined;
}>>;
export type HederaTransactionMetaOptions = z.infer<typeof HederaTransactionMetaOptionsSchema>;
/**
 * Parameters required to initialize a BaseHederaTransactionTool.
 */
export interface BaseHederaTransactionToolParams extends ToolParams {
    hederaKit: HederaAgentKit;
    logger?: Logger;
}
/**
 * Base class for all Hedera transaction tools.
 * Handles common transaction processing logic across different tool types.
 *
 * @template S - The Zod schema that defines the input parameters for the specific tool
 */
export declare abstract class BaseHederaTransactionTool<S extends z.ZodObject<z.ZodRawShape, z.UnknownKeysParam, z.ZodTypeAny>> extends StructuredTool<z.ZodObject<S['shape'] & {
    metaOptions: typeof HederaTransactionMetaOptionsSchema;
}, z.UnknownKeysParam, z.ZodTypeAny, z.infer<S> & {
    metaOptions?: HederaTransactionMetaOptions;
}, z.infer<S> & {
    metaOptions?: HederaTransactionMetaOptions;
}>> {
    protected hederaKit: HederaAgentKit;
    protected logger: Logger;
    protected neverScheduleThisTool: boolean;
    /**
     * Indicates if this tool requires multiple transactions to complete.
     * Tools that require multiple transactions cannot be used in returnBytes mode.
     */
    protected requiresMultipleTransactions: boolean;
    abstract specificInputSchema: S;
    abstract namespace: string;
    get schema(): this['lc_kwargs']['schema'];
    constructor({ hederaKit, logger, ...rest }: BaseHederaTransactionToolParams);
    /**
     * Get the appropriate service builder for this tool's operations.
     */
    protected abstract getServiceBuilder(): BaseServiceBuilder;
    /**
     * Call the appropriate builder method with the tool-specific arguments.
     */
    protected abstract callBuilderMethod(builder: BaseServiceBuilder, specificArgs: z.infer<S>, runManager?: CallbackManagerForToolRun): Promise<void>;
    /**
     * Apply any meta options specified in the tool call to the service builder.
     */
    protected _applyMetaOptions(builder: BaseServiceBuilder, metaOpts: HederaTransactionMetaOptions | undefined, specificCallArgs: z.infer<S>): Promise<void>;
    /**
     * Handle substitution of special key field values like 'current_signer'
     */
    private _substituteKeyFields;
    /**
     * Apply transaction-specific options from metaOptions
     */
    private _applyTransactionOptions;
    /**
     * Handle direct execution mode for the transaction
     */
    private _handleAutonomous;
    /**
     * Handle providing transaction bytes mode
     */
    private _handleReturnBytes;
    /**
     * Determine if a transaction should be scheduled
     */
    private _shouldScheduleTransaction;
    /**
     * Handle creating a scheduled transaction
     */
    private _handleScheduledTransaction;
    /**
     * Handle returning transaction bytes for an unscheduled transaction
     */
    private _handleUnscheduledTransaction;
    /**
     * Build schedule options from meta options
     */
    private _buildScheduleOptions;
    /**
     * Optional method for concrete tools to provide a user-friendly note for a specific Zod-defaulted parameter.
     * @param key The key of the parameter that was defaulted by Zod.
     * @param schemaDefaultValue The default value defined in the Zod schema for this key.
     * @param actualValue The current/final value of the parameter after Zod parsing.
     * @returns A user-friendly string for the note, or undefined to use a generic note.
     */
    protected getNoteForKey?(key: string, schemaDefaultValue: unknown, actualValue: unknown): string | undefined;
    /**
     * Main method called when the tool is executed.
     * Processes arguments, calls the specific builder method, and handles
     * transaction execution based on the kit's operational mode.
     */
    protected _call(args: z.infer<ReturnType<this['schema']>>, runManager?: CallbackManagerForToolRun): Promise<string>;
    private _extractSpecificArgsFromCombinedArgs;
    private _handleError;
}
