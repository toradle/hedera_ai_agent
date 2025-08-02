import { z } from "zod";
import { BaseHederaTransactionTool } from "./index26.js";
const DeleteTopicZodSchemaCore = z.object({
  topicId: z.string().describe('The ID of the topic to be deleted (e.g., "0.0.xxxx").')
});
class HederaDeleteTopicTool extends BaseHederaTransactionTool {
  constructor(params) {
    super(params);
    this.name = "hedera-hcs-delete-topic";
    this.description = "Deletes an HCS topic. Requires topicId.";
    this.specificInputSchema = DeleteTopicZodSchemaCore;
    this.namespace = "hcs";
  }
  getServiceBuilder() {
    return this.hederaKit.hcs();
  }
  async callBuilderMethod(builder, specificArgs) {
    await builder.deleteTopic(
      specificArgs
    );
  }
}
export {
  HederaDeleteTopicTool
};
//# sourceMappingURL=index30.js.map
