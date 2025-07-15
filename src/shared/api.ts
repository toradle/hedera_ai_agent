import { Client } from "@hashgraph/sdk";
import HederaAgentKit from "../hedera-agent-kit";

import type { Context } from "./configuration";
import tools, { Tool } from "./tools";

class HederaAgentKitAPI {
  hederaAgentKit: HederaAgentKit;

  context: Context;

  tools: Tool[];

  constructor(client: Client, context?: Context) {
    const hederaAgentKitClient = new HederaAgentKit(client);
    this.hederaAgentKit = hederaAgentKitClient;
    this.context = context || {};
    this.tools = tools(this.context);
  }

  async run(method: string, arg: any) {
    const tool = this.tools.find((t) => t.method === method);
    if (tool) {
      const output = JSON.stringify(
        await tool.execute(this.hederaAgentKit, this.context, arg)
      );
      return output;
    } else {
      throw new Error("Invalid method " + method);
    }
  }
}

export default HederaAgentKitAPI;
