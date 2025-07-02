import { describe, it, expect, beforeAll } from 'vitest';
import { HederaConversationalAgent } from '../../src/agent/conversational-agent';
import { ServerSigner } from '../../src/signer/server-signer';
import HederaSCSPlugin from '../../src/plugins/core/HederaSCSPlugin';
import dotenv from 'dotenv';
import path from 'path';
import { HederaMirrorNode } from '../../src/services/mirror-node';
import { delay, deployMockTestContract } from './utils';

// Load environment variables (ensure .env.test or .env is configured)
dotenv.config({ path: path.resolve(__dirname, '../../../.env.test') });

describe('HederaSCSPlugin Integration (Testnet)', () => {
  let agent: HederaConversationalAgent;
  let signer: ServerSigner;
  let testContractId: string; // Set this to a known contract on testnet for read-only tests
  let hederaMirrorNode: HederaMirrorNode;

  beforeAll(async () => {
    const accountId = process.env.HEDERA_ACCOUNT_ID;
    const privateKey = process.env.HEDERA_PRIVATE_KEY;
    const openAIApiKey = process.env.OPENAI_API_KEY;

    if (!accountId || !privateKey || !openAIApiKey) {
      throw new Error(
        'HEDERA_ACCOUNT_ID, HEDERA_PRIVATE_KEY, and OPENAI_API_KEY must be set in environment variables.'
      );
    }

    signer = new ServerSigner(accountId, privateKey, 'testnet');
    agent = new HederaConversationalAgent(signer, {
      pluginConfig: { plugins: [new HederaSCSPlugin()] },
      userAccountId: accountId,
      openAIApiKey,
      verbose: true,
      scheduleUserTransactionsInBytesMode: false,
      operationalMode: 'directExecution'
    });
    await agent.initialize();

    // Optionally set a known contract ID for testnet
    // Deploy a simple test contract
    testContractId = await deployMockTestContract(signer);
    hederaMirrorNode = new HederaMirrorNode('testnet');
  });

  it('should list contracts on testnet', async () => {
    const response = await agent.processMessage('List all contracts');
    expect(response.output).toBeDefined();
    expect(response.error).toBeUndefined();
    // Optionally, check for contractId or contract info in the output
  });

  it('should get info for a specific contract', async () => {
    const response = await agent.processMessage(
      `Get info for contract ${testContractId}`
    );
    console.log(`response of tool: ${JSON.stringify(response, null, 2)}`);
    expect(response?.summary?.contractId).toContain(testContractId);
    expect(response.error).toBeUndefined();
  });

  it('should handle error for non-existent contract', async () => {
    const fakeId = '0.0.99999999';
    const response = await agent.processMessage(
      `Get info for contract ${fakeId}`
    );
    expect(response.error || response.output).toMatch(/not found|error|invalid/i);
  });

  // The following tests require a contract you control on testnet.

  it('should update a contract (requires control of contract)', async () => {
    const testMemo = "This is a test memo";
    const response = await agent.processMessage(
      `Update contract ${testContractId} with new memo: "${testMemo}"`
    );
    // Wait for the contract to be updated on the mirror node
    await delay(3000);
    const contract = await hederaMirrorNode.getContract(testContractId);
    expect(response.success).toBe(true);
    expect(response.error).toBeUndefined();
    expect(contract?.memo).toBe(testMemo);
  });

  it('should delete a contract (requires control of contract)', async () => {
    const response = await agent.processMessage(
      `Delete contract ${testContractId} with obtainer account ${signer.getAccountId().toString()}`
    );
    // Wait for the contract to be updated on the mirror node
    await delay(3000);
    const contract = await hederaMirrorNode.getContract(testContractId);
    expect(contract?.deleted).toBe(true);
    expect(response.success).toBe(true);
    expect(response.error).toBeUndefined();
  });
}); 