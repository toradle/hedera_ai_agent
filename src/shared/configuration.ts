import { MirrornodeConfig } from "./hedera-utils/mirrornode/types";

export type Object =
  | 'fungibleToken'

export type Permission = 'create' | 'update' | 'read';

export type Actions = {
  [K in Object]?: {
    [K in Permission]?: boolean;
  };
} & {
  balance?: {
    read?: boolean;
  };
};

export enum AgentMode {
  AUTONOMOUS = 'autonomous',
  RETURN_BYTES = 'returnBytes',
}

// Context are settings that are applied to all requests made by the integration.
export type Context = {
  // Account is a Stripe Connected Account ID. If set, the integration will
  // make requests for this Account.
  accountId?: string;

  // If set to 'modelcontextprotocol', the Stripe API calls will use a special
  // header
  mode?: AgentMode;

  // Mirrornode config
  mirrornodeConfig?: MirrornodeConfig;
};

export type Configuration = {
  actions?: Actions;
  context?: Context;
};
