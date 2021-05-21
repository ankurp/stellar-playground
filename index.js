const sdk = require('stellar-sdk');
const fetch = require('node-fetch');
const fs = require('fs');
const {
  Server,
  Keypair,
  Operation,
  Asset,
  TimeoutInfinite,
  Networks,
  BASE_FEE,
  TransactionBuilder
} = sdk;

// function to encode file data to base64 encoded string
function base64Encode(filePath) {
  const bitmap = fs.readFileSync(filePath);
  return new Buffer.from(bitmap).toString('base64');
}

const data = base64Encode(
  './GCEE5H3RI2MFP4UQ4NHFKLGTIHILWA775AM7KTLU5HUBSLOBJN7M4RSL.png'
);

const server = new Server('https://horizon-testnet.stellar.org');
const sourceKey = Keypair.random();

console.log('Public Key: ', sourceKey.publicKey());

(async () => {
  await fetch(`https://friendbot.stellar.org?addr=${sourceKey.publicKey()}`);

  const sourceAccount = await server.loadAccount(sourceKey.publicKey());
  const transactionBuilder = new TransactionBuilder(sourceAccount, {
    fee: BASE_FEE * 100,
    networkPassphrase: Networks.TESTNET
  });

  const chunksOfData = data.split('');

  for (let j = 0; chunksOfData.length > 0; j++) {
    transactionBuilder.addOperation(
      Operation.manageData({
        name: ('00' + j).slice(-2) + chunksOfData.splice(0, 62).join(''),
        value: chunksOfData.splice(0, 64).join('')
      })
    );
  }

  const transaction = transactionBuilder.setTimeout(TimeoutInfinite).build();
  transaction.sign(sourceKey);

  try {
    const result = await server.submitTransaction(transaction);
    console.log('Success! Results:', result);
  } catch (e) {
    console.error('ERROR: ', e);
  }
})();
