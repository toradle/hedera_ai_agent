import { z } from 'zod';
import { BaseHederaTransactionTool, BaseHederaTransactionToolParams } from '../common/base-hedera-transaction-tool';
import { BaseServiceBuilder } from '../../../builders';
declare const CustomFeeInputUnionSchema: z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
    type: z.ZodEnum<["FIXED", "FIXED_FEE"]>;
    feeCollectorAccountId: z.ZodOptional<z.ZodString>;
    denominatingTokenId: z.ZodOptional<z.ZodString>;
    amount: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
}, "strip", z.ZodTypeAny, {
    type: "FIXED_FEE" | "FIXED";
    amount: string | number;
    feeCollectorAccountId?: string | undefined;
    denominatingTokenId?: string | undefined;
}, {
    type: "FIXED_FEE" | "FIXED";
    amount: string | number;
    feeCollectorAccountId?: string | undefined;
    denominatingTokenId?: string | undefined;
}>, z.ZodObject<{
    type: z.ZodEnum<["FRACTIONAL", "FRACTIONAL_FEE"]>;
    feeCollectorAccountId: z.ZodOptional<z.ZodString>;
    numerator: z.ZodNumber;
    denominator: z.ZodNumber;
    minAmount: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodString]>>;
    maxAmount: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodString]>>;
    assessmentMethodInclusive: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    type: "FRACTIONAL_FEE" | "FRACTIONAL";
    numerator: number;
    denominator: number;
    feeCollectorAccountId?: string | undefined;
    minAmount?: string | number | undefined;
    maxAmount?: string | number | undefined;
    assessmentMethodInclusive?: boolean | undefined;
}, {
    type: "FRACTIONAL_FEE" | "FRACTIONAL";
    numerator: number;
    denominator: number;
    feeCollectorAccountId?: string | undefined;
    minAmount?: string | number | undefined;
    maxAmount?: string | number | undefined;
    assessmentMethodInclusive?: boolean | undefined;
}>, z.ZodObject<{
    type: z.ZodEnum<["ROYALTY", "ROYALTY_FEE"]>;
    feeCollectorAccountId: z.ZodOptional<z.ZodString>;
    numerator: z.ZodNumber;
    denominator: z.ZodNumber;
    fallbackFee: z.ZodOptional<z.ZodObject<Omit<{
        type: z.ZodEnum<["FIXED", "FIXED_FEE"]>;
        feeCollectorAccountId: z.ZodOptional<z.ZodString>;
        denominatingTokenId: z.ZodOptional<z.ZodString>;
        amount: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
    }, "type">, "strip", z.ZodTypeAny, {
        amount: string | number;
        feeCollectorAccountId?: string | undefined;
        denominatingTokenId?: string | undefined;
    }, {
        amount: string | number;
        feeCollectorAccountId?: string | undefined;
        denominatingTokenId?: string | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    type: "ROYALTY_FEE" | "ROYALTY";
    numerator: number;
    denominator: number;
    feeCollectorAccountId?: string | undefined;
    fallbackFee?: {
        amount: string | number;
        feeCollectorAccountId?: string | undefined;
        denominatingTokenId?: string | undefined;
    } | undefined;
}, {
    type: "ROYALTY_FEE" | "ROYALTY";
    numerator: number;
    denominator: number;
    feeCollectorAccountId?: string | undefined;
    fallbackFee?: {
        amount: string | number;
        feeCollectorAccountId?: string | undefined;
        denominatingTokenId?: string | undefined;
    } | undefined;
}>]>;
export type CustomFeeInputData = z.infer<typeof CustomFeeInputUnionSchema>;
declare const FTCreateZodSchemaCore: z.ZodObject<{
    tokenName: z.ZodString;
    tokenSymbol: z.ZodOptional<z.ZodString>;
    treasuryAccountId: z.ZodOptional<z.ZodString>;
    initialSupply: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
    decimals: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    adminKey: z.ZodOptional<z.ZodString>;
    kycKey: z.ZodOptional<z.ZodString>;
    freezeKey: z.ZodOptional<z.ZodString>;
    wipeKey: z.ZodOptional<z.ZodString>;
    supplyKey: z.ZodOptional<z.ZodString>;
    feeScheduleKey: z.ZodOptional<z.ZodString>;
    pauseKey: z.ZodOptional<z.ZodString>;
    autoRenewAccountId: z.ZodOptional<z.ZodString>;
    autoRenewPeriod: z.ZodOptional<z.ZodNumber>;
    memo: z.ZodOptional<z.ZodString>;
    freezeDefault: z.ZodOptional<z.ZodBoolean>;
    customFees: z.ZodOptional<z.ZodArray<z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
        type: z.ZodEnum<["FIXED", "FIXED_FEE"]>;
        feeCollectorAccountId: z.ZodOptional<z.ZodString>;
        denominatingTokenId: z.ZodOptional<z.ZodString>;
        amount: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
    }, "strip", z.ZodTypeAny, {
        type: "FIXED_FEE" | "FIXED";
        amount: string | number;
        feeCollectorAccountId?: string | undefined;
        denominatingTokenId?: string | undefined;
    }, {
        type: "FIXED_FEE" | "FIXED";
        amount: string | number;
        feeCollectorAccountId?: string | undefined;
        denominatingTokenId?: string | undefined;
    }>, z.ZodObject<{
        type: z.ZodEnum<["FRACTIONAL", "FRACTIONAL_FEE"]>;
        feeCollectorAccountId: z.ZodOptional<z.ZodString>;
        numerator: z.ZodNumber;
        denominator: z.ZodNumber;
        minAmount: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodString]>>;
        maxAmount: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodString]>>;
        assessmentMethodInclusive: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        type: "FRACTIONAL_FEE" | "FRACTIONAL";
        numerator: number;
        denominator: number;
        feeCollectorAccountId?: string | undefined;
        minAmount?: string | number | undefined;
        maxAmount?: string | number | undefined;
        assessmentMethodInclusive?: boolean | undefined;
    }, {
        type: "FRACTIONAL_FEE" | "FRACTIONAL";
        numerator: number;
        denominator: number;
        feeCollectorAccountId?: string | undefined;
        minAmount?: string | number | undefined;
        maxAmount?: string | number | undefined;
        assessmentMethodInclusive?: boolean | undefined;
    }>, z.ZodObject<{
        type: z.ZodEnum<["ROYALTY", "ROYALTY_FEE"]>;
        feeCollectorAccountId: z.ZodOptional<z.ZodString>;
        numerator: z.ZodNumber;
        denominator: z.ZodNumber;
        fallbackFee: z.ZodOptional<z.ZodObject<Omit<{
            type: z.ZodEnum<["FIXED", "FIXED_FEE"]>;
            feeCollectorAccountId: z.ZodOptional<z.ZodString>;
            denominatingTokenId: z.ZodOptional<z.ZodString>;
            amount: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
        }, "type">, "strip", z.ZodTypeAny, {
            amount: string | number;
            feeCollectorAccountId?: string | undefined;
            denominatingTokenId?: string | undefined;
        }, {
            amount: string | number;
            feeCollectorAccountId?: string | undefined;
            denominatingTokenId?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        type: "ROYALTY_FEE" | "ROYALTY";
        numerator: number;
        denominator: number;
        feeCollectorAccountId?: string | undefined;
        fallbackFee?: {
            amount: string | number;
            feeCollectorAccountId?: string | undefined;
            denominatingTokenId?: string | undefined;
        } | undefined;
    }, {
        type: "ROYALTY_FEE" | "ROYALTY";
        numerator: number;
        denominator: number;
        feeCollectorAccountId?: string | undefined;
        fallbackFee?: {
            amount: string | number;
            feeCollectorAccountId?: string | undefined;
            denominatingTokenId?: string | undefined;
        } | undefined;
    }>]>, "many">>;
    supplyType: z.ZodDefault<z.ZodOptional<z.ZodEnum<[string, string]>>>;
    maxSupply: z.ZodDefault<z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodString]>>>;
}, "strip", z.ZodTypeAny, {
    tokenName: string;
    initialSupply: string | number;
    decimals: number;
    supplyType: string;
    maxSupply: string | number;
    adminKey?: string | undefined;
    kycKey?: string | undefined;
    freezeKey?: string | undefined;
    wipeKey?: string | undefined;
    supplyKey?: string | undefined;
    feeScheduleKey?: string | undefined;
    pauseKey?: string | undefined;
    memo?: string | undefined;
    autoRenewAccountId?: string | undefined;
    autoRenewPeriod?: number | undefined;
    customFees?: ({
        type: "FIXED_FEE" | "FIXED";
        amount: string | number;
        feeCollectorAccountId?: string | undefined;
        denominatingTokenId?: string | undefined;
    } | {
        type: "FRACTIONAL_FEE" | "FRACTIONAL";
        numerator: number;
        denominator: number;
        feeCollectorAccountId?: string | undefined;
        minAmount?: string | number | undefined;
        maxAmount?: string | number | undefined;
        assessmentMethodInclusive?: boolean | undefined;
    } | {
        type: "ROYALTY_FEE" | "ROYALTY";
        numerator: number;
        denominator: number;
        feeCollectorAccountId?: string | undefined;
        fallbackFee?: {
            amount: string | number;
            feeCollectorAccountId?: string | undefined;
            denominatingTokenId?: string | undefined;
        } | undefined;
    })[] | undefined;
    tokenSymbol?: string | undefined;
    treasuryAccountId?: string | undefined;
    freezeDefault?: boolean | undefined;
}, {
    tokenName: string;
    initialSupply: string | number;
    adminKey?: string | undefined;
    kycKey?: string | undefined;
    freezeKey?: string | undefined;
    wipeKey?: string | undefined;
    supplyKey?: string | undefined;
    feeScheduleKey?: string | undefined;
    pauseKey?: string | undefined;
    memo?: string | undefined;
    autoRenewAccountId?: string | undefined;
    autoRenewPeriod?: number | undefined;
    customFees?: ({
        type: "FIXED_FEE" | "FIXED";
        amount: string | number;
        feeCollectorAccountId?: string | undefined;
        denominatingTokenId?: string | undefined;
    } | {
        type: "FRACTIONAL_FEE" | "FRACTIONAL";
        numerator: number;
        denominator: number;
        feeCollectorAccountId?: string | undefined;
        minAmount?: string | number | undefined;
        maxAmount?: string | number | undefined;
        assessmentMethodInclusive?: boolean | undefined;
    } | {
        type: "ROYALTY_FEE" | "ROYALTY";
        numerator: number;
        denominator: number;
        feeCollectorAccountId?: string | undefined;
        fallbackFee?: {
            amount: string | number;
            feeCollectorAccountId?: string | undefined;
            denominatingTokenId?: string | undefined;
        } | undefined;
    })[] | undefined;
    tokenSymbol?: string | undefined;
    treasuryAccountId?: string | undefined;
    decimals?: number | undefined;
    freezeDefault?: boolean | undefined;
    supplyType?: string | undefined;
    maxSupply?: string | number | undefined;
}>;
export declare class HederaCreateFungibleTokenTool extends BaseHederaTransactionTool<typeof FTCreateZodSchemaCore> {
    name: string;
    description: string;
    specificInputSchema: z.ZodObject<{
        tokenName: z.ZodString;
        tokenSymbol: z.ZodOptional<z.ZodString>;
        treasuryAccountId: z.ZodOptional<z.ZodString>;
        initialSupply: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
        decimals: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
        adminKey: z.ZodOptional<z.ZodString>;
        kycKey: z.ZodOptional<z.ZodString>;
        freezeKey: z.ZodOptional<z.ZodString>;
        wipeKey: z.ZodOptional<z.ZodString>;
        supplyKey: z.ZodOptional<z.ZodString>;
        feeScheduleKey: z.ZodOptional<z.ZodString>;
        pauseKey: z.ZodOptional<z.ZodString>;
        autoRenewAccountId: z.ZodOptional<z.ZodString>;
        autoRenewPeriod: z.ZodOptional<z.ZodNumber>;
        memo: z.ZodOptional<z.ZodString>;
        freezeDefault: z.ZodOptional<z.ZodBoolean>;
        customFees: z.ZodOptional<z.ZodArray<z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
            type: z.ZodEnum<["FIXED", "FIXED_FEE"]>;
            feeCollectorAccountId: z.ZodOptional<z.ZodString>;
            denominatingTokenId: z.ZodOptional<z.ZodString>;
            amount: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
        }, "strip", z.ZodTypeAny, {
            type: "FIXED_FEE" | "FIXED";
            amount: string | number;
            feeCollectorAccountId?: string | undefined;
            denominatingTokenId?: string | undefined;
        }, {
            type: "FIXED_FEE" | "FIXED";
            amount: string | number;
            feeCollectorAccountId?: string | undefined;
            denominatingTokenId?: string | undefined;
        }>, z.ZodObject<{
            type: z.ZodEnum<["FRACTIONAL", "FRACTIONAL_FEE"]>;
            feeCollectorAccountId: z.ZodOptional<z.ZodString>;
            numerator: z.ZodNumber;
            denominator: z.ZodNumber;
            minAmount: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodString]>>;
            maxAmount: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodString]>>;
            assessmentMethodInclusive: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            type: "FRACTIONAL_FEE" | "FRACTIONAL";
            numerator: number;
            denominator: number;
            feeCollectorAccountId?: string | undefined;
            minAmount?: string | number | undefined;
            maxAmount?: string | number | undefined;
            assessmentMethodInclusive?: boolean | undefined;
        }, {
            type: "FRACTIONAL_FEE" | "FRACTIONAL";
            numerator: number;
            denominator: number;
            feeCollectorAccountId?: string | undefined;
            minAmount?: string | number | undefined;
            maxAmount?: string | number | undefined;
            assessmentMethodInclusive?: boolean | undefined;
        }>, z.ZodObject<{
            type: z.ZodEnum<["ROYALTY", "ROYALTY_FEE"]>;
            feeCollectorAccountId: z.ZodOptional<z.ZodString>;
            numerator: z.ZodNumber;
            denominator: z.ZodNumber;
            fallbackFee: z.ZodOptional<z.ZodObject<Omit<{
                type: z.ZodEnum<["FIXED", "FIXED_FEE"]>;
                feeCollectorAccountId: z.ZodOptional<z.ZodString>;
                denominatingTokenId: z.ZodOptional<z.ZodString>;
                amount: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
            }, "type">, "strip", z.ZodTypeAny, {
                amount: string | number;
                feeCollectorAccountId?: string | undefined;
                denominatingTokenId?: string | undefined;
            }, {
                amount: string | number;
                feeCollectorAccountId?: string | undefined;
                denominatingTokenId?: string | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            type: "ROYALTY_FEE" | "ROYALTY";
            numerator: number;
            denominator: number;
            feeCollectorAccountId?: string | undefined;
            fallbackFee?: {
                amount: string | number;
                feeCollectorAccountId?: string | undefined;
                denominatingTokenId?: string | undefined;
            } | undefined;
        }, {
            type: "ROYALTY_FEE" | "ROYALTY";
            numerator: number;
            denominator: number;
            feeCollectorAccountId?: string | undefined;
            fallbackFee?: {
                amount: string | number;
                feeCollectorAccountId?: string | undefined;
                denominatingTokenId?: string | undefined;
            } | undefined;
        }>]>, "many">>;
        supplyType: z.ZodDefault<z.ZodOptional<z.ZodEnum<[string, string]>>>;
        maxSupply: z.ZodDefault<z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodString]>>>;
    }, "strip", z.ZodTypeAny, {
        tokenName: string;
        initialSupply: string | number;
        decimals: number;
        supplyType: string;
        maxSupply: string | number;
        adminKey?: string | undefined;
        kycKey?: string | undefined;
        freezeKey?: string | undefined;
        wipeKey?: string | undefined;
        supplyKey?: string | undefined;
        feeScheduleKey?: string | undefined;
        pauseKey?: string | undefined;
        memo?: string | undefined;
        autoRenewAccountId?: string | undefined;
        autoRenewPeriod?: number | undefined;
        customFees?: ({
            type: "FIXED_FEE" | "FIXED";
            amount: string | number;
            feeCollectorAccountId?: string | undefined;
            denominatingTokenId?: string | undefined;
        } | {
            type: "FRACTIONAL_FEE" | "FRACTIONAL";
            numerator: number;
            denominator: number;
            feeCollectorAccountId?: string | undefined;
            minAmount?: string | number | undefined;
            maxAmount?: string | number | undefined;
            assessmentMethodInclusive?: boolean | undefined;
        } | {
            type: "ROYALTY_FEE" | "ROYALTY";
            numerator: number;
            denominator: number;
            feeCollectorAccountId?: string | undefined;
            fallbackFee?: {
                amount: string | number;
                feeCollectorAccountId?: string | undefined;
                denominatingTokenId?: string | undefined;
            } | undefined;
        })[] | undefined;
        tokenSymbol?: string | undefined;
        treasuryAccountId?: string | undefined;
        freezeDefault?: boolean | undefined;
    }, {
        tokenName: string;
        initialSupply: string | number;
        adminKey?: string | undefined;
        kycKey?: string | undefined;
        freezeKey?: string | undefined;
        wipeKey?: string | undefined;
        supplyKey?: string | undefined;
        feeScheduleKey?: string | undefined;
        pauseKey?: string | undefined;
        memo?: string | undefined;
        autoRenewAccountId?: string | undefined;
        autoRenewPeriod?: number | undefined;
        customFees?: ({
            type: "FIXED_FEE" | "FIXED";
            amount: string | number;
            feeCollectorAccountId?: string | undefined;
            denominatingTokenId?: string | undefined;
        } | {
            type: "FRACTIONAL_FEE" | "FRACTIONAL";
            numerator: number;
            denominator: number;
            feeCollectorAccountId?: string | undefined;
            minAmount?: string | number | undefined;
            maxAmount?: string | number | undefined;
            assessmentMethodInclusive?: boolean | undefined;
        } | {
            type: "ROYALTY_FEE" | "ROYALTY";
            numerator: number;
            denominator: number;
            feeCollectorAccountId?: string | undefined;
            fallbackFee?: {
                amount: string | number;
                feeCollectorAccountId?: string | undefined;
                denominatingTokenId?: string | undefined;
            } | undefined;
        })[] | undefined;
        tokenSymbol?: string | undefined;
        treasuryAccountId?: string | undefined;
        decimals?: number | undefined;
        freezeDefault?: boolean | undefined;
        supplyType?: string | undefined;
        maxSupply?: string | number | undefined;
    }>;
    namespace: string;
    constructor(params: BaseHederaTransactionToolParams);
    protected getServiceBuilder(): BaseServiceBuilder;
    protected callBuilderMethod(builder: BaseServiceBuilder, specificArgs: z.infer<typeof FTCreateZodSchemaCore>): Promise<void>;
    protected getNoteForKey(key: string, schemaDefaultValue: unknown, actualValue: unknown): string | undefined;
}
export {};
