const createBaseMirrorNodeApiUrl = (networkType) => {
  const networkBase = networkType === "mainnet" ? `${networkType}-public` : networkType;
  return `https://${networkBase}.mirrornode.hedera.com`;
};
export {
  createBaseMirrorNodeApiUrl
};
//# sourceMappingURL=index76.js.map
