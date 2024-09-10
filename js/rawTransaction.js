const contracts = require('./artifacts')().contracts;

const rawTransaction = {
  nonce: 0,
  gasPrice: 100000000000,
  value: 0,
  data: '0x' + contracts.ERC2470.ERC2470.bin,
  gasLimit: 270000,
  v: 27,
  r: '0x247000',
  s: '0x2470'
};

module.exports = rawTransaction;
