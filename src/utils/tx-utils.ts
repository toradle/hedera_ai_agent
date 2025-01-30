export const mapUint8ArrayToHexString = (txHash: Uint8Array): string => {
    return Array.from(txHash)
        .map(byte => byte.toString(16).padStart(2, "0"))
        .join("");
}