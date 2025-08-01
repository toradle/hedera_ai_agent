import { Key, PublicKey } from '@hashgraph/sdk';
import { detectKeyTypeFromString } from './key-type-detector';

/**
 * Parses a string representation of a key into an SDK Key object.
 * Supports hex-encoded private keys (derives public key) or hex/DER-encoded public keys.
 * @param keyString The key string.
 * @returns An SDK Key object or null if parsing fails.
 */
export function parseKey(keyString: string): Key | null {
  if (!keyString) {
    return null;
  }
  try {
    const keyDetection = detectKeyTypeFromString(keyString);
    return keyDetection.privateKey.publicKey;
  } catch {
    try {
      return PublicKey.fromString(keyString);
    } catch {
      return null;
    }
  }
}
