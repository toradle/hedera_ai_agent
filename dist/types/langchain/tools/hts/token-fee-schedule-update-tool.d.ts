import { z } from 'zod';
import { BaseHederaTransactionTool, BaseHederaTransactionToolParams } from '../common/base-hedera-transaction-tool';
import { BaseServiceBuilder } from '../../../builders/base-service-builder';
declare const TokenFeeScheduleUpdateZodSchemaCore: z.ZodObject<{
    tokenId: z.ZodString;
    customFees: z.ZodArray<z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
        type: z.ZodLiteral<"FIXED">;
        feeCollectorAccountId: z.ZodString;
        denominatingTokenId: z.ZodOptional<z.ZodString>;
        amount: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
    }, "strip", z.ZodTypeAny, {
        type: "FIXED";
        amount: string | number;
        feeCollectorAccountId: string;
        denominatingTokenId?: string | undefined;
    }, {
        type: "FIXED";
        amount: string | number;
        feeCollectorAccountId: string;
        denominatingTokenId?: string | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"FRACTIONAL">;
        feeCollectorAccountId: z.ZodString;
        numerator: z.ZodNumber;
        denominator: z.ZodNumber;
        assessmentMethodInclusive: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        type: "FRACTIONAL";
        feeCollectorAccountId: string;
        numerator: number;
        denominator: number;
        assessmentMethodInclusive?: boolean | undefined;
    }, {
        type: "FRACTIONAL";
        feeCollectorAccountId: string;
        numerator: number;
        denominator: number;
        assessmentMethodInclusive?: boolean | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"ROYALTY">;
        feeCollectorAccountId: z.ZodString;
        numerator: z.ZodNumber;
        denominator: z.ZodNumber;
        fallbackFee: z.ZodOptional<z.ZodObject<Omit<{
            type: z.ZodLiteral<"FIXED">;
            feeCollectorAccountId: z.ZodString;
            denominatingTokenId: z.ZodOptional<z.ZodString>;
            amount: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
        }, "type">, "strip", z.ZodTypeAny, {
            amount: string | number;
            feeCollectorAccountId: string;
            denominatingTokenId?: string | undefined;
        }, {
            amount: string | number;
            feeCollectorAccountId: string;
            denominatingTokenId?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        type: "ROYALTY";
        feeCollectorAccountId: string;
        numerator: number;
        denominator: number;
        fallbackFee?: {
            amount: string | number;
            feeCollectorAccountId: string;
            denominatingTokenId?: string | undefined;
        } | undefined;
    }, {
        type: "ROYALTY";
        feeCollectorAccountId: string;
        numerator: number;
        denominator: number;
        fallbackFee?: {
            amount: string | number;
            feeCollectorAccountId: string;
            denominatingTokenId?: string | undefined;
        } | undefined;
    }>]>, "many">;
}, "strip", z.ZodTypeAny, {
    tokenId: string;
    customFees: ({
        type: "FIXED";
        amount: string | number;
        feeCollectorAccountId: string;
        denominatingTokenId?: string | undefined;
    } | {
        type: "FRACTIONAL";
        feeCollectorAccountId: string;
        numerator: number;
        denominator: number;
        assessmentMethodInclusive?: boolean | undefined;
    } | {
        type: "ROYALTY";
        feeCollectorAccountId: string;
        numerator: number;
        denominator: number;
        fallbackFee?: {
            amount: string | number;
            feeCollectorAccountId: string;
            denominatingTokenId?: string | undefined;
        } | undefined;
    })[];
}, {
    tokenId: string;
    customFees: ({
        type: "FIXED";
        amount: string | number;
        feeCollectorAccountId: string;
        denominatingTokenId?: string | undefined;
    } | {
        type: "FRACTIONAL";
        feeCollectorAccountId: string;
        numerator: number;
        denominator: number;
        assessmentMethodInclusive?: boolean | undefined;
    } | {
        type: "ROYALTY";
        feeCollectorAccountId: string;
        numerator: number;
        denominator: number;
        fallbackFee?: {
            amount: string | number;
            feeCollectorAccountId: string;
            denominatingTokenId?: string | undefined;
        } | undefined;
    })[];
}>;
export declare class HederaTokenFeeScheduleUpdateTool extends BaseHederaTransactionTool<typeof TokenFeeScheduleUpdateZodSchemaCore> {
    name: string;
    description: string;
    specificInputSchema: z.ZodObject<{
        tokenId: z.ZodString;
        customFees: z.ZodArray<z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
            type: z.ZodLiteral<"FIXED">;
            feeCollectorAccountId: z.ZodString;
            denominatingTokenId: z.ZodOptional<z.ZodString>;
            amount: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
        }, "strip", z.ZodTypeAny, {
            type: "FIXED";
            amount: string | number;
            feeCollectorAccountId: string;
            denominatingTokenId?: string | undefined;
        }, {
            type: "FIXED";
            amount: string | number;
            feeCollectorAccountId: string;
            denominatingTokenId?: string | undefined;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"FRACTIONAL">;
            feeCollectorAccountId: z.ZodString;
            numerator: z.ZodNumber;
            denominator: z.ZodNumber;
            assessmentMethodInclusive: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            type: "FRACTIONAL";
            feeCollectorAccountId: string;
            numerator: number;
            denominator: number;
            assessmentMethodInclusive?: boolean | undefined;
        }, {
            type: "FRACTIONAL";
            feeCollectorAccountId: string;
            numerator: number;
            denominator: number;
            assessmentMethodInclusive?: boolean | undefined;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"ROYALTY">;
            feeCollectorAccountId: z.ZodString;
            numerator: z.ZodNumber;
            denominator: z.ZodNumber;
            fallbackFee: z.ZodOptional<z.ZodObject<Omit<{
                type: z.ZodLiteral<"FIXED">;
                feeCollectorAccountId: z.ZodString;
                denominatingTokenId: z.ZodOptional<z.ZodString>;
                amount: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
            }, "type">, "strip", z.ZodTypeAny, {
                amount: string | number;
                feeCollectorAccountId: string;
                denominatingTokenId?: string | undefined;
            }, {
                amount: string | number;
                feeCollectorAccountId: string;
                denominatingTokenId?: string | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            type: "ROYALTY";
            feeCollectorAccountId: string;
            numerator: number;
            denominator: number;
            fallbackFee?: {
                amount: string | number;
                feeCollectorAccountId: string;
                denominatingTokenId?: string | undefined;
            } | undefined;
        }, {
            type: "ROYALTY";
            feeCollectorAccountId: string;
            numerator: number;
            denominator: number;
            fallbackFee?: {
                amount: string | number;
                feeCollectorAccountId: string;
                denominatingTokenId?: string | undefined;
            } | undefined;
        }>]>, "many">;
    }, "strip", z.ZodTypeAny, {
        tokenId: string;
        customFees: ({
            type: "FIXED";
            amount: string | number;
            feeCollectorAccountId: string;
            denominatingTokenId?: string | undefined;
        } | {
            type: "FRACTIONAL";
            feeCollectorAccountId: string;
            numerator: number;
            denominator: number;
            assessmentMethodInclusive?: boolean | undefined;
        } | {
            type: "ROYALTY";
            feeCollectorAccountId: string;
            numerator: number;
            denominator: number;
            fallbackFee?: {
                amount: string | number;
                feeCollectorAccountId: string;
                denominatingTokenId?: string | undefined;
            } | undefined;
        })[];
    }, {
        tokenId: string;
        customFees: ({
            type: "FIXED";
            amount: string | number;
            feeCollectorAccountId: string;
            denominatingTokenId?: string | undefined;
        } | {
            type: "FRACTIONAL";
            feeCollectorAccountId: string;
            numerator: number;
            denominator: number;
            assessmentMethodInclusive?: boolean | undefined;
        } | {
            type: "ROYALTY";
            feeCollectorAccountId: string;
            numerator: number;
            denominator: number;
            fallbackFee?: {
                amount: string | number;
                feeCollectorAccountId: string;
                denominatingTokenId?: string | undefined;
            } | undefined;
        })[];
    }>;
    namespace: string;
    constructor(params: BaseHederaTransactionToolParams);
    protected getServiceBuilder(): BaseServiceBuilder;
    protected callBuilderMethod(builder: BaseServiceBuilder, specificArgs: z.infer<typeof TokenFeeScheduleUpdateZodSchemaCore>): Promise<void>;
}
export {};
