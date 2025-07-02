import { describe, it, expect, beforeAll } from 'vitest';
import dotenv from 'dotenv';
import path from 'path';
import { HederaConversationalAgent } from '../../src/agent/conversational-agent';
import { ServerSigner } from '../../src/signer/server-signer';
import HederaHCSPlugin from '../../src/plugins/core/HederaHCSPlugin';
import { CreateTopicParams, HcsBuilder, HCSMessage, HederaAgentKit, TopicInfoApiResponse, CustomFees } from '../../src';
import { delay } from './utils';

dotenv.config({ path: path.resolve(__dirname, '../../../.env.test') });

describe('HederaHCSPlugin Integration (Testnet)', () => {
  let agent: HederaConversationalAgent;
  let signer: ServerSigner;
  let reusableTopicId: string;

  beforeAll(async () => {
    const accountId = process.env.HEDERA_ACCOUNT_ID;
    const privateKey = process.env.HEDERA_PRIVATE_KEY;
    const openAIApiKey = process.env.OPENAI_API_KEY;

    if (!accountId || !privateKey || !openAIApiKey) {
      throw new Error('HEDERA_ACCOUNT_ID, HEDERA_PRIVATE_KEY, and OPENAI_API_KEY must be set in environment variables.');
    }

    signer = new ServerSigner(accountId, privateKey, 'testnet');
    const hederaKit = new HederaAgentKit(signer);
    const builder = new HcsBuilder(hederaKit);
    const params: CreateTopicParams = {
      memo: 'Test topic for integration',
      adminKey: privateKey
    };

    agent = new HederaConversationalAgent(signer, {
      pluginConfig: { plugins: [new HederaHCSPlugin()] },
      userAccountId: accountId,
      openAIApiKey,
      verbose: true,
      scheduleUserTransactionsInBytesMode: false,
      operationalMode: 'directExecution'
    });

    await builder.createTopic(params);
    const result = await builder.execute();
    const topicId = result.receipt?.topicId?.toString();

    if (!topicId) throw new Error('Failed to create topic via SDK');

    reusableTopicId = topicId;
    expect(reusableTopicId).toMatch(/^0\.0\.\d+$/);
    await agent.initialize();
  });

  it('should create a new, independent topic', async () => {
    const response = await agent.processMessage('Create a new topic');
    const topicId = response.receipt?.topicId;
    expect(response.success).toBe(true);
    expect(topicId).toMatch(/^0\.0\.\d+$/);
    expect(response.output).toBeDefined();
    expect(response.error).toBeUndefined();
  });

  it('should get info for a specific topic', async () => {
    const response = await agent.processMessage(`Get info for topic ${reusableTopicId}`);
    expect(response.output).toBeDefined();
    expect(response.error).toBeUndefined();
    const topicInfo = response.topicInfo as TopicInfoApiResponse;
    expect(topicInfo.topic_id).toBe(reusableTopicId);
    expect(topicInfo.deleted).toBe(false);
  });

  it('should submit a message to the topic', async () => {
    const testMessage = `Hello from integration test at ${Date.now()}`;
    const response = await agent.processMessage(
      `Submit message "${testMessage}" to topic ${reusableTopicId}`
    );
    expect(response.output).toBeDefined();
    expect(response.error).toBeUndefined();
    expect(response.success).toBe(true);
    expect(response.message).toContain(testMessage);
  });

  it('should get messages for the topic', async () => {
    const testMessage = `Integration test fetch at ${Date.now()}`;
    const submitResponse = await agent.processMessage(
      `Submit message "${testMessage}" to topic ${reusableTopicId}`
    );
    expect(submitResponse.success).toBe(true);
    // Wait for mirror node to index the message.
    // TODO: Replace with SDK query for message confirmation in the future.
    await delay(5000);
    const getMessagesResponse = await agent.processMessage(
      `List all messages from topic ${reusableTopicId} without any filters.`
    );
    expect(getMessagesResponse.output).toBeDefined();
    expect(getMessagesResponse.error).toBeUndefined();
    expect(getMessagesResponse.success).toBe(true);
    const messages = getMessagesResponse.messages as HCSMessage[];
    expect(messages.length).toBeGreaterThan(0);
    expect(messages.some(msg => msg.raw_content === testMessage)).toBe(true);
  });

  it('should update the topic memo', async () => {
    const newMemo = `Updated memo at ${Date.now()}`;
    const updateResponse = await agent.processMessage(
      `Update topic ${reusableTopicId} with new memo: "${newMemo}"`
    );
    expect(updateResponse.success).toBe(true);
    expect(updateResponse.error).toBeUndefined();
    // Wait for mirror node to index the message.
    await delay(5000);
    const infoResponse = await agent.processMessage(
      `Get info for topic ${reusableTopicId}`
    );
    expect(infoResponse.output).toBeDefined();
    const topicInfo = infoResponse.topicInfo as TopicInfoApiResponse;
    expect(topicInfo.memo).toBe(newMemo);
  });

  it('should delete the topic', async () => {
    const deleteResponse = await agent.processMessage(
      `Delete topic ${reusableTopicId} with obtainer account ${signer.getAccountId().toString()}`
    );
    expect(deleteResponse.success).toBe(true);
    expect(deleteResponse.error).toBeUndefined();
    // Wait for mirror node to index the message.
    await delay(5000);
    const infoResponse = await agent.processMessage(
      `Get info for topic ${reusableTopicId}`
    );
    expect(infoResponse.output).toBeDefined();
    const topicInfo = infoResponse.topicInfo as TopicInfoApiResponse;
    expect(topicInfo.deleted).toBe(true);
  });

  it('should handle error for non-existent topic', async () => {
    const fakeTopicId = '0.0.99999999';
    const response = await agent.processMessage(
      `Get info for topic ${fakeTopicId}`
    );
    expect(
      (response.error || response.output || response.message || '').toLowerCase()
    ).toMatch(/not found|error|invalid|does not exist|404/);
  });

  it('should check if there is no additional topic fees', async () => {
    const response = await agent.processMessage(
      `Get fees for topic ${reusableTopicId}`
    );
    expect(response.output).toBeDefined();
    expect(response.error).toBeUndefined();
    expect(response.success).toBe(true);
    const customFees = response.customFees as CustomFees;
    expect(customFees).toBeDefined();
    expect(customFees).toHaveProperty('created_timestamp');
    expect(customFees).toHaveProperty('fixed_fees');
    expect(Array.isArray(customFees.fixed_fees)).toBe(true);
    expect(customFees.fixed_fees.length).toBe(0);
  });
});
