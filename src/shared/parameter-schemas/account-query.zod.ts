import { z } from "zod";
import { Context } from "../configuration";

// add a description to the parameters
export const accountQueryParameters = (_context: Context = {}) => z.object({
    accountId: z.string().describe('The account ID to query.'),
});

//add a description to the parameters
export const accountBalanceQueryParameters = (_context: Context = {}) => z.object({
    accountId: z.string().describe('The account ID to query.'),
});

//add a description to the parameters
export const accountTokenBalancesQueryParameters = (_context: Context = {}) => z.object({
    accountId: z.string().describe('The account ID to query.'),
    tokenId: z.string().optional().describe('The token ID to query.'),
});

export const accountTopicMessagesQueryParameters = (_context: Context = {}) => z.object({
    topicId: z.string().describe('The topic ID to query.'),
    lowerTimestamp: z.string().optional().describe('The lower timestamp to query.'),
    upperTimestamp: z.string().optional().describe('The upper timestamp to query.'),
    limit: z.number().optional().describe('The limit of messages to query.'),
});