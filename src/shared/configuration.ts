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

// Context are settings that are applied to all requests made by the integration.
export type Context = {
  // Account is a Stripe Connected Account ID. If set, the integration will
  // make requests for this Account.
  accountId?: string;

  // If set to 'modelcontextprotocol', the Stripe API calls will use a special
  // header
  mode?: 'autonomous' | 'returnBytes';
};

export type Configuration = {
  actions?: Actions;
  context?: Context;
};
