const deployment = require('./js/deployment');
const ERC2470 = require('./js/artifacts')().contracts.ERC2470.ERC2470;
const { contractAddr } = deployment.generateDeployTx();

module.exports = {
  deploy: deployment.deploy,
  generateDeployTx: deployment.generateDeployTx,
  ERC2470: (web3, options = {}) => ERC2470.instance(web3, contractAddr, options)
};
