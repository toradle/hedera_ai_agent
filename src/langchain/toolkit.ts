import { BaseToolkit } from '@langchain/core/tools';
import HederaAgentKitTool from './tool';
import HederaAgentKitAPI from '../shared/api';
import tools from '../shared/tools';
import { type Configuration } from '@/shared/configuration';
import { Client } from '@hashgraph/sdk';

class HederaLangchainToolkit implements BaseToolkit {
  private _hederaAgentKit: HederaAgentKitAPI;

  tools: HederaAgentKitTool[];

  constructor({ client, configuration }: { client: Client; configuration: Configuration }) {
    this._hederaAgentKit = new HederaAgentKitAPI(client, configuration.context);

    if (
      configuration.context &&
      configuration.context.accountId &&
      !configuration.context.accountPublicKey
    ) {
      // TODO: fetch and set the public key
      // configuration.context.accountPublicKey = '';
    }
    const context = configuration.context || {};
    const filteredTools = tools(context);
    // .filter((tool) =>
    //   isToolAllowed(tool, configuration)
    // );

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
