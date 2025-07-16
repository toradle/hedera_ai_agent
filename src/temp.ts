import { Client, PrivateKey, AccountId } from '@hashgraph/sdk';

const client = Client.forTestnet();

const MY_ACCOUNT_ID = AccountId.fromString('0.0.5392887');
const MY_PRIVATE_KEY = PrivateKey.fromStringED25519(
  '302e020100300506032b657004220420980b0bb93c59a4a8baab562be1a096fce5e14514c85bfa26dfce271bbbe23e35',
);

client.setOperator(MY_ACCOUNT_ID, MY_PRIVATE_KEY);
console.log(`====client created====`);
