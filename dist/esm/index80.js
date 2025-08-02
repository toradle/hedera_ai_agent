import { PublicKey } from "@hashgraph/sdk";
import { detectKeyTypeFromString } from "./index82.js";
function parseKey(keyString) {
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
export {
  parseKey
};
//# sourceMappingURL=index80.js.map
