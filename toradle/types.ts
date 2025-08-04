// Interface for Redis message structure
export interface RedisMessage {
  fetch_id: string;
  source: string;
  query: string;
  userId: string;
  metadata?: unknown;
}

// Interface for Redis response structure
export interface RedisResponse {
  fetch_id: string | undefined;
  source: string;
  userId: number,
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