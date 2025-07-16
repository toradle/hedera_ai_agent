export type Object =
  | 'fungibleToken'
  | 'nonFungibleToken'
  | 'account';

export type Permission = 'create' | 'update' | 'read' | 'transfer' | 'airdrop';

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
  // Account is a Connected Account ID. If set, the integration will
  // make requests for this Account. TODO: check if it works
  accountId?: string;

  // defines if the agent executes the transactions or returns the raw transaction bytes
  mode?: AgentMode;
};

export type Configuration = {
  actions?: Actions;
  context?: Context;
};
