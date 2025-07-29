import { Client } from '@hashgraph/sdk';
import { Context, AgentMode } from '@/shared/configuration';

export class AccountResolver {
  /**
   * Gets the default account based on the agent mode and context.
   * In RETURN_BYTES mode, prefers context.accountId (user's account).
   * In AUTONOMOUS mode or when no context account, uses operator account.
   */
  static getDefaultAccount(context: Context, client: Client): string {
    // In returnBytes mode, prefer context.accountId (user's account)
    if (context.mode === AgentMode.RETURN_BYTES && context.accountId) {
      return context.accountId;
    }

    // In autonomous mode or when no context account, use operator
    const operatorAccount = client.operatorAccountId?.toString();
    if (!operatorAccount) {
      throw new Error('No account available: neither context.accountId nor operator account');
    }

    return operatorAccount;
  }

  /**
   * Resolves an account ID, using the provided account or falling back to the default.
   */
  static resolveAccount(
    providedAccount: string | undefined,
    context: Context,
    client: Client,
  ): string {
    return providedAccount || this.getDefaultAccount(context, client);
  }

  /**
   * Gets a description of which account will be used as default for prompts.
   */
  static getDefaultAccountDescription(context: Context): string {
    if (context.mode === AgentMode.RETURN_BYTES && context.accountId) {
      return `user account (${context.accountId})`;
    }
    return 'operator account';
  }
}
