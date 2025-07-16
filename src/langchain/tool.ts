import { z } from 'zod';
import { StructuredTool } from '@langchain/core/tools';
import { CallbackManagerForToolRun } from '@langchain/core/callbacks/manager';
import { RunnableConfig } from '@langchain/core/runnables';
import HederaAgentAPI from '../shared/api';

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
    schema: z.ZodObject<any, any>
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
    _runManager?: CallbackManagerForToolRun,
    _parentConfig?: RunnableConfig
  ): Promise<any> {
    return this.hederaAgentAPI.run(this.method, arg);
  }
}

export default HederaTransactionTool;
