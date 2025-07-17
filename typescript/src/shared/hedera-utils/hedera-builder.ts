import {
  Hbar,
  PublicKey,
  TokenAirdropTransaction,
  TokenCreateTransaction,
  TokenSupplyType,
  TokenType,
  TopicCreateTransaction,
  TopicMessageSubmitTransaction,
  TransferTransaction,
} from '@hashgraph/sdk';
import {
  airdropFungibleTokenParameters,
  createFungibleTokenParametersNormalised,
  createNonFungibleTokenParametersNormalised,
} from '../parameter-schemas/hts.zod';
import z from 'zod';
import { transferHbarParameters } from 'typescript/src/shared/parameter-schemas/has.zod';
import {
  createTopicParametersNormalised,
  submitTopicMessageParameters,
} from 'typescript/src/shared/parameter-schemas/hcs.zod';

export default class HederaBuilder {
  static createFungibleToken(
    params: z.infer<ReturnType<typeof createFungibleTokenParametersNormalised>>,
  ) {
    const tx = new TokenCreateTransaction()
      .setTokenName(params.tokenName)
      .setTreasuryAccountId(params.treasuryAccountId!)
      .setTokenType(TokenType.FungibleCommon)
      .setDecimals(params.decimals)
      .setInitialSupply(params.initialSupply ?? 0)
      .setSupplyType(
        params.supplyType === 'infinite' ? TokenSupplyType.Infinite : TokenSupplyType.Finite,
      );

    if (params.tokenSymbol) {
      tx.setTokenSymbol(params.tokenSymbol);
    }

    if (params.supplyType === 'finite' && params.maxSupply !== undefined) {
      tx.setMaxSupply(params.maxSupply);
    }

    if (params.supplyKey) {
      tx.setSupplyKey(PublicKey.fromString(params.supplyKey));
    }

    return tx;
  }

  static createNonFungibleToken(
    params: z.infer<ReturnType<typeof createNonFungibleTokenParametersNormalised>>,
  ) {
    const maxSupply = params.maxSupply ?? 100; // default max supply for NFT

    return new TokenCreateTransaction()
      .setTokenName(params.tokenName)
      .setTokenSymbol(params.tokenSymbol)
      .setTreasuryAccountId(params.treasuryAccountId!)
      .setTokenType(TokenType.NonFungibleUnique)
      .setSupplyType(TokenSupplyType.Finite) // NFT supply is always finite
      .setMaxSupply(maxSupply)
      .setSupplyKey(PublicKey.fromString(params.supplyKey!));
  }

  static transferHbar(params: z.infer<ReturnType<typeof transferHbarParameters>>) {
    return new TransferTransaction()
      .addHbarTransfer(params.destinationAccountId, new Hbar(params.hbarAmount))
      .addHbarTransfer(params.sourceAccountId as string, new Hbar(params.hbarAmount).negated())
      .setTransactionMemo(params.transactionMemo || '');
  }

  static airdropFungibleToken(params: z.infer<ReturnType<typeof airdropFungibleTokenParameters>>) {
    const tx = new TokenAirdropTransaction();
    const totalAmount = params.recipients.reduce(
      (sum, recipient) => sum + Number(recipient.amount),
      0,
    );
    tx.addTokenTransfer(params.tokenId, params.sourceAccountId!, -totalAmount);

    // Add transfers to each recipient
    for (const recipient of params.recipients) {
      tx.addTokenTransfer(params.tokenId, recipient.accountId, Number(recipient.amount));
    }
    tx.setTransactionMemo(params.transactionMemo || '');

    return tx;
  }

  static createTopic(params: z.infer<ReturnType<typeof createTopicParametersNormalised>>) {
    const transaction = new TopicCreateTransaction();

    if (params.topicMemo) {
      transaction.setTopicMemo(params.topicMemo);
    }
    if (params.submitKey) {
      transaction.setSubmitKey(PublicKey.fromString(params.submitKey));
    }

    return transaction;
  }

  static submitTopicMessage(params: z.infer<ReturnType<typeof submitTopicMessageParameters>>) {
    return new TopicMessageSubmitTransaction()
      .setTopicId(params.topicId)
      .setMessage(params.message);
  }
}
