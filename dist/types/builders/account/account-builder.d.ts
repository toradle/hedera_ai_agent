import { CreateAccountParams, HbarTransferParams, UpdateAccountParams, DeleteAccountParams, ApproveHbarAllowanceParams, ApproveTokenNftAllowanceParams, ApproveFungibleTokenAllowanceParams, RevokeHbarAllowanceParams, RevokeFungibleTokenAllowanceParams, DeleteNftSpenderAllowanceParams, DeleteNftSpenderAllowanceToolParams, DeleteNftSerialAllowancesParams, SignScheduledTransactionParams } from '../../types';
import { BaseServiceBuilder } from '../base-service-builder';
import { HederaAgentKit } from '../../agent/agent';
/**
 * AccountBuilder facilitates the construction and execution of Hedera account-related transactions.
 */
export declare class AccountBuilder extends BaseServiceBuilder {
    constructor(hederaKit: HederaAgentKit);
    /**
     * Creates a new Hedera account.
     * @param {CreateAccountParams} params Parameters for creating an account.
     * @returns {this} The builder instance for chaining.
     * @throws {Error} If required parameters are missing.
     */
    createAccount(params: CreateAccountParams): this;
    /**
     * Transfers HBAR between accounts.
     * @param {HbarTransferParams} params Parameters for the HBAR transfer.
     * @param {boolean} [isUserInitiated=true] Whether this transfer was initiated by the user (vs. system/agent)
     * @returns {this} The builder instance for chaining.
     * @throws {Error} If transfers are missing or do not sum to zero.
     */
    transferHbar(params: HbarTransferParams, isUserInitiated?: boolean): this;
    /**
     * Updates an existing Hedera account.
     * If an optional field in `params` is `undefined`, that aspect of the account is not changed.
     * Specific string or number values (e.g., memo: "", stakedAccountId: "0.0.0", stakedNodeId: -1)
     * provided by the LLM (and allowed by the Zod schema in the tool) will be applied directly.
     * @param {UpdateAccountParams} params Parameters for updating an account.
     * @returns {this} The builder instance for chaining.
     * @throws {Error} If accountIdToUpdate is missing or key parsing fails.
     */
    updateAccount(params: UpdateAccountParams): this;
    /**
     * Deletes an existing Hedera account.
     * @param {DeleteAccountParams} params Parameters for deleting an account.
     * @returns {this} The builder instance for chaining.
     * @throws {Error} If required parameters are missing.
     */
    deleteAccount(params: DeleteAccountParams): this;
    /**
     * Approves an HBAR allowance for a spender.
     * @param {ApproveHbarAllowanceParams} params Parameters for approving HBAR allowance.
     * @returns {this} The builder instance for chaining.
     */
    approveHbarAllowance(params: ApproveHbarAllowanceParams): this;
    /**
     * Approves an NFT allowance for a spender.
     * @param {ApproveTokenNftAllowanceParams} params Parameters for approving NFT allowance.
     * @returns {this} The builder instance for chaining.
     * @throws {Error} If NFT allowance parameters are invalid.
     */
    approveTokenNftAllowance(params: ApproveTokenNftAllowanceParams): this;
    /**
     * Approves a fungible token allowance for a spender.
     * @param {ApproveFungibleTokenAllowanceParams} params Parameters for approving fungible token allowance.
     * @returns {this} The builder instance for chaining.
     */
    approveFungibleTokenAllowance(params: ApproveFungibleTokenAllowanceParams): this;
    /**
     * Deletes NFT allowances.
     * Note: This method is currently stubbed and non-functional due to SDK considerations.
     * @returns {this} The builder instance.
     * @throws {Error} Method is temporarily disabled.
     */
    deleteNftSpenderAllowance(params: DeleteNftSpenderAllowanceParams): this;
    /**
     * Revokes an HBAR allowance.
     * @param {RevokeHbarAllowanceParams} params Parameters for revoking HBAR allowance.
     * @returns {this} The builder instance for chaining.
     */
    revokeHbarAllowance(params: RevokeHbarAllowanceParams): this;
    /**
     * Revokes a fungible token allowance.
     * @param {RevokeFungibleTokenAllowanceParams} params Parameters for revoking fungible token allowance.
     * @returns {this} The builder instance for chaining.
     */
    revokeFungibleTokenAllowance(params: RevokeFungibleTokenAllowanceParams): this;
    /**
     * Deletes all allowances for a specific NFT serial (for all spenders), granted by an owner.
     * The transaction must be signed by the owner of the NFTs.
     * @param {DeleteNftSerialAllowancesParams} params - Parameters for the operation.
     * @returns {this} The builder instance for chaining.
     */
    deleteNftSerialAllowancesForAllSpenders(params: DeleteNftSerialAllowancesParams): this;
    /**
     * Deletes/revokes NFT allowances for specific serial numbers of a token for a specific spender.
     * The transaction must be signed by the owner of the NFTs.
     * @param {DeleteNftSpenderAllowanceToolParams} params - Parameters for the operation.
     * @returns {this} The builder instance for chaining.
     */
    deleteTokenNftAllowanceForSpender(params: DeleteNftSpenderAllowanceToolParams): this;
    /**
     * Prepares a ScheduleSignTransaction for a previously scheduled transaction.
     * @param {SignScheduledTransactionParams} params Parameters for the ScheduleSign transaction.
     * @returns {this} The builder instance for chaining.
     */
    prepareSignScheduledTransaction(params: SignScheduledTransactionParams): this;
}
