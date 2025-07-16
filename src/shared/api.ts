import { Client } from "@hashgraph/sdk";

import type { Context } from "./configuration";
import tools, { Tool } from "./tools";

class HederaAgentAPI {
  client: Client;

  context: Context;

  tools: Tool[];

  constructor(client: Client, context?: Context) {
    this.client = client;
    this.context = context || {};
    this.tools = tools(this.context);
  }

  async run(method: string, arg: any) {
    const tool = this.tools.find((t) => t.method === method);
    if (tool) {
      const output = JSON.stringify(
        await tool.execute(this.client, this.context, arg)
      );
      return output;
    } else {
      throw new Error("Invalid method " + method);
    }
  }
}

export default HederaAgentAPI;
