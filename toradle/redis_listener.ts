if (typeof window === 'undefined') {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (global as any).window = {};
}
if (typeof self === 'undefined') {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (global as any).self = global;
}

import * as dotenv from 'dotenv';
dotenv.config();

import './hedera-logger-override';

import { ServerSigner } from '../src/signer/server-signer';
import { Transaction } from '@hashgraph/sdk';
import { Buffer } from 'buffer';
import {
  HederaConversationalAgent,
  AgentResponse,
} from '../src/agent/conversational-agent';
import { HelloWorldPlugin } from './hello-world-plugin';
import type { IPlugin } from '../src/plugins';
import type { HederaNetworkType } from '../src/types';
import chalk from 'chalk';
import gradient from 'gradient-string';
import { enableHederaLogging } from './hedera-logger-override';
import { HederaAccountPlugin, HederaHCSPlugin } from '../src/plugins/core';
import { 
  connectRedis, 
  subscribeToChannel, 
  publishToRespChannel,
  checkRedisHealth,
  REDIS_REQ_CHANNEL,
  REDIS_RESP_CHANNEL
} from './redis-client';

// Interface for Redis message structure
interface RedisMessage {
  fetch_id: string;
  query: string;
  userId?: string;
  metadata?: unknown;
}

// Interface for Redis response structure
interface RedisResponse {
  id: string | undefined;
  success: boolean;
  message?: string | undefined;
  output?: string;
  notes?: string[] | undefined;
  error?: string | undefined;
  transactionBytes?: string;
  scheduleId?: string;
  requiresUserAction?: boolean;
  actionType?: 'sign_transaction' | 'sign_schedule';
  metadata?: unknown;
}

