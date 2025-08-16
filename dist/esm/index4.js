import { HederaMirrorNode } from "./index92.js";
import { Logger } from "./index77.js";
class AbstractSigner {
  /**
   * Retrieves the public key associated with this signer's account using the Hedera Mirror Node.
   * This method relies on the `mirrorNode` property being initialized by the concrete signer.
   * @returns {Promise<PublicKey>} A promise that resolves to the Hedera PublicKey object.
   * @throws {Error} If the public key cannot be retrieved from the mirror node or if mirrorNode is not initialized.
   */
  async getPublicKey() {
    if (!this.mirrorNode) {
      throw new Error(
        "AbstractSigner: HederaMirrorNode has not been initialized by the concrete signer implementation. This is an internal error."
      );
    }
    const accountIdToQuery = this.getAccountId();
    try {
      return await this.mirrorNode.getPublicKey(accountIdToQuery.toString());
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      throw new Error(
        `Failed to retrieve public key from mirror node for account ${accountIdToQuery.toString()}: ${errorMessage}`
      );
    }
  }
  /**
   * Initializes the HederaMirrorNode instance for the signer.
   * Concrete classes must call this in their constructor.
   * @param {HederaNetworkType} network - The network for the mirror node.
   * @param {string} moduleName - A descriptive name for the logger module (e.g., 'ServerSigner').
   */
  initializeMirrorNode(network, moduleName) {
    this.mirrorNode = new HederaMirrorNode(
      network,
      new Logger({
        level: "info",
        module: `${moduleName}-MirrorNode`
      })
    );
  }
}
export {
  AbstractSigner
};
//# sourceMappingURL=index4.js.map
