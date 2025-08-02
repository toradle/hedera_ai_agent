import { z } from 'zod';
import { BaseHederaTransactionTool, BaseHederaTransactionToolParams } from '../common/base-hedera-transaction-tool';
import { BaseServiceBuilder } from '../../../builders/base-service-builder';
declare const DeleteContractZodSchemaCore: z.ZodObject<{
    contractId: z.ZodString;
    transferAccountId: z.ZodOptional<z.ZodString>;
    transferContractId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    contractId: string;
    transferAccountId?: string | undefined;
    transferContractId?: string | undefined;
}, {
    contractId: string;
    transferAccountId?: string | undefined;
    transferContractId?: string | undefined;
}>;
export declare class HederaDeleteContractTool extends BaseHederaTransactionTool<typeof DeleteContractZodSchemaCore> {
    name: string;
    description: string;
    specificInputSchema: z.ZodObject<{
        contractId: z.ZodString;
        transferAccountId: z.ZodOptional<z.ZodString>;
        transferContractId: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        contractId: string;
        transferAccountId?: string | undefined;
        transferContractId?: string | undefined;
    }, {
        contractId: string;
        transferAccountId?: string | undefined;
        transferContractId?: string | undefined;
    }>;
    namespace: string;
    constructor(params: BaseHederaTransactionToolParams);
    protected getServiceBuilder(): BaseServiceBuilder;
    protected callBuilderMethod(builder: BaseServiceBuilder, specificArgs: z.infer<typeof DeleteContractZodSchemaCore>): Promise<void>;
}
export {};
