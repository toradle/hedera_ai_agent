import { LedgerId } from "@hashgraph/sdk";
import { HederaMirrornodeService } from "./hedera-mirrornode-service";
import { TopicMessage, TopicMessagesResponse, TopicMessagesQueryParams, TopicMessagesApiResponse, AccountResponse, TokenBalancesResponse, LedgerIdToBaseUrl } from "./types";

export class HederaMirrornodeServiceDefaultImpl implements HederaMirrornodeService {
    private readonly baseUrl: string;
    
    constructor(private readonly ledgerId: LedgerId) {
        if (!LedgerIdToBaseUrl.has(ledgerId)) {
            throw new Error(`Network type ${ledgerId} not supported`);
        }
        this.baseUrl = LedgerIdToBaseUrl.get(ledgerId)!;
    }


    async getAccount(accountId: string): Promise<AccountResponse> {
        const url = `${this.baseUrl}/accounts/${accountId}/balance`;
        const response = await fetch(url);
        const data: AccountResponse = await response.json();
        return data;
    }

    async getAccountHBarBalance(accountId: string): Promise<BigNumber> {
        const account = await this.getAccount(accountId);
        return new BigNumber(account.balance);
    }

    async getAccountTokenBalances(accountId: string, tokenId?: string): Promise<TokenBalancesResponse> {
        const tokenIdParam = tokenId ? `&token.id=${tokenId}` : '';
        const url = `${this.baseUrl}/accounts/${accountId}/tokens?${tokenIdParam}`;
        const response = await fetch(url);
        const data: TokenBalancesResponse = await response.json();
        return data;
    }

    async getTopicMessages(queryParams: TopicMessagesQueryParams): Promise<TopicMessagesResponse> {
        const lowerThreshold = queryParams.lowerTimestamp ? `&timestamp=gte:${queryParams.lowerTimestamp}` : '';
        const upperThreshold = queryParams.upperTimestamp ? `&timestamp=lte:${queryParams.upperTimestamp}` : '';
        const limit = `&limit=100`;
        let url: string | null = `${this.baseUrl}/topics/${queryParams.topicId}/messages?${lowerThreshold}${upperThreshold}${limit}`;
        
        const arrayOfMessages: TopicMessage[] = [];
        let fetchedMessages = 0;
        try {
            while (url) {   // Results are paginated
    
                fetchedMessages += 1;
                const response = await fetch(url);
    
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}. Message: ${response.statusText}`);
                }
    
                const data: TopicMessagesApiResponse = await response.json();
    
                arrayOfMessages.push(...data.messages);
                if(fetchedMessages >= 100) {
                    break;
                }
    
                // Update URL for pagination.
                // This endpoint does not return a full path to the next page, it has to be built first
                url = data.links.next ? this.baseUrl + data.links.next : null;
            }
        } catch (error) {
            console.error("Failed to fetch topic messages. Error:", error);
            throw error;
        }
        return {
            topicId: queryParams.topicId,
            messages: arrayOfMessages.slice(0, queryParams.limit)
        };
    }
        

}