const ethUtils = require('ethereumjs-util');

const argLen = process.argv.length;
const startingBytes = (argLen > 2) ? process.argv[2] : "0x0000";
const startSalt = (argLen > 3) ? parseInt(process.argv[3]) : 0
const lookFor = (argLen > 4) ? parseInt(process.argv[4]) : 10;
const artifactFile = (argLen > 5) ? process.argv[5] : "./artifact.json" ;
const encodedConstructorParams = (argLen > 6) ? process.argv[6] : "" ;

const prefix = Buffer.from('ff', 'hex');
const factoryAddress =  ethUtils.toBuffer("0xce0042B868300000d44A59004Da54A005ffdcf9f");
const bytecodeString = require(artifactFile).bytecode
const bytecode = ethUtils.toBuffer(bytecodeString);
const initCode = Buffer.concat([bytecode, ethUtils.toBuffer(encodedConstructorParams)]);
const initCodeHash = ethUtils.keccak256(initCode);

console.log(`SingletonFactory: ${factoryAddress.toString('hex')} `)
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
