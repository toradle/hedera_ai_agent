import { CustomFee } from '@hashgraph/sdk';
import { Logger } from '../../../utils/logger';
export declare const SERIALIZED_KEY_DESCRIPTION = "serialized string). Builder handles parsing.";
export declare const FEE_COLLECTOR_DESCRIPTION = "Fee collector's account ID. Defaults to user's account if in user-centric context and not specified.";
/**
 * Parses a JSON string representing an array of custom fee objects into an array of SDK CustomFee instances.
 * @param {string} customFeesJson - The JSON string to parse.
 * @param {StandardsSdkLogger} logger - Logger instance for error/warning logging.
 * @returns {CustomFee[]} An array of SDK CustomFee objects.
 * @throws {Error} If JSON parsing fails or fee data is invalid.
 */
export declare function parseCustomFeesJson(customFeesJson: string, logger: Logger): CustomFee[];
