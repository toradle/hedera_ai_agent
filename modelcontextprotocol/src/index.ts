#!/usr/bin/env node

import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import colors from 'colors';
const { green, red, yellow } = colors;

import { LedgerId, Client } from '@hashgraph/sdk';
import { AgentMode, ALL_TOOLS, Configuration, Context, HederaMCPToolkit } from 'hkav3';

type Options = {
  tools?: string[];
  context?: Context;
  ledgerId?: LedgerId;
};

const ACCEPTED_ARGS = ['agent-mode', 'account-id', 'public-key', 'tools', 'ledger-id'];
const ACCEPTED_TOOLS = ALL_TOOLS;

export function parseArgs(args: string[]): Options {
  const options: Options = {
    ledgerId: LedgerId.TESTNET,
    context: {},
  };

  console.log(args);
  args.forEach((arg) => {
    if (arg.startsWith('--')) {
      const [key, value] = arg.slice(2).split('=');

      if (key == 'tools') {
        options.tools = value.split(',');
      } else if (key == 'agent-mode') {
        options.context!.mode = value as AgentMode;
      } else if (key == 'account-id') {
        options.context!.accountId = value;
      } else if (key == 'public-key') {
        options.context!.accountPublicKey = value;
      } else if (key == 'ledger-id') {
        if (value == 'testnet') {
          options.ledgerId = LedgerId.TESTNET;
        } else if (value == 'mainnet') {
          options.ledgerId = LedgerId.MAINNET;
        } 
        else {
          throw new Error(`Invalid ledger id: ${value}. Accepted values are: testnet, mainnet`);
        }
      } else {
        throw new Error(
          `Invalid argument: ${key}. Accepted arguments are: ${ACCEPTED_ARGS.join(
            ', '
          )}`
        );
      }
    }
  });

  // Validate tools against accepted enum values
  options.tools?.forEach((tool: string) => {
    if (tool == 'all') {
      return;
    }
    if (!ACCEPTED_TOOLS.includes(tool.trim())) {
      throw new Error(
        `Invalid tool: ${tool}. Accepted tools are: ${ACCEPTED_TOOLS.join(
          ', '
        )}`
      );
    }
  });

  return options;
}

function handleError(error: any) {
  console.error(red('\n🚨  Error initializing Stripe MCP server:\n'));
  console.error(yellow(`   ${error.message}\n`));
}

export async function main() {
  const options = parseArgs(process.argv.slice(2));
  let client: Client;
  if(options.ledgerId == LedgerId.TESTNET) {
    client = Client.forTestnet();
  } else {
    client = Client.forMainnet();
  }

  const configuration: Configuration = {
    tools: options.tools,
    context: options.context,
  }

  const server = new HederaMCPToolkit({
    client: client,
    configuration: configuration,
  });

  const transport = new StdioServerTransport();
  await server.connect(transport);
  // We use console.error instead of console.log since console.log will output to stdio, which will confuse the MCP server
  console.error(green('✅ Hedera MCP Server running on stdio'));
}

if (require.main === module) {
  main().catch((error) => {
    handleError(error);
  });
}