async function main(): Promise<void> {
  const hederaGradient = gradient(['#8259ef', '#2d84eb']);
  const successGradient = gradient(['#3ec878', '#2d84eb']);
  // const warningColor = chalk.hex('#464646').dim;
  const errorColor = chalk.hex('#464646');
  const primaryPurple = chalk.hex('#8259ef').bold;
  const primaryBlue = chalk.hex('#2d84eb').bold;
  const primaryGreen = chalk.hex('#3ec878').bold;
  const charcoal = chalk.hex('#464646');

  const args = process.argv.slice(2);
  const mode = args[0] || 'returnBytes';

  if (!['autonomous', 'returnBytes'].includes(mode)) {
    console.error(
      errorColor(
        `Invalid mode: ${mode}. Use 'autonomous' or 'returnBytes'.`
      )
    );
    process.exit(1);
  }

  const isAutonomous = mode === 'autonomous';
  const modeDescription = isAutonomous
    ? 'Autonomous Mode'
    : 'Human-in-the-Loop Mode';

  const banner = `
  ${hederaGradient(
      '╔═══════════════════════════════════════════════════════════════╗'
    )}
  ${hederaGradient(
      '║                      HEDERA AGENT KIT                        ║'
    )}
  ${hederaGradient(`║                   ${modeDescription.padEnd(30)} ║`)}
  ${hederaGradient(`║                     Redis Listener Mode                       ║`)}
  ${hederaGradient(
      '╚═══════════════════════════════════════════════════════════════╝'
    )}
`;

  console.log(banner);
  console.log(primaryGreen('🚀 Initializing Hedera Agent Kit with Redis...\n'));
  console.log(primaryBlue(`🔧 Operational Mode: ${chalk.white(mode)}\n`));

  const operatorId = process.env.HEDERA_ACCOUNT_ID;
  const operatorKey = process.env.HEDERA_PRIVATE_KEY;
  const network = (process.env.HEDERA_NETWORK || 'testnet') as HederaNetworkType;
  const openaiApiKey = process.env.OPENAI_API_KEY;

  const userAccountId = process.env.USER_ACCOUNT_ID;
  const userPrivateKey = process.env.USER_PRIVATE_KEY;

  if (!operatorId || !operatorKey) {
    throw new Error(
      'HEDERA_ACCOUNT_ID and HEDERA_PRIVATE_KEY must be set in .env'
    );
  }
  if (!openaiApiKey) {
    throw new Error('OPENAI_API_KEY must be set in .env');
  }

  // Connect to Redis using imported functions
  console.log(primaryBlue('🔗 Connecting to Redis...'));
  try {
    await connectRedis();
    const isHealthy = await checkRedisHealth();
    if (!isHealthy) {
      throw new Error('Redis health check failed');
    }
    console.log(successGradient('✅ Redis connected and healthy!'));
    console.log(`${primaryPurple('📥 Listening on:')} ${chalk.white(REDIS_REQ_CHANNEL)}`);
    console.log(`${primaryPurple('📤 Publishing to:')} ${chalk.white(REDIS_RESP_CHANNEL)}`);
  } catch (error) {
    console.error(errorColor('❌ Failed to connect to Redis:'), error);
    process.exit(1);
  }

  const agentSigner = new ServerSigner(operatorId, operatorKey, network);

  const conversationalAgent = new HederaConversationalAgent(agentSigner, {
    operationalMode: mode as 'returnBytes' | 'autonomous',
    ...(userAccountId && { userAccountId }),
    verbose: false,
    openAIApiKey: openaiApiKey,
    scheduleUserTransactionsInBytesMode: true,
    openAIModelName: 'gpt-4o-mini',
    pluginConfig: {
      plugins: [
        new HederaHCSPlugin(),
        new HederaAccountPlugin(),
        new HelloWorldPlugin() as IPlugin],
    },
  });

  const loadingFrames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
  let frameIndex = 0;
  const loadingInterval = setInterval(() => {
    process.stdout.write(
      `\r${primaryBlue(
        `${loadingFrames[frameIndex]} Initializing Hedera Agent Kit...`
      )}`
    );
    frameIndex = (frameIndex + 1) % loadingFrames.length;
  }, 100);

  await conversationalAgent.initialize();

  setTimeout(() => {
    clearInterval(loadingInterval);
    process.stdout.write('\r' + ' '.repeat(50) + '\r');

    console.log(successGradient('✅ Hedera Agent Kit Ready!'));
    console.log(
      `${primaryPurple('🤖 AI Agent:')} ${chalk.white(
        'Connected and operational'
      )}`
    );
    console.log(
      `${primaryBlue('🌐 Network:')} ${chalk.white(network.toUpperCase())}`
    );
    console.log(
      `${primaryPurple('🔗 Agent Account:')} ${chalk.white(operatorId)}`
    );
    if (userAccountId && userPrivateKey) {
      console.log(
        `${primaryGreen('👤 User Account:')} ${chalk.white(
          userAccountId
        )} ${charcoal.dim('(configured)')}`
      );
    } else {
      console.log(`${charcoal.dim('👤 User Account: Not configured')}`);
    }
    console.log();
    console.log(
      primaryBlue.dim('🎧 Redis listener active - waiting for messages...')
    );
    console.log(
      primaryPurple.dim(
        '💡 Send messages to Redis channel to interact with the agent'
      )
    );
    console.log();

    console.log(
      charcoal.dim(
        '📊 Initialization logs suppressed for clean startup experience'
      )
    );
    console.log();
    enableHederaLogging();
    
    // Start Redis listener
    startRedisListener();
  }, 1000);

  const chatHistoryMap = new Map<string, Array<{ type: 'human' | 'ai'; content: string }>>();

  async function handleUserSignedExecution(
    transactionBytesBase64: string,
    messageId: string,
    userId: string = 'default'
  ): Promise<void> {
    if (!userAccountId || !userPrivateKey) {
      const response: RedisResponse = {
        id: messageId,
        success: false,
        error: 'User keys not configured - USER_ACCOUNT_ID and USER_PRIVATE_KEY are not set.',
      };
      await publishToRespChannel(JSON.stringify(response));
      return;
    }

    console.log(
      `${primaryBlue('Agent >')} ${primaryPurple(
        `Preparing and executing transaction with user account ${userAccountId}...`
      )}`
    );
    
    try {
      const userSigner = new ServerSigner(
        userAccountId,
        userPrivateKey,
        network
      );
      const txBytes = Buffer.from(
        transactionBytesBase64.replace(/`/g, '').trim(),
        'base64'
      );
      let transaction = Transaction.fromBytes(txBytes);

      let frozenTx;
      if (transaction.isFrozen()) {
        frozenTx = transaction;
      } else {
        frozenTx = await transaction.freezeWith(userSigner.getClient());
      }
      const signedTx = await frozenTx.sign(userSigner.getOperatorPrivateKey());

      const response = await signedTx.execute(userSigner.getClient());
      const receipt = await response.getReceipt(userSigner.getClient());

      const successMsg = `Transaction executed with your key. Receipt: ${JSON.stringify(
        receipt.toJSON()
      )}`;
      
      console.log(`${primaryGreen('Agent >')} ${primaryGreen(successMsg)}`);
      
      const chatHistory = chatHistoryMap.get(userId) || [];
      chatHistory.push({ type: 'ai', content: successMsg });
      chatHistoryMap.set(userId, chatHistory);

      const redisResponse: RedisResponse = {
        id: messageId,
        success: true,
        message: successMsg,
        output: JSON.stringify(receipt.toJSON()),
      };
      await publishToRespChannel(JSON.stringify(redisResponse));
    } catch (e: unknown) {
      const error = e as Error;
      const errorMsg = `Sorry, I encountered an error executing that with your key: ${error.message || String(e)}`;
      
      console.error(
        `${errorColor('Agent >')} ${charcoal.dim(
          'Error executing transaction with user key:'
        )}`,
        e
      );
      
      const chatHistory = chatHistoryMap.get(userId) || [];
      chatHistory.push({ type: 'ai', content: errorMsg });
      chatHistoryMap.set(userId, chatHistory);

      const redisResponse: RedisResponse = {
        id: messageId,
        success: false,
        error: errorMsg,
      };
      await publishToRespChannel(JSON.stringify(redisResponse));
    }
  }

  async function processAndRespond(
    userInput: string,
    messageId: string,
    userId: string = 'default',
    isFollowUp: boolean = false
  ): Promise<void> {
    const chatHistory = chatHistoryMap.get(userId) || [];
    
    if (!isFollowUp) {
      chatHistory.push({ type: 'human', content: userInput });
      chatHistoryMap.set(userId, chatHistory);
    }

    try {
      console.log(
        `${primaryBlue('🤖 Processing message:')} ${chalk.white(`"${userInput}"`)}`
      );

      const agentResponse: AgentResponse =
        await conversationalAgent.processMessage(userInput, chatHistory);

      if (agentResponse.notes) {
        console.log(
          `${primaryBlue('Agent Notes >')} ${charcoal.dim(
            agentResponse.notes.map((note) => `- ${note}`).join('\n')
          )}`
        );
      }

      console.log(
        `${primaryPurple('Agent Message >')} ${chalk.white(
          agentResponse.message
        )}`
      );
      
      if (agentResponse.output !== agentResponse.message) {
        console.log(
          `${primaryBlue('Agent Tool Output (JSON) >')} ${charcoal.dim(
            agentResponse.output
          )}`
        );
      }

      chatHistory.push({
        type: 'ai',
        content: agentResponse.message || agentResponse.output,
      });
      chatHistoryMap.set(userId, chatHistory);

      // Handle scheduled transactions
      if (agentResponse.scheduleId) {
        const response: RedisResponse = {
          id: messageId,
          success: true,
          message: agentResponse.message,
          output: agentResponse.output,
          notes: agentResponse.notes,
          scheduleId: agentResponse.scheduleId,
          requiresUserAction: true,
          actionType: 'sign_schedule',
        };
        await publishToRespChannel(JSON.stringify(response));
        return;
      }

      // Handle transaction bytes
      if (agentResponse.transactionBytes) {
        const response: RedisResponse = {
          id: messageId,
          success: true,
          message: agentResponse.message,
          output: agentResponse.output,
          notes: agentResponse.notes,
          transactionBytes: agentResponse.transactionBytes,
          requiresUserAction: !!(userAccountId && userPrivateKey),
          actionType: 'sign_transaction',
        };
        await publishToRespChannel(JSON.stringify(response));
        return;
      }

      // Regular response
      const response: RedisResponse = {
        id: messageId,
        success: true,
        message: agentResponse.message,
        output: agentResponse.output,
        notes: agentResponse.notes,
        error: agentResponse.error,
      };
      await publishToRespChannel(JSON.stringify(response));

    } catch (e: unknown) {
      const error = e as Error;
      const errorMsg = error.message || String(e);
      
      console.error(
        `${errorColor('Error during agent processing:')}`,
        errorMsg
      );
      
      chatHistory.push({
        type: 'ai',
        content: `Sorry, a critical error occurred: ${errorMsg}`,
      });
      chatHistoryMap.set(userId, chatHistory);

      const response: RedisResponse = {
        id: messageId,
        success: false,
        error: `Critical error occurred: ${errorMsg}`,
      };
      await publishToRespChannel(JSON.stringify(response));
    }
  }

  async function startRedisListener(): Promise<void> {
    console.log(primaryGreen('🎧 Starting Redis listener...'));
    
    // Use the imported subscribeToChannel function
    await subscribeToChannel(async (message: string) => {
      try {
        console.log(`${primaryBlue('📥 Received message:')} ${charcoal.dim(message)}`);
        
        const redisMessage: RedisMessage = JSON.parse(message);
        const { fetch_id, query, userId = 'default' } = redisMessage;

        if (!fetch_id || !query) {
          console.error(errorColor('Invalid message format - missing id or input'));
          const errorResponse: RedisResponse = {
            id: fetch_id || 'unknown',
            success: false,
            error: 'Invalid message format - missing id or input',
          };
          await publishToRespChannel(JSON.stringify(errorResponse));
          return;
        }

        // Handle special commands
        if (query.toLowerCase().startsWith('execute_transaction:')) {
          const transactionBytes = query.replace('execute_transaction:', '').trim();
          await handleUserSignedExecution(transactionBytes, fetch_id, userId);
          return;
        }

        if (query.toLowerCase().startsWith('sign_schedule:')) {
          const scheduleId = query.replace('sign_schedule:', '').trim();
          const followUpInput = `Sign and submit scheduled transaction ${scheduleId}`;
          await processAndRespond(followUpInput, fetch_id, userId, true);
          return;
        }

        // Regular message processing
        await processAndRespond(query, fetch_id, userId);

      } catch (error) {
        console.error(errorColor('Error parsing Redis message:'), error);
        const errorResponse: RedisResponse = {
          id: 'unknown',
          success: false,
          error: 'Failed to parse message JSON',
        };
        await publishToRespChannel(JSON.stringify(errorResponse));
      }
    }, REDIS_REQ_CHANNEL);

    console.log(successGradient('✅ Redis listener started successfully!'));
    console.log(primaryPurple('🔄 Agent is now ready to process Redis messages...'));
  }

  // Handle graceful shutdown
  process.on('SIGINT', () => {
    console.log(`\n${hederaGradient('🛑 Shutting down Hedera Agent Kit...')}`);
    console.log(successGradient('✅ Redis listener stopped. Goodbye!'));
    process.exit(0);
  });
}

main().catch(console.error);