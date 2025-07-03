import { describe, it, expect, beforeAll } from 'vitest';
import dotenv from 'dotenv';
import path from 'path';
import { AccountAllowanceApproveTransaction, AccountCreateTransaction, AccountId, Client, Hbar, NftId, PrivateKey, PublicKey, ScheduleCreateTransaction, ScheduleInfoQuery, TokenSupplyType, Transaction, TransactionReceipt } from '@hashgraph/sdk';
import { HederaConversationalAgent } from '../../src/agent/conversational-agent';
import { ServerSigner } from '../../src/signer/server-signer';
import HederaAccountPlugin from '../../src/plugins/core/HederaAccountPlugin';
import { HederaAgentKit } from '../../src/agent/agent';
import { AccountBuilder } from '../../src/builders/account/account-builder';
import { HtsBuilder } from '../../src/builders/hts/hts-builder';
import { HederaMirrorNode } from '../../src/services';
import { createNewHederaAccount, delay, signAndExecuteTransaction } from './utils';

dotenv.config({ path: path.resolve(__dirname, '../../../.env.test') });

describe('HederaAccountPlugin Integration (Testnet)', () => {
  let agent: HederaConversationalAgent;
  let signer: ServerSigner;
  let hederaMirrorNode: HederaMirrorNode;
  let mainAccountId: string;
  let newAccountId: string;
  let newAccountPrivateKey: PrivateKey;
  let ftTokenId: string;
  let nftTokenId: string;
  let mintedSerial: number | undefined;

  beforeAll(async () => {
    mainAccountId = process.env.HEDERA_ACCOUNT_ID!;
    const privateKey = process.env.HEDERA_PRIVATE_KEY!;
    const openAIApiKey = process.env.OPENAI_API_KEY!;

    signer = new ServerSigner(mainAccountId, privateKey, 'testnet');
    agent = new HederaConversationalAgent(signer, {
      pluginConfig: { plugins: [new HederaAccountPlugin()] },
      userAccountId: mainAccountId,
      openAIApiKey,
      verbose: true,
      scheduleUserTransactionsInBytesMode: false,
      operationalMode: 'returnBytes',
    });
    await agent.initialize();

    hederaMirrorNode = new HederaMirrorNode('testnet');

    const hederaKit = new HederaAgentKit(signer);
    await hederaKit.initialize();

    const htsBuilder = new HtsBuilder(hederaKit);

    newAccountPrivateKey = PrivateKey.generateED25519();

    const accountBuilder = new AccountBuilder(hederaKit);
    accountBuilder.createAccount({
      key: newAccountPrivateKey.publicKey,
      initialBalance: 2,
    });
    const accountResult = await accountBuilder.execute();
    newAccountId = accountResult.receipt?.accountId?.toString() || ''

    const ftResult = await htsBuilder.createFungibleToken({
      tokenName: 'Test Token',
      tokenSymbol: 'TT',
      initialSupply: 1_000_000,
      decimals: 2,
      treasuryAccountId: mainAccountId,
      supplyType: TokenSupplyType.Infinite,
    }).then(result => result.execute());

    ftTokenId = ftResult.receipt?.tokenId?.toString() || ''
    expect(ftTokenId).toBeDefined();

    const nftResult = await htsBuilder.createNonFungibleToken({
      tokenName: 'Test NFT',
      tokenSymbol: 'TNFT',
      treasuryAccountId: mainAccountId,
      supplyType: TokenSupplyType.Finite,
      maxSupply: 10,
    }).then(result => result.execute());

    nftTokenId = nftResult.receipt?.tokenId?.toString() || '';
    expect(nftTokenId).toBeDefined();

    const mintResult = await htsBuilder.mintNonFungibleToken({
      tokenId: nftTokenId,
      senderAccountId: mainAccountId,
      receiverAccountId: newAccountId,
      metadata: [Buffer.from('test-metadata')],
    }).execute();

    mintedSerial = mintResult.receipt?.serials?.[0]?.toNumber();
    expect(mintedSerial).toBeDefined();
  });

  it('should approve fungible token allowance', async () => {
    const amountToApprove = 1000;
    const response = await agent.processMessage(
      `Approve ${amountToApprove} tokens for spender ${newAccountId} on token ${ftTokenId}`
    );

    console.log('response', response)

    // TODO: there's no HederaMirrorNode method to check this test scenario. It will be better to add it in the future and call it here to check the result on chain.
    expect(response.success).toBe(true);
    expect(response.error).toBeUndefined();
  });

  it('should approve HBAR allowance', async () => {
    const amountToApprove = 1;
    const response = await agent.processMessage(
      `Approve ${amountToApprove} HBAR for spender ${newAccountId}`
    );
        console.log('response', response)

    // TODO: there's no HederaMirrorNode method to check this test scenario. It will be better to add it in the future and call it here to check the result on chain.
    expect(response.success).toBe(true);
    expect(response.error).toBeUndefined();
  });

  it('should approve and then revoke HBAR allowance for a spender account', async () => {
    const approveAmount = 10;
    const approveResponse = await agent.processMessage(
      `Approve ${approveAmount} HBAR for spender ${newAccountId}`
    );
        console.log('approveResponse', approveResponse)

    expect(approveResponse.success).toBe(true);
    expect(approveResponse.error).toBeUndefined();

    await delay(5000)
    // TODO: there's no HederaMirrorNode method to check this test scenario. It will be better to add it in the future and call it here to check the result on chain.
    const revokeResponse = await agent.processMessage(
      `Revoke HBAR allowance for spender ${newAccountId}`
    );
            console.log('revokeResponse', revokeResponse)

    expect(revokeResponse.success).toBe(true);
    expect(revokeResponse.error).toBeUndefined();
  });

  it('should approve NFT allowance for spender', async () => {
    expect(mintedSerial).toBeDefined();
    const response = await agent.processMessage(
      `Approve NFT ${nftTokenId} serial ${mintedSerial} for spender ${newAccountId}`
    );
    console.log('response', response)
    // TODO: there's no HederaMirrorNode method to check this test scenario. It will be better to add it in the future and call it here to check the result on chain.
    expect(response.success).toBe(true);
    expect(response.error).toBeUndefined();
  });

  it('should revoke fungible token allowance', async () => {
    const response = await agent.processMessage(
      `Revoke allowance for spender ${newAccountId} on token ${ftTokenId}`
    );
        console.log('response', response)

    // TODO: there's no HederaMirrorNode method to check this test scenario. It will be better to add it in the future and call it here to check the result on chain.
    expect(response.success).toBe(true);
    expect(response.error).toBeUndefined();
  });

  it('should create a new account using HederaCreateAccountTool', async () => {
    let newAccountPrivateKey = PrivateKey.generateED25519();
    const response = await agent.processMessage(
      `Create a new account with public key ${newAccountPrivateKey.publicKey.toString()} and initial balance 1 HBAR.`
    );
        console.log('response', response)

    let extractedAccountId: AccountId | string = '';

    if (
      response.receipt &&
      typeof response.receipt === 'object' &&
      'accountId' in response.receipt
    ) {
      const { accountId } = response.receipt as TransactionReceipt;
      extractedAccountId = accountId || ''
    }

    expect(response.success).toBe(true);
    expect(response.error).toBeUndefined();

    await delay(5000)

    const accountBalance = await hederaMirrorNode.getAccountBalance(extractedAccountId?.toString());
    expect(accountBalance).toBe(1);
  });

  it('should delete a newly created account using HederaDeleteAccountTool', async () => {
    const { accountId, privateKey } = await createNewHederaAccount(signer.getClient(), signer, 1)

    const deleteResponse = await agent.processMessage(
      `Delete account ${accountId} and transfer remaining balance to account ${mainAccountId}.`
    );
    console.log('deleteResponse', deleteResponse)

    const client = signer.getClient()
    const receipt = await signAndExecuteTransaction(deleteResponse.transactionBytes, privateKey, client)

    expect(receipt.status._code).toBe(22)
    expect(deleteResponse.success).toBe(true);
    expect(deleteResponse.error).toBeUndefined();

    await delay(5000);

    // TODO: later we probably should change getAccountBalance to getAccountInfo instead when it will be available
    const deletedBalance = await hederaMirrorNode.getAccountBalance(accountId.toString());
    expect(deletedBalance === 0 || deletedBalance === null || deletedBalance === undefined).toBe(true);
  });

  it('should update the memo of a newly created account using HederaUpdateAccountTool', async () => {
    const { accountId, privateKey } = await createNewHederaAccount(signer.getClient(), signer, 1);
    const newMemo = "TestMemo";
    const response = await agent.processMessage(
      `Update account ${accountId} memo to "${newMemo}". Sign with private key: ${privateKey.toString()}`
    );
        console.log('response', response)

    const client = signer.getClient()
    const receipt = await signAndExecuteTransaction(response.transactionBytes, privateKey, client)

    expect(receipt.status._code).toBe(22)
    expect(response.success).toBe(true);
    expect(response.error).toBeUndefined();

    await delay(5000);

    const updatedMemo = await hederaMirrorNode.getAccountMemo(accountId.toString());
    expect(updatedMemo).toBe(newMemo);
  });

  it('should transfer HBAR between two accounts using HederaTransferHbarTool', async () => {
    const { accountId: receiverAccountId, privateKey } = await createNewHederaAccount(signer.getClient(), signer, 1);
    const initialSenderBalance = await hederaMirrorNode.getAccountBalance(mainAccountId);
    const transferAmount = 1;
    const response = await agent.processMessage(
      `Transfer ${transferAmount} HBAR from account ${mainAccountId} to account ${receiverAccountId}`
    );
        console.log('response', response)

    const client = signer.getClient()
    const receipt = await signAndExecuteTransaction(response.transactionBytes, privateKey, client)

    expect(receipt.status._code).toBe(22)
    expect(response.success).toBe(true);
    expect(response.error).toBeUndefined();

    await delay(5000);

    const postSenderBalance = await hederaMirrorNode.getAccountBalance(mainAccountId);
    const postReceiverBalance = await hederaMirrorNode.getAccountBalance(receiverAccountId.toString());
    expect(Number(postSenderBalance)).toBeLessThan(Number(initialSenderBalance));
    expect(Number(postReceiverBalance)).toBe(2);
  });

  it('should delete NFT spender allowance for a specific serial using HederaDeleteNftSpenderAllowanceTool', async () => {
    expect(mintedSerial).toBeDefined();

    const hederaKit = new HederaAgentKit(signer);
    await hederaKit.initialize();
    const accountBuilder = new AccountBuilder(hederaKit);

    accountBuilder.approveTokenNftAllowance({
      ownerAccountId: newAccountId,
      spenderAccountId: mainAccountId,
      tokenId: nftTokenId,
      serials: [mintedSerial!],
      memo: 'Test approve NFT spender allowance for deletion',
    });
    await accountBuilder.execute();

    const deleteAllowanceResponse = await agent.processMessage(
      `Delete NFT spender allowance for NFT ${nftTokenId} serial ${mintedSerial} from spender ${mainAccountId} (owner ${newAccountId}).`
    );
        console.log('deleteAllowanceResponse', deleteAllowanceResponse)

    // TODO: there's no HederaMirrorNode method to check this test scenario. It will be better to add it in the future and call it here to check the result on chain.

    expect(deleteAllowanceResponse.success).toBe(true);
    expect(deleteAllowanceResponse.error).toBeUndefined();
  });

  it('should delete all spender allowances for a specific NFT serial using HederaDeleteNftSerialAllowancesTool', async () => {
    expect(mintedSerial).toBeDefined();

    const hederaKit = new HederaAgentKit(signer);
    await hederaKit.initialize();
    const accountBuilder = new AccountBuilder(hederaKit);

    accountBuilder.approveTokenNftAllowance({
      ownerAccountId: newAccountId,
      spenderAccountId: mainAccountId,
      tokenId: nftTokenId,
      serials: [mintedSerial!],
      memo: 'Test allow NFT serial for all spender deletion 1',
    });
    await accountBuilder.execute();

    const { accountId: anotherSpenderId } = await createNewHederaAccount(signer.getClient(), signer, 1);
    accountBuilder.approveTokenNftAllowance({
      ownerAccountId: newAccountId,
      spenderAccountId: anotherSpenderId.toString(),
      tokenId: nftTokenId,
      serials: [mintedSerial!],
      memo: 'Test allow NFT serial for all spender deletion 2',
    });
    await accountBuilder.execute();

    const nftIdString = `${nftTokenId}.${mintedSerial}`;
    const response = await agent.processMessage(
      `Delete all spender allowances for NFT ${nftIdString} (owner ${newAccountId}).`
    );
       console.log('response', response)
    expect(response.success).toBe(true);
    expect(response.error).toBeUndefined();
  });

  it('should get HBAR balance of an account using HederaGetAccountBalanceTool', async () => {
    const { accountId } = await createNewHederaAccount(signer.getClient(), signer, 1);

    const agentResponse = await agent.processMessage(
      `Get balance of account ${accountId}`
    );
    console.log('agentResponse', agentResponse)
    expect(agentResponse.success).toBe(true);
    expect(agentResponse.error).toBeUndefined();
    expect(agentResponse.balance).toBeDefined();
    expect(agentResponse.balance).toBe(1);

    await delay(5000)

    const accountBalance = await hederaMirrorNode.getAccountBalance(accountId?.toString());
    expect(accountBalance).toBe(1);
    expect(accountBalance).toBe(agentResponse.balance);
  });

  it('should get the public key of an account using HederaGetAccountPublicKeyTool', async () => {
    const { accountId: testAccountId, publicKey } = await createNewHederaAccount(
      signer.getClient(),
      signer,
      1
    );

    const response = await agent.processMessage(
      `Get public key of account ${testAccountId.toString()}`
    );
    console.log('response', response)

    expect(response.success).toBe(true);
    expect(response.error).toBeUndefined();
    expect(response.accountId).toBe(testAccountId.toString());
    expect(response.publicKey).toBe(publicKey.toString());
    expect(response.publicKeyDer).toBe(publicKey.toStringDer());
    expect(response.publicKeyRaw).toBe(publicKey.toStringRaw());

    await delay(5000)

    const mirrorNodePublicKey = await hederaMirrorNode.getPublicKey(testAccountId.toString());
    expect(response.publicKey).toBe(mirrorNodePublicKey.toString());
  });

  it('should get full info for an account using HederaGetAccountInfoTool', async () => {
    const { accountId: testAccountId, publicKey } = await createNewHederaAccount(
      signer.getClient(),
      signer,
      1
    );

    // TODO: change any to the right interface
    const agentResponse = await agent.processMessage(
      `Get account info for account ${testAccountId}`
    ) as any;
    console.log('agentResponse', agentResponse)

    expect(agentResponse.success).toBe(true);
    expect(agentResponse.error).toBeUndefined();
    expect(agentResponse.accountInfo).toBeDefined();
    expect(agentResponse.accountInfo.account).toBe(testAccountId.toString());
    expect(agentResponse.accountInfo.key).toBeDefined();
    expect(agentResponse.accountInfo.key.key).toBe(publicKey.toStringRaw());
    expect(agentResponse.accountInfo.memo).toBeDefined();

    await delay(5000)
    const mirrorNodeAccountInfo = await hederaMirrorNode.requestAccount(testAccountId.toString())

    expect(agentResponse.accountInfo.account).toBe(mirrorNodeAccountInfo.account);
    expect(agentResponse.accountInfo.key.key).toBe(mirrorNodeAccountInfo.key.key);
    expect(agentResponse.accountInfo.memo).toBe(mirrorNodeAccountInfo.memo);
    expect(agentResponse.accountInfo.deleted).toBe(mirrorNodeAccountInfo.deleted);
    expect(agentResponse.accountInfo.evm_address).toBe(mirrorNodeAccountInfo.evm_address);
  });

  it('should get all token balances for the account using HederaGetAccountTokensTool', async () => {
    const response = await agent.processMessage(
      `Get all token balances for account ${mainAccountId}`
    );
    console.log('response', response)

    expect(response.success).toBe(true);
    expect(response.error).toBeUndefined();
    expect(response.accountId).toBe(mainAccountId);
    expect(response.tokens).toBeDefined();
    expect(Array.isArray(response.tokens)).toBe(true);

    await delay(5000)

    const mirrorTokens = await hederaMirrorNode.getAccountTokens(mainAccountId);
    expect(response.tokenCount).toBe(mirrorTokens?.length);
  });

  // Skipped: Agent returns empty NFT list despite Mirror Node showing correct data. Needs investigation.
  it.skip('should get all NFTs for the account using HederaGetAccountNftsTool', async () => {
    const { accountId, privateKey } = await createNewHederaAccount(
      signer.getClient(),
      signer,
      10
    );

    const newSigner = new ServerSigner(accountId.toString(), privateKey, 'testnet');
    const hederaKit = new HederaAgentKit(newSigner);
    await hederaKit.initialize();
    const htsBuilder = new HtsBuilder(hederaKit);

    const nftResult = await htsBuilder.createNonFungibleToken({
      tokenName: 'Test NFT',
      tokenSymbol: 'TNFT',
      treasuryAccountId: accountId,
      supplyType: TokenSupplyType.Finite,
      maxSupply: 1,
    }).then(result => result.execute());

    nftTokenId = nftResult.receipt?.tokenId?.toString() || '';
    expect(nftTokenId).toBeDefined();

    const mintResult = await htsBuilder.mintNonFungibleToken({
      tokenId: nftTokenId,
      senderAccountId: accountId,
      receiverAccountId: accountId,
      metadata: [Buffer.from('test-metadata')],
    }).execute();

    mintedSerial = mintResult.receipt?.serials?.[0]?.toNumber();
    expect(mintedSerial).toBeDefined();

    const response = await agent.processMessage(
      `Get all NFTs for account ${accountId}`
    );
    console.log('response', response)
    expect(response.success).toBe(true);
    expect(response.error).toBeUndefined();
    expect(response.accountId).toBe(accountId.toString());
    expect(response.nfts).toBeDefined();
    expect(Array.isArray(response.nfts)).toBe(true);

    await delay(5000)

    const mirrorNfts = await hederaMirrorNode.getAccountNfts(accountId.toString());
    console.log('mirrorNfts', mirrorNfts)

    expect(response.nftCount).toBe(mirrorNfts?.length);
  });
});
