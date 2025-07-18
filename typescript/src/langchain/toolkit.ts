import { BaseToolkit } from '@langchain/core/tools';
import HederaAgentKitTool from '@/langchain/tool.js';
import HederaAgentKitAPI from '@/shared/api.js';
import tools from '@/shared/tools.js';
import { type Configuration } from '@/shared/configuration.js';
import { Client } from '@hashgraph/sdk';

class HederaLangchainToolkit implements BaseToolkit {
  private _hederaAgentKit: HederaAgentKitAPI;

  tools: HederaAgentKitTool[];

  constructor({ client, configuration }: { client: Client; configuration: Configuration }) {
    this._hederaAgentKit = new HederaAgentKitAPI(client, configuration.context);

    const context = configuration.context || {};
    const filteredTools =
      !configuration.tools || configuration.tools.length === 0
        ? tools(context)
        : tools(context).filter(tool => (configuration.tools ?? []).includes(tool.method));

    this.tools = filteredTools.map(
      tool =>
        new HederaAgentKitTool(
          this._hederaAgentKit,
          tool.method,
          tool.description,
          tool.parameters,
        ),
    );
  }

  getTools(): HederaAgentKitTool[] {
    return this.tools;
  }
}

export default HederaLangchainToolkit;
