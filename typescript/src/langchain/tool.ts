import { z } from 'zod';
import { StructuredTool } from '@langchain/core/tools';
import HederaAgentAPI from '../shared/api';
// import { CallbackManagerForToolRun } from '@langchain/core/callbacks/manager';
// import { RunnableConfig } from '@langchain/core/runnables';

class HederaTransactionTool extends StructuredTool {
  hederaAgentAPI: HederaAgentAPI;

  method: string;

  name: string;

  description: string;

  schema: z.ZodObject<any, any>;

  constructor(
    hederaAgentAPI: HederaAgentAPI,
    method: string,
    description: string,
    schema: z.ZodObject<any, any>,
  ) {
    super();

    this.hederaAgentAPI = hederaAgentAPI;
    this.method = method;
    this.name = method;
    this.description = description;
    this.schema = schema;
  }

  _call(
    arg: z.output<typeof this.schema>,
    // commenting out for time being as it's not used
    // _runManager?: CallbackManagerForToolRun,
    // _parentConfig?: RunnableConfig
  ): Promise<any> {
    return this.hederaAgentAPI.run(this.method, arg);
  }
}

export default HederaTransactionTool;
