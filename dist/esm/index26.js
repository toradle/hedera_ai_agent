import { z } from "zod";
import { StructuredTool } from "@langchain/core/tools";
import { TransactionId, AccountId } from "@hashgraph/sdk";
import { parseKey } from "./index80.js";
const HederaTransactionMetaOptionsSchema = z.object({
  transactionMemo: z.string().optional().describe("Optional memo for the Hedera transaction."),
  transactionId: z.string().optional().describe(
    "Optional transaction ID to use (e.g., for pre-generated IDs)."
  ),
  nodeAccountIds: z.array(z.string()).optional().describe(
    "Optional specific node account IDs to target for the transaction."
  ),
  schedule: z.boolean().optional().describe(
    "Set to true to schedule the transaction. If true, output will be for a ScheduleCreate transaction."
  ),
  scheduleMemo: z.string().optional().describe("Optional memo for the ScheduleCreate transaction itself."),
  schedulePayerAccountId: z.string().optional().describe(
    "Optional payer account ID for the ScheduleCreate transaction."
  ),
  scheduleAdminKey: z.string().optional().describe(
    "Optional admin key (serialized string) for the ScheduleCreate transaction. Builder parses."
  )
}).optional();
class BaseHederaTransactionTool extends StructuredTool {
  constructor({ hederaKit, logger, ...rest }) {
    super(rest);
    this.neverScheduleThisTool = false;
    this.requiresMultipleTransactions = false;
    this.hederaKit = hederaKit;
    this.logger = logger || hederaKit.logger;
  }
  //@ts-ignore: Ignoring complex type compatibility issues
  get schema() {
    return this.specificInputSchema.extend({
      metaOptions: HederaTransactionMetaOptionsSchema
    });
  }
  /**
   * Apply any meta options specified in the tool call to the service builder.
   */
  async _applyMetaOptions(builder, metaOpts, specificCallArgs) {
    await this._substituteKeyFields(specificCallArgs);
    this._applyTransactionOptions(builder, metaOpts);
  }
  /**
   * Handle substitution of special key field values like 'current_signer'
   */
  async _substituteKeyFields(specificCallArgs) {
    const keyFieldNames = [
      "adminKey",
      "kycKey",
      "freezeKey",
      "wipeKey",
      "supplyKey",
      "feeScheduleKey",
      "pauseKey"
    ];
    for (const keyField of keyFieldNames) {
      const originalKeyValue = specificCallArgs[keyField];
      if (originalKeyValue === "current_signer") {
        try {
          const operatorPubKey = await this.hederaKit.signer.getPublicKey();
          const pubKeyString = operatorPubKey.toStringDer();
          specificCallArgs[keyField] = pubKeyString;
          this.logger.info(
            `Substituted ${keyField} with current signer's public key.`
          );
        } catch (error) {
          const typedError = error;
          this.logger.error(
            `Failed to get current signer's public key for ${keyField} substitution: ${typedError.message}`,
            error
          );
        }
      }
    }
  }
  /**
   * Apply transaction-specific options from metaOptions
   */
  _applyTransactionOptions(builder, metaOptions) {
    if (!metaOptions) return;
    if (metaOptions.transactionId) {
      try {
        builder.setTransactionId(
          TransactionId.fromString(metaOptions.transactionId)
        );
      } catch {
        this.logger.warn(
          `Invalid transactionId format in metaOptions: ${metaOptions.transactionId}, ignoring.`
        );
      }
    }
    if (metaOptions.nodeAccountIds && metaOptions.nodeAccountIds.length > 0) {
      try {
        builder.setNodeAccountIds(
          metaOptions.nodeAccountIds.map(
            (id) => AccountId.fromString(id)
          )
        );
      } catch {
        this.logger.warn(
          `Invalid nodeAccountId format in metaOptions, ignoring.`
        );
      }
    }
    if (metaOptions.transactionMemo) {
      builder.setTransactionMemo(metaOptions.transactionMemo);
    }
  }
  /**
   * Handle direct execution mode for the transaction
   */
  async _handleAutonomous(builder, metaOpts, allNotes) {
    const execOptions = this._buildScheduleOptions(metaOpts);
    this.logger.info(
      `Executing transaction directly (mode: autonomous): ${this.name}`
    );
    const result = await builder.execute(execOptions);
    return JSON.stringify({ ...result, notes: allNotes });
  }
  /**
   * Handle providing transaction bytes mode
   */
  async _handleReturnBytes(builder, metaOpts, allNotes) {
    if (this.requiresMultipleTransactions) {
      const errorMessage = `The ${this.name} tool requires multiple transactions and cannot be used in returnBytes mode. Please use autonomous mode or break down the operation into individual steps.`;
      this.logger.warn(errorMessage);
      return JSON.stringify({
        success: false,
        error: errorMessage,
        requiresAutonomous: true,
        notes: allNotes
      });
    }
    const shouldSchedule = this._shouldScheduleTransaction(metaOpts);
    if (shouldSchedule) {
      return this._handleScheduledTransaction(builder, metaOpts, allNotes);
    } else {
      return this._handleUnscheduledTransaction(builder, allNotes);
    }
  }
  /**
   * Determine if a transaction should be scheduled
   */
  _shouldScheduleTransaction(metaOptions) {
    return !this.neverScheduleThisTool && (metaOptions?.schedule ?? (this.hederaKit.operationalMode === "returnBytes" && this.hederaKit.scheduleUserTransactionsInBytesMode));
  }
  /**
   * Handle creating a scheduled transaction
   */
  async _handleScheduledTransaction(builder, metaOpts, allNotes) {
    this.logger.info(
      `Preparing scheduled transaction (mode: returnBytes, schedule: true): ${this.name}`
    );
    const execOptions = this._buildScheduleOptions(metaOpts, true);
    execOptions.schedulePayerAccountId = this.hederaKit.signer.getAccountId();
    const scheduleCreateResult = await builder.execute(execOptions);
    if (scheduleCreateResult.success && scheduleCreateResult.scheduleId) {
      const description = metaOpts?.transactionMemo || `Scheduled ${this.name} operation.`;
      const userInfo = this.hederaKit.userAccountId ? ` User (${this.hederaKit.userAccountId}) will be payer of scheduled transaction.` : "";
      return JSON.stringify({
        success: true,
        op: "schedule_create",
        scheduleId: scheduleCreateResult.scheduleId.toString(),
        description: description + userInfo,
        payer_account_id_scheduled_tx: this.hederaKit.userAccountId || "unknown",
        memo_scheduled_tx: metaOpts?.transactionMemo,
        notes: allNotes
      });
    } else {
      return JSON.stringify({
        success: false,
        error: scheduleCreateResult.error || "Failed to create schedule and retrieve ID.",
        notes: allNotes
      });
    }
  }
  /**
   * Handle returning transaction bytes for an unscheduled transaction
   */
  async _handleUnscheduledTransaction(builder, allNotes) {
    this.logger.info(
      `Returning transaction bytes (mode: returnBytes, schedule: false): ${this.name}`
    );
    const bytes = await builder.getTransactionBytes({});
    return JSON.stringify({
      success: true,
      transactionBytes: bytes,
      transactionId: builder.getCurrentTransaction()?.transactionId?.toString(),
      notes: allNotes
    });
  }
  /**
   * Build schedule options from meta options
   */
  _buildScheduleOptions(metaOptions, forceSchedule = false) {
    const options = {};
    if (forceSchedule || metaOptions?.schedule) {
      options.schedule = true;
      if (metaOptions?.scheduleMemo) {
        options.scheduleMemo = metaOptions.scheduleMemo;
      }
      if (metaOptions?.schedulePayerAccountId) {
        try {
          options.schedulePayerAccountId = AccountId.fromString(
            metaOptions.schedulePayerAccountId
          );
        } catch {
          this.logger.warn("Invalid schedulePayerAccountId");
        }
      }
      if (metaOptions?.scheduleAdminKey) {
        try {
          const parsedKey = parseKey(metaOptions.scheduleAdminKey);
          if (parsedKey) options.scheduleAdminKey = parsedKey;
        } catch {
          this.logger.warn("Invalid scheduleAdminKey");
        }
      }
    }
    return options;
  }
  /**
   * Optional method for concrete tools to provide a user-friendly note for a specific Zod-defaulted parameter.
   * @param key The key of the parameter that was defaulted by Zod.
   * @param schemaDefaultValue The default value defined in the Zod schema for this key.
   * @param actualValue The current/final value of the parameter after Zod parsing.
   * @returns A user-friendly string for the note, or undefined to use a generic note.
   */
  getNoteForKey(key, schemaDefaultValue, actualValue) {
    return void 0;
  }
  /**
   * Main method called when the tool is executed.
   * Processes arguments, calls the specific builder method, and handles
   * transaction execution based on the kit's operational mode.
   */
  async _call(args, runManager) {
    const llmProvidedMetaOptions = args.metaOptions;
    const specificCallArgs = this._extractSpecificArgsFromCombinedArgs(args);
    this.logger.info(
      `Executing ${this.name} with Zod-parsed specific args (schema defaults applied by LangChain):`,
      JSON.parse(JSON.stringify(specificCallArgs)),
      "and metaOptions:",
      llmProvidedMetaOptions
    );
    const zodSchemaInfoNotes = [];
    if (this.specificInputSchema && this.specificInputSchema.shape) {
      for (const key in this.specificInputSchema.shape) {
        if (Object.prototype.hasOwnProperty.call(
          this.specificInputSchema.shape,
          key
        )) {
          const fieldSchema = this.specificInputSchema.shape[key];
          if (fieldSchema._def && fieldSchema._def.typeName === "ZodDefault") {
            const defaultValueOrFn = fieldSchema._def.defaultValue();
            let schemaDefinedDefaultValue = defaultValueOrFn;
            if (typeof defaultValueOrFn === "function") {
              try {
                schemaDefinedDefaultValue = defaultValueOrFn();
              } catch (eDefaultFn) {
                this.logger.warn(
                  `Could not execute default value function for key ${key}. Error: ${eDefaultFn.message}`
                );
                schemaDefinedDefaultValue = "[dynamic schema default]";
              }
            }
            const currentValue = specificCallArgs[key];
            let noteMessage;
            if (this.getNoteForKey) {
              noteMessage = this.getNoteForKey(
                key,
                schemaDefinedDefaultValue,
                currentValue
              );
            }
            if (!noteMessage) {
              noteMessage = `For the parameter '${key}', the value '${JSON.stringify(
                currentValue
              )}' was used. This field has a tool schema default of '${JSON.stringify(
                schemaDefinedDefaultValue
              )}'.`;
            }
            zodSchemaInfoNotes.push(noteMessage);
          }
        }
      }
    }
    this.logger.debug("Zod Schema Default Info Notes:", zodSchemaInfoNotes);
    try {
      const builder = this.getServiceBuilder();
      builder.clearNotes();
      await this.callBuilderMethod(builder, specificCallArgs, runManager);
      await this._applyMetaOptions(
        builder,
        llmProvidedMetaOptions,
        specificCallArgs
      );
      const builderAppliedDefaultNotes = builder.getNotes();
      this.logger.debug(
        "Builder Applied Default Notes:",
        builderAppliedDefaultNotes
      );
      const allNotes = [...zodSchemaInfoNotes, ...builderAppliedDefaultNotes];
      this.logger.debug("All Notes combined:", allNotes);
      if (this.hederaKit.operationalMode === "autonomous") {
        return this._handleAutonomous(
          builder,
          llmProvidedMetaOptions,
          allNotes
        );
      } else {
        return this._handleReturnBytes(
          builder,
          llmProvidedMetaOptions,
          allNotes
        );
      }
    } catch (error) {
      const builder = this.getServiceBuilder();
      const builderNotesOnError = builder ? builder.getNotes() : [];
      const allNotesOnError = [...zodSchemaInfoNotes, ...builderNotesOnError];
      return this._handleError(error, allNotesOnError);
    }
  }
  _extractSpecificArgsFromCombinedArgs(combinedArgs) {
    const specificArgs = {};
    if (this.specificInputSchema && this.specificInputSchema.shape) {
      for (const key in this.specificInputSchema.shape) {
        if (Object.prototype.hasOwnProperty.call(combinedArgs, key)) {
          specificArgs[key] = combinedArgs[key];
        }
      }
    }
    return specificArgs;
  }
  _handleError(error, notes) {
    const errorMessage = error instanceof Error ? error.message : JSON.stringify(error);
    this.logger.error(`Error in ${this.name}: ${errorMessage}`, error);
    return JSON.stringify({
      success: false,
      error: errorMessage,
      notes: notes || []
    });
  }
}
export {
  BaseHederaTransactionTool,
  HederaTransactionMetaOptionsSchema
};
//# sourceMappingURL=index26.js.map
