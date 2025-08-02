import { Key } from '@hashgraph/sdk';
/**
 * Parses a string representation of a key into an SDK Key object.
 * Supports hex-encoded private keys (derives public key) or hex/DER-encoded public keys.
 * @param keyString The key string.
 * @returns An SDK Key object or null if parsing fails.
 */
export declare function parseKey(keyString: string): Key | null;
