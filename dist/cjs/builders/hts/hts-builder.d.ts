import { FTCreateParams, NFTCreateParams, MintFTParams, BurnFTParams, MintNFTParams, BurnNFTParams, TransferNFTParams, AssociateTokensParams, DissociateTokensParams, TransferTokensParams, WipeTokenAccountParams, FreezeTokenAccountParams, UnfreezeTokenAccountParams, GrantKycTokenParams, RevokeKycTokenParams, PauseTokenParams, UnpauseTokenParams, UpdateTokenParams, DeleteTokenParams, TokenFeeScheduleUpdateParams, AirdropTokenParams, ClaimAirdropParams, CancelAirdropParams, RejectAirdropParams } from '../../types';
import { BaseServiceBuilder } from '../base-service-builder';
import { HederaAgentKit } from '../../agent/agent';
/**
 * HtsBuilder facilitates the construction and execution of Hedera Token Service (HTS) transactions.
 */
export declare class HtsBuilder extends BaseServiceBuilder {
    constructor(hederaKit: HederaAgentKit);
    /**
     * @param {FTCreateParams} params
     * @returns {Promise<this>}
     * @throws {Error}
     */
    createFungibleToken(params: FTCreateParams): Promise<this>;
    /**
     * Creates a non-fungible token. If the supply key is not provided, the operator's public key will be used.
     * @param {NFTCreateParams} params
     * @returns {Promise<this>}
     * @throws {Error}
     */
    createNonFungibleToken(params: NFTCreateParams): Promise<this>;
    /**
     * @param {MintFTParams} params
     * @returns {this}
     */
    mintFungibleToken(params: MintFTParams): this;
    /**
     * @param {BurnFTParams} params
     * @returns {this}
     */
    burnFungibleToken(params: BurnFTParams): this;
    /**
     * @param {MintNFTParams} params
     * @returns {this}
     * @throws {Error}
     */
    mintNonFungibleToken(params: MintNFTParams): this;
    /**
     * @param {BurnNFTParams} params
     * @returns {this}
     */
    burnNonFungibleToken(params: BurnNFTParams): this;
    /**
     * @param {TransferNFTParams} params - Parameters for transferring a single NFT.
     * @returns {this}
     */
    transferNft(params: TransferNFTParams): this;
    /**
     * @param {AssociateTokensParams} params
     * @returns {this}
     */
    associateTokens(params: AssociateTokensParams): this;
    /**
     * @param {DissociateTokensParams} params
     * @returns {this}
     */
    dissociateTokens(params: DissociateTokensParams): this;
    /**
     * @param {TransferTokensParams} params - Parameters for transferring fungible tokens, NFTs, and/or HBAR.
     * @returns {this}
     */
    transferTokens(params: TransferTokensParams): this;
    /**
     * @param {WipeTokenAccountParams} params
     * @returns {this}
     * @throws {Error}
     */
    wipeTokenAccount(params: WipeTokenAccountParams): this;
    /**
     * @param {FreezeTokenAccountParams} params
     * @returns {this}
     */
    freezeTokenAccount(params: FreezeTokenAccountParams): this;
    /**
     * @param {UnfreezeTokenAccountParams} params
     * @returns {this}
     */
    unfreezeTokenAccount(params: UnfreezeTokenAccountParams): this;
    /**
     * @param {GrantKycTokenParams} params
     * @returns {this}
     */
    grantKycToken(params: GrantKycTokenParams): this;
    /**
     * @param {RevokeKycTokenParams} params
     * @returns {this}
     */
    revokeKycToken(params: RevokeKycTokenParams): this;
    /**
     * @param {PauseTokenParams} params
     * @returns {this}
     */
    pauseToken(params: PauseTokenParams): this;
    /**
     * @param {UnpauseTokenParams} params
     * @returns {this}
     */
    unpauseToken(params: UnpauseTokenParams): this;
    /**
     * @param {UpdateTokenParams} params
     * @returns {Promise<this>}
     * @throws {Error}
     */
    updateToken(params: UpdateTokenParams): Promise<this>;
    /**
     * @param {DeleteTokenParams} params
     * @returns {this}
     */
    deleteToken(params: DeleteTokenParams): this;
    /**
     * @param {TokenFeeScheduleUpdateParams} params
     * @returns {this}
     */
    feeScheduleUpdate(params: TokenFeeScheduleUpdateParams): Promise<this>;
    /**
     * Configures a transaction to airdrop fungible tokens from the operator's account to multiple recipients.
     * This method uses the `TokenAirdropTransaction`.
     * @param {AirdropTokenParams} params - Parameters for the airdrop.
     * @returns {this} The HtsBuilder instance for fluent chaining.
     * @throws {Error} If no recipients are provided or if amounts are invalid.
     */
    airdropToken(params: AirdropTokenParams): this;
    /**
     * Configures a transaction to claim pending airdrops.
     * The operator (signer) is the recipient of the claim.
     * @param {ClaimAirdropParams} params - Parameters specifying which pending airdrops to claim.
     *                                      The `pendingAirdropIds` should be valid `PendingAirdropId` instances from the SDK.
     * @returns {this} The HtsBuilder instance for fluent chaining.
     * @throws {Error} If no `pendingAirdropIds` are provided.
     */
    claimAirdrop(params: ClaimAirdropParams): this;
    /**
     * Configures a transaction to cancel pending airdrops sent by the operator.
     * @param {CancelAirdropParams} params - Parameters specifying which pending airdrops to cancel.
     *                                       The `pendingAirdropIds` should be valid `PendingAirdropId` instances from the SDK.
     * @returns {this} The HtsBuilder instance for fluent chaining.
     * @throws {Error} If no `pendingAirdropIds` are provided.
     */
    cancelAirdrop(params: CancelAirdropParams): this;
    /**
     * Configures a transaction for the operator to reject future auto-associations with specified token types.
     * @param {RejectAirdropParams} params - Parameters specifying which tokens to reject.
     *        Note: `senderAccountId` and `serials` from `RejectAirdropParams` are currently ignored by this method
     *        as `TokenRejectTransaction` operates on token types for the owner.
     * @returns {this} The HtsBuilder instance for fluent chaining.
     */
    rejectTokens(params: RejectAirdropParams): this;
}
