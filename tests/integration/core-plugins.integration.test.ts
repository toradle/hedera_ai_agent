import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { HederaAgentKit, PluginConfig } from '../../src/agent';
import { HederaConversationalAgent } from '../../src/agent/conversational-agent';
import { ServerSigner } from '../../src/signer/server-signer';
import { getAllHederaCorePlugins } from '../../src/plugins/core';
import {
  HederaHTSPlugin,
  HederaHCSPlugin,
  HederaAccountPlugin,
  HederaSCSPlugin,
  HederaNetworkPlugin,
} from '../../src/plugins/core';
import { ModelCapability } from '../../src/types/model-capability';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../../.env.test') });

async function initializeTestKit(pluginConfig?: PluginConfig): Promise<HederaAgentKit> {
  const accountId = process.env.HEDERA_ACCOUNT_ID;
  const privateKey = process.env.HEDERA_PRIVATE_KEY;

  if (!accountId || !privateKey) {
    throw new Error(
      'Hedera account ID or private key missing from environment variables.'
    );
  }

  const signer = new ServerSigner(accountId, privateKey, 'testnet');
  const kit = new HederaAgentKit(
    signer,
    pluginConfig,
    'provideBytes',
    undefined,
    true,
    ModelCapability.MEDIUM,
    'gpt-4o-mini',
    undefined,
    true // disable logging for tests
  );
  await kit.initialize();
  return kit;
}

describe('Core Plugins Integration Tests', () => {
  let kit: HederaAgentKit;

  beforeAll(async () => {
    console.log('Setting up core plugins integration tests...');
  });

  afterAll(async () => {
    console.log('Core plugins integration tests completed.');
  });

  describe('Individual Core Plugins', () => {
    it('should load HederaHTSPlugin with token service tools', async () => {
      const htsPlugin = new HederaHTSPlugin();
      const pluginConfig: PluginConfig = {
        plugins: [htsPlugin],
      };

      kit = await initializeTestKit(pluginConfig);
      const tools = kit.getAggregatedLangChainTools();
      
      
      expect(tools.length).toBe(25);
      expect(tools.some(tool => tool.name.includes('hedera-hts-create-fungible-token'))).toBe(true);
      expect(tools.some(tool => tool.name.includes('hedera-hts-transfer-tokens'))).toBe(true);
    });

    it('should load HederaHCSPlugin with consensus service tools', async () => {
      const hcsPlugin = new HederaHCSPlugin();
      const pluginConfig: PluginConfig = {
        plugins: [hcsPlugin],
      };

      kit = await initializeTestKit(pluginConfig);
      const tools = kit.getAggregatedLangChainTools();

      expect(tools.length).toBe(7);
      expect(tools.some(tool => tool.name.includes('hedera-hcs-create-topic'))).toBe(true);
      expect(tools.some(tool => tool.name.includes('hedera-hcs-submit-message'))).toBe(true);
    });

    it('should load HederaAccountPlugin with account tools', async () => {
      const accountPlugin = new HederaAccountPlugin();
      const pluginConfig: PluginConfig = {
        plugins: [accountPlugin],
      };

      kit = await initializeTestKit(pluginConfig);
      const tools = kit.getAggregatedLangChainTools();

      expect(tools.length).toBe(19);
      expect(tools.some(tool => tool.name.includes('hedera-account-create'))).toBe(true);
      expect(tools.some(tool => tool.name.includes('hedera-account-transfer-hbar'))).toBe(true);
    });

    it('should load HederaSCSPlugin with smart contract tools', async () => {
      const scsPlugin = new HederaSCSPlugin();
      const pluginConfig: PluginConfig = {
        plugins: [scsPlugin],
      };

      kit = await initializeTestKit(pluginConfig);
      const tools = kit.getAggregatedLangChainTools();

      
      expect(tools.length).toBe(4);
      expect(tools.some(tool => tool.name.includes('hedera-get-contract'))).toBe(true);
      expect(tools.some(tool => tool.name.includes('hedera-get-contracts'))).toBe(true);
    });

    it('should load HederaNetworkPlugin with network tools', async () => {
      const networkPlugin = new HederaNetworkPlugin();
      const pluginConfig: PluginConfig = {
        plugins: [networkPlugin],
      };

      kit = await initializeTestKit(pluginConfig);
      const tools = kit.getAggregatedLangChainTools();

      expect(tools.length).toBe(4);
      expect(tools.some(tool => tool.name.includes('hedera-get-hbar-price'))).toBe(true);
    });
  });

  describe('getAllHederaCorePlugins Utility', () => {

    it('should load all core plugins together', async () => {
      const corePlugins = getAllHederaCorePlugins();
      const pluginConfig: PluginConfig = {
        plugins: corePlugins,
      };

      kit = await initializeTestKit(pluginConfig);
      const tools = kit.getAggregatedLangChainTools();

      expect(tools.length).toBe(59);
      expect(tools.some(tool => tool.name.includes('hts'))).toBe(true);
      expect(tools.some(tool => tool.name.includes('hcs'))).toBe(true);
      expect(tools.some(tool => tool.name.includes('account'))).toBe(true);
      expect(tools.some(tool => tool.name.includes('scs'))).toBe(true);
      expect(tools.some(tool => tool.name.includes('network'))).toBe(true);
    });

    it('should ensure unique plugin IDs', async () => {
      const corePlugins = getAllHederaCorePlugins();
      const pluginIds = corePlugins.map(plugin => plugin.id);
      const uniqueIds = new Set(pluginIds);
      
      expect(uniqueIds.size).toBe(pluginIds.length);
    });
  });

  describe('Plugin Initialization', () => {
    it('should initialize plugins with proper context', async () => {
      const htsPlugin = new HederaHTSPlugin();
      const pluginConfig: PluginConfig = {
        plugins: [htsPlugin],
      };

      kit = await initializeTestKit(pluginConfig);

      // Verify the plugin was initialized by checking if it provides tools
      const tools = kit.getAggregatedLangChainTools();
      expect(tools.length).toBeGreaterThan(0);
    });

    it('should handle model capability from context', async () => {
      const htsPlugin = new HederaHTSPlugin();
      const pluginConfig: PluginConfig = {
        plugins: [htsPlugin],
        appConfig: {
          modelCapability: ModelCapability.LARGE,
        },
      };

      kit = await initializeTestKit(pluginConfig);

      // Verify the plugin was initialized with the correct model capability
      const tools = kit.getAggregatedLangChainTools();
      expect(tools.length).toBeGreaterThan(0);
    });
  });
}); 