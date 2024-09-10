const ethTx = require('ethereumjs-tx');
const ethUtils = require('ethereumjs-util');
const rawTransaction = require('../js/rawTransaction');

const offset = parseInt(process.argv[2]);
const batchsize = parseInt(process.argv[3]);
const start = parseInt(process.argv[4]);

for (let i = 0; i < batchsize; i++) {
  const code = ('0x' +
    require(`../tmp/${i}/artifacts/combined.json`).contracts['./contracts/ERC2470.sol:ERC2470'].bin);
  const tx = new ethTx({...rawTransaction, data: code});
  const contractAddr = ethUtils.toChecksumAddress(
    ethUtils.generateAddress(tx.getSenderAddress(), ethUtils.toBuffer(0)).toString('hex')
  );
  const count = ethUtils.toBuffer(contractAddr).reduce((count, byte) => (byte==0) ? count+1:count,0);
  if (contractAddr.startsWith('0x2470') || count > 4) {
    console.log(`${start + offset + i} => ${contractAddr} (${count})`);
  }

}