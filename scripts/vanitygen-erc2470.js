const ethUtils = require('ethereumjs-util');

const argLen = process.argv.length;
const startingBytes = (argLen > 2) ? process.argv[2] : "0x0000";
const startSalt = (argLen > 3) ? parseInt(process.argv[3]) : 0
const lookFor = (argLen > 4) ? parseInt(process.argv[4]) : 10;

const prefix = Buffer.from('ff', 'hex');
const factoryAddress =  ethUtils.toBuffer("0xce0042B868300000d44A59004Da54A005ffdcf9f");
const bytecode = ethUtils.toBuffer('0x' + require(`../artifacts/combined.json`).contracts['./contracts/SingletonExample.sol:SingletonExample'].bin);
const _owner = "0xfB6916095ca1df60bB79Ce92cE3Ea74c37c5d359";
const initCode = Buffer.concat([bytecode, ethUtils.setLengthLeft(_owner, 32)]);
const initCodeHash = ethUtils.keccak256(initCode);

console.log(`ERC2470: ${factoryAddress.toString('hex')} `)
console.log(`initCode: 0x${initCode.toString('hex')}`);
console.log(`# Searching ${lookFor} salt wich creates address starting with ${startingBytes}`);
console.log('| SALT                                                               | RESULTING ADDRESS                          |');
console.log('| ------------------------------------------------------------------ | ------------------------------------------ |');

let index = startSalt;
let found = 0;
while(found < lookFor){
    index++;
    const salt = ethUtils.setLengthLeft(index, 32);
    const address = ethUtils.toChecksumAddress((ethUtils.keccak256(Buffer.concat([prefix, factoryAddress, salt, initCodeHash]))).slice(-20).toString('hex'));
    if(address.toLowerCase().startsWith("0x"+startingBytes.replace("0x","").toLowerCase())){
        found++;
        console.log("| 0x" + salt.toString('hex') + " | " + address + " |");
    }   
}

console.log(`Searched up to index ${index}.`)