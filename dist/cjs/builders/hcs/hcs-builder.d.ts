import { CreateTopicParams, SubmitMessageParams, DeleteTopicParams, UpdateTopicParams } from '../../types';
import { BaseServiceBuilder } from '../base-service-builder';
import { HederaAgentKit } from '../../agent/agent';
/**
 * HcsBuilder facilitates the construction and execution of Hedera Consensus Service (HCS) transactions.
 * It extends BaseServiceBuilder to provide common transaction execution and byte generation methods.
 */
export declare class HcsBuilder extends BaseServiceBuilder {
    constructor(hederaKit: HederaAgentKit);
    /**
     * @param {CreateTopicParams} params
     * @returns {Promise<this>}
     */
    createTopic(params: CreateTopicParams): Promise<this>;
    /**
     * Configures the builder to submit a message to an HCS topic.
     * The transaction will be signed by the primary signer (operator).
     * If the target topic has a specific submit key and it is different from the operator's key,
     * the transaction may fail at the network level unless the transaction bytes are retrieved
     * using `getTransactionBytes()` and signed externally by the required submit key(s) before submission.
     * The `params.submitKey` (if provided in `SubmitMessageParams`) is not directly used to sign
     * within this builder method for `TopicMessageSubmitTransaction` as the transaction type itself
     * does not have a field for an overriding submitter's public key; authorization is based on the topic's configuration.
     * @param {SubmitMessageParams} params - Parameters for submitting the message.
     * @returns {this} The HcsBuilder instance for fluent chaining.
     */
    submitMessageToTopic(params: SubmitMessageParams): this;
    /**
     * @param {DeleteTopicParams} params
     * @returns {this}
     * @throws {Error}
     */
    deleteTopic(params: DeleteTopicParams): this;
    /**
     * Configures the builder to update an HCS topic.
     * @param {UpdateTopicParams} params - Parameters for updating the topic.
     * @returns {Promise<this>} The HcsBuilder instance for fluent chaining.
     * @throws {Error} If topicId is not provided.
     */
    updateTopic(params: UpdateTopicParams): Promise<this>;
}
