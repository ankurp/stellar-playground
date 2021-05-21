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
async function base64Encode(url) {
  const bitmap = await fetch(url);
  return new Buffer.from(bitmap).toString('base64');
}

const data = base64Encode('');

// const server = new Server('https://horizon-testnet.stellar.org');
// const sourceKey = Keypair.fromSecret(
//   'SBELXHH4YQRLYPCETDMRGTHJGOGTJHDZRCLJM34OT3J23DERVQW542FZ'
// );

// await fetch(`https://friendbot.stellar.org?addr=${sourceKey.publicKey()}`);

// const sourceAccount = await server.loadAccount(sourceKey.publicKey());
// const transactionBuilder = new TransactionBuilder(sourceAccount, {
//   fee: BASE_FEE * 100,
//   networkPassphrase: Networks.TESTNET
// });

// const chunksOfData = data.split('');

// for (let j = 0; chunksOfData.length > 0; j++) {
//   transactionBuilder.addOperation(
//     Operation.manageData({
//       name: ('00' + j).slice(-2) + chunksOfData.splice(0, 62).join(''),
//       value: chunksOfData.splice(0, 64).join('')
//     })
//   );
// }

// const transaction = transactionBuilder.setTimeout(TimeoutInfinite).build();
// transaction.sign(sourceKey);

// try {
//   const result = await server.submitTransaction(transaction);
//   console.log('Success! Results:', result);
// } catch (e) {
//   console.error('ERROR: ', e);
// }
