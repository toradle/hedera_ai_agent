import { createClient } from 'redis';
import * as dotenv from 'dotenv';
dotenv.config();

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';

export const REDIS_REQ_CHANNEL = process.env.REDIS_REQ_CHANNEL || ""
export const REDIS_RESP_CHANNEL = process.env.REDIS_RESP_CHANNEL || ""

if (!REDIS_URL || !REDIS_REQ_CHANNEL || !REDIS_RESP_CHANNEL) {
  throw new Error('Missing REDIS_URL environment variable');
}

// Create and configure Redis client
const redisClient = createClient({ url: REDIS_URL });
redisClient.on('error', (err) => console.log('Redis Client Error', err));

// Connect to Redis
export const connectRedis = async (): Promise<void> => {
  await redisClient.connect();
};

// Function to set a key-value pair in Redis
export const setValue = async (key: string, value: string): Promise<void> => {
  await redisClient.set(key, value);
};

// Function to retrieve a value by key from Redis
export const getValue = async (key: string): Promise<string | null> => {
  return redisClient.get(key);
};

export const checkRedisHealth = async (): Promise<boolean> => {
  try {
    await redisClient.set('health', 'ok');
    const reply = await redisClient.get('health');
    return reply === 'ok';
  } catch (error) {
    console.error('Redis Health Check Failed:', error);
    return false;
  }
};

// Function to subscribe to a Redis channel
export const subscribeToChannel = async (
  handler: (message: string) => void,
  channel: string = REDIS_REQ_CHANNEL,
): Promise<void> => {
  const subscriber = createClient({ url: REDIS_URL });
  subscriber.on('error', (err) => console.error('Redis Subscriber Error', err));
  await subscriber.connect();
  await subscriber.subscribe(channel, (message) => {
    handler(message);
  });
};

// Function to publish a message to the REDIS_RESP_CHANNEL
export const publishToRespChannel = async (message: string): Promise<void> => {
  await redisClient.publish(REDIS_RESP_CHANNEL, message);
};
