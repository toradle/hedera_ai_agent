import { PrivateKey } from '@hashgraph/sdk';
export type KeyType = 'ed25519' | 'ecdsa';
export interface KeyDetectionResult {
    detectedType: KeyType;
    privateKey: PrivateKey;
}
/**
 * Detects the key type from a private key string and returns the parsed PrivateKey
 * @param privateKeyString The private key string to detect type from
 * @returns The detected key type and parsed PrivateKey
 * @throws Error if the private key cannot be parsed
 */
export declare function detectKeyTypeFromString(privateKeyString: string): KeyDetectionResult;
