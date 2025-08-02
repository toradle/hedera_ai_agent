import { ContractFunctionResult } from '@hashgraph/sdk';
import { CreateContractParams, ExecuteContractParams, UpdateContractParams, DeleteContractParams, ContractCallQueryParams } from '../../types';
import { BaseServiceBuilder } from '../base-service-builder';
import { HederaAgentKit } from '../../agent/agent';
/**
 * ScsBuilder facilitates Hedera Smart Contract Service (SCS) transactions.
 */
export declare class ScsBuilder extends BaseServiceBuilder {
    constructor(hederaKit: HederaAgentKit);
    /**
     * @param {CreateContractParams} params
     * @returns {this}
     * @throws {Error}
     */
    createContract(params: CreateContractParams): this;
    /**
     * @param {ExecuteContractParams} params
     * @returns {this}
     */
    executeContract(params: ExecuteContractParams): this;
    /**
     * @param {UpdateContractParams} params
     * @returns {this}
     * @throws {Error}
     */
    updateContract(params: UpdateContractParams): this;
    /**
     * @param {DeleteContractParams} params
     * @returns {this}
     * @throws {Error}
     */
    deleteContract(params: DeleteContractParams): this;
    /**
     * Executes a local smart contract query (does not modify state, no consensus needed).
     * @param {ContractCallQueryParams} params - Parameters for the contract query.
     * @returns {Promise<ContractFunctionResult>} A promise that resolves to the result of the contract call.
     * @throws {Error} If query execution fails.
     */
    callContract(params: ContractCallQueryParams): Promise<ContractFunctionResult>;
}
