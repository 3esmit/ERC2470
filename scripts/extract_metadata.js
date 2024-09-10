const artifacts = require('../js/artifacts')();
const metadata = JSON.parse(artifacts.contracts.ERC2470.ERC2470.metadata);

console.log(JSON.stringify(metadata, null, 2));
