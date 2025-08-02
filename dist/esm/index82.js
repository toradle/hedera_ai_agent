import { PrivateKey } from "@hashgraph/sdk";
function detectKeyTypeFromString(privateKeyString) {
  let detectedType = "ed25519";
  if (privateKeyString.startsWith("0x")) {
    detectedType = "ecdsa";
  } else if (privateKeyString.startsWith("302e020100300506032b6570")) {
    detectedType = "ed25519";
  } else if (privateKeyString.startsWith("3030020100300706052b8104000a")) {
    detectedType = "ecdsa";
  } else if (privateKeyString.length === 96) {
    detectedType = "ed25519";
  } else if (privateKeyString.length === 88) {
    detectedType = "ecdsa";
  }
  try {
    const privateKey = detectedType === "ecdsa" ? PrivateKey.fromStringECDSA(privateKeyString) : PrivateKey.fromStringED25519(privateKeyString);
    return { detectedType, privateKey };
  } catch (parseError) {
    const alternateType = detectedType === "ecdsa" ? "ed25519" : "ecdsa";
    try {
      const privateKey = alternateType === "ecdsa" ? PrivateKey.fromStringECDSA(privateKeyString) : PrivateKey.fromStringED25519(privateKeyString);
      return { detectedType: alternateType, privateKey };
    } catch (secondError) {
      throw new Error(
        `Failed to parse private key as either ED25519 or ECDSA: ${parseError}`
      );
    }
  }
}
export {
  detectKeyTypeFromString
};
//# sourceMappingURL=index82.js.map
