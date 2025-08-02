import { Logger } from './logger';
import { HederaNetworkType } from '../types';
export declare const MIN_REQUIRED_USD = 2;
export declare const MIN_REQUIRED_HBAR_USD = 10;
export declare function ensureAgentHasEnoughHbar(logger: Logger, network: HederaNetworkType, accountId: string, agentName: string, baseClient?: {
    getClient(): unknown;
    getAccountAndSigner(): {
        accountId: string;
        signer: unknown;
    };
}): Promise<void>;
