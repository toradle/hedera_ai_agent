import { z } from 'zod';
import { BaseHederaQueryTool, BaseHederaQueryToolParams } from '../common/base-hedera-query-tool';
declare const GetNetworkInfoZodSchema: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
/**
 * Tool for retrieving network information.
 */
export declare class HederaGetNetworkInfoTool extends BaseHederaQueryTool<typeof GetNetworkInfoZodSchema> {
    name: string;
    description: string;
    specificInputSchema: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
    namespace: string;
    constructor(params: BaseHederaQueryToolParams);
    protected executeQuery(): Promise<unknown>;
}
export {};
