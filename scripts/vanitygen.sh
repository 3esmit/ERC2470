#! /bin/bash
START=90000000
BATCHSIZE=${1-256}
BATCHSIZE_ITER=$((${BATCHSIZE} - 1))
ITERATIONS=${2-999999999}

rm -rf tmp
mkdir tmp
for i in `seq 0 ${BATCHSIZE_ITER}`; do
    mkdir -p "./tmp/${i}/contracts"
    cp contracts/SingletonFactory.sol "./tmp/${i}/contracts/"
done

for OFFSET in `seq 0 $BATCHSIZE $ITERATIONS`; do
    for VALUE in `seq 0 ${BATCHSIZE_ITER}`; do
        IV=$((${START} + ${OFFSET} + ${VALUE}))
        sed -i -Ee "s/^\/\/ IV:.+$/\/\/ IV: $((${IV}))/1" "tmp/${VALUE}/contracts/SingletonFactory.sol"
        pushd "./tmp/${VALUE}" > /dev/null
        solc --overwrite --optimize --optimize-runs 200 --metadata-literal --output-dir ./artifacts \ 
            --combined-json abi,asm,bin,devdoc,hashes,metadata,opcodes,srcmap,userdoc ./contracts/SingletonFactory.sol >/dev/null &
        popd > /dev/null
    done
    wait

    node scripts/vanitygen-info.js "${OFFSET}" "${BATCHSIZE}" "${START}" | tee -a addrs.txt
done
