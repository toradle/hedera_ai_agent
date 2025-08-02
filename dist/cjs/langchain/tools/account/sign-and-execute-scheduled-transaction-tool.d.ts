import { z } from 'zod';
import { BaseHederaTransactionTool, BaseHederaTransactionToolParams } from '../common/base-hedera-transaction-tool';
import { BaseServiceBuilder } from '../../../builders/base-service-builder';
declare const signAndExecuteScheduledTransactionSchema: z.ZodObject<{
    scheduleId: z.ZodString;
    memo: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    scheduleId: string;
    memo?: string | undefined;
}, {
    scheduleId: string;
    memo?: string | undefined;
}>;
export declare class SignAndExecuteScheduledTransactionTool extends BaseHederaTransactionTool<typeof signAndExecuteScheduledTransactionSchema> {
    name: string;
    description: string;
    specificInputSchema: z.ZodObject<{
        scheduleId: z.ZodString;
        memo: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        scheduleId: string;
        memo?: string | undefined;
    }, {
        scheduleId: string;
        memo?: string | undefined;
    }>;
    namespace: string;
    constructor(params: BaseHederaTransactionToolParams);
    protected getServiceBuilder(): BaseServiceBuilder;
    protected callBuilderMethod(builder: BaseServiceBuilder, specificArgs: z.infer<typeof signAndExecuteScheduledTransactionSchema>): Promise<void>;
}
export {};
