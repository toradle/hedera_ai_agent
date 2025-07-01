import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { HederaConversationalAgent } from '../../src/agent/conversational-agent';
import { AbstractSigner } from '../../src/signer/abstract-signer';
import { PrivateKey, AccountId } from '@hashgraph/sdk';
import { StructuredTool } from '@langchain/core/tools';

/**
 * Mock signer for testing
 */
class MockSigner extends AbstractSigner {
  private accountId: AccountId;
  private privateKey: PrivateKey;

  constructor(accountId: string, privateKey: PrivateKey) {
    super();
    this.accountId = AccountId.fromString(accountId);
    this.privateKey = privateKey;
  }

  override getAccountId(): AccountId {
    return this.accountId;
  }

  override getNetwork(): 'mainnet' | 'testnet' {
    return 'testnet';
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  override async getPublicKey(): Promise<any> {
    return this.privateKey.publicKey;
  }

  override getOperatorPrivateKey(): PrivateKey {
    return this.privateKey;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  override async signTransaction(transaction: any): Promise<any> {
    return transaction;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  override async signAndExecuteTransaction(): Promise<any> {
    return {
      status: { toString: () => 'SUCCESS' },
      transactionId: '0.0.12345@1234567890.123456789',
    };
  }

  override async checkTransactionStatus(): Promise<boolean> {
    return true;
  }

  override getPrivateKey(): PrivateKey {
    return this.privateKey;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  override getClient(): any {
    throw new Error('getClient not implemented in MockSigner');
  }
}

describe('HederaConversationalAgent Tool Filter', () => {
  let agent: HederaConversationalAgent;
  let mockSigner: MockSigner;
  let originalEnv: NodeJS.ProcessEnv;
  let filteredTools: string[] = [];

  beforeEach(() => {
    originalEnv = process.env;
    process.env = { ...originalEnv };
    process.env.OPENAI_API_KEY = 'test-key';

    const testKey = PrivateKey.generateED25519();
    mockSigner = new MockSigner('0.0.12345', testKey);

    vi.spyOn(console, 'log').mockImplementation(() => {});
    filteredTools = [];
  });

  afterEach(() => {
    process.env = originalEnv;
    vi.restoreAllMocks();
  });

  it('should keep all tools when no filter is provided', async () => {
    agent = new HederaConversationalAgent(mockSigner, {
      openAIApiKey: 'test-key',
    });

    await agent.initialize();

    // No tools should be filtered
    expect(filteredTools).toHaveLength(0);
  });

  it('should handle filter that removes all tools', async () => {

    agent = new HederaConversationalAgent(mockSigner, {
      openAIApiKey: 'test-key',
      toolFilter: () => false, // Filter out all tools
      verbose: false,
      disableLogging: false,
    });

    // Spy on the agent's logger
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const agentLogger = (agent as any).logger;
    const agentWarnSpy = vi.spyOn(agentLogger, 'warn');

    await agent.initialize();

    // Should warn about no tools
    expect(agentWarnSpy).toHaveBeenCalledWith(
      'No tools were loaded into HederaAgentKit. The agent may not function correctly.'
    );
  });

  it('should only keep tools matching a specific pattern', async () => {
    const keptTools: string[] = [];

    agent = new HederaConversationalAgent(mockSigner, {
      openAIApiKey: 'test-key',
      toolFilter: (tool: StructuredTool) => {
        const shouldKeep =
          tool.name.includes('get-') || tool.name.includes('query');
        if (shouldKeep) {
          keptTools.push(tool.name);
        }
        return shouldKeep;
      },
    });

    await agent.initialize();

    // All kept tools should match the pattern
    keptTools.forEach((toolName) => {
      expect(toolName.includes('get-') || toolName.includes('query')).toBe(
        true
      );
    });
  });
});
