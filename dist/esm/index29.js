import { z } from "zod";
import { BaseHederaTransactionTool } from "./index26.js";
const SubmitMessageZodSchemaCore = z.object({
  topicId: z.string().describe('The ID of the topic (e.g., "0.0.xxxx").'),
  message: z.string().describe(
    "The message content. For binary data, provide as a base64 encoded string; the builder handles decoding."
  ),
  maxChunks: z.number().int().positive().optional().describe(
    "Optional. Maximum number of chunks for messages exceeding single transaction limits. Builder handles chunking."
  ),
  chunkSize: z.number().int().positive().optional().describe(
    "Optional. Size of each chunk in bytes if chunking is performed. Builder applies default if needed."
  ),
  submitKey: z.string().optional().describe(
    "Optional. Submit key if required by the topic and different from the operator (e.g., serialized public key string, or private key string for derivation by builder)."
  )
});
class HederaSubmitMessageTool extends BaseHederaTransactionTool {
  constructor(params) {
    super(params);
    this.name = "hedera-hcs-submit-message";
    this.description = "Submits a message to a Hedera Consensus Service (HCS) topic. The builder handles chunking and base64 decoding for binary messages.";
    this.specificInputSchema = SubmitMessageZodSchemaCore;
    this.namespace = "hcs";
  }
  getServiceBuilder() {
    return this.hederaKit.hcs();
  }
  async callBuilderMethod(builder, specificArgs) {
    await builder.submitMessageToTopic(
      specificArgs
    );
  }
}
export {
  HederaSubmitMessageTool
};
//# sourceMappingURL=index29.js.map
