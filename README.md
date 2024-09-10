# ERC2470 Singleton Factory Contract

## Proposal
The official proposal can be found at: [eips.ethereum.org/EIPS/eip-2470][ERC2470].

## ERC2470 Factory

This repository contains the official implementation of the [ERC2470 factory] as defined in the [standard][ERC2470].

The address of the factory on **all chains** is:

<h4><pre>TBD</pre></h4>

### Vanity Generator for ERC2470 Singletons

Run the following to generate a few vanity "0x1234" addresses of "SingletonExample.sol":

``` shell
npm run build
node ./scripts/vanitygen-erc2470.js "0x1234"
```

The script simply try salts for the bytecode of that example.

## Compilation & Verification

> :warning: The `solc` compiler version `0.7.3+commit.9bfce1f6` must be present on the build machine. ([More info on installing solc][solc-install].)

The factory can be compiled from the source code using:

``` shell
npm run build
```

This will write the json artifacts for the factory in the `artifacts` folder and the standard output in the `build` folder.

### Verification

The address of the account creating the factory, the address of the factory and the raw signed transaction can be generated with:

``` shell
$ npm run info
> node js/info.js

RawTx:  TBD
Sender:  TBD
Contract: TBD
```

Those values can be compared with the values in the [ERC2470 standard][ERC2470].

### Metadata

The metadata---for the factory only---can be extrated using:

``` shell
node scripts/extract_metadata.js
```

This metadata can also be compared with the formated version in the [ERC2470 standard][ERC2470].

### Vanity address

The vanity address of the factory---starting with `0x2470`---has been generated using the [`scripts/vanitygen.sh`] and [`scripts/vanitygen-info.js`] scripts.

## Authors
 - Ricardo Guilherme Schmidt [@3esmit][3esmit]
 - Jordi Baylina [@jbaylina][jbaylina]
 - Jacques Dafflon [@0xjac][0xjac]

## License

> The [ERC2470 factory] is part of the [ERC2470 standard][ERC2470] and is therefore in the public domain via [CC0].

The authors waive all copyright and related or neighboring rights for the rest of this repository's content via [CC0]. A copy of the [CC0] waiver is included in the [LICENSE] file.

[ERC820]: https://eips.ethereum.org/EIPS/eip-820
[ERC2470]: https://eips.ethereum.org/EIPS/eip-2470
[ERC2470 factory]: https://github.com/3esmit/ERC2470/blob/master/contracts/ERC2470.sol
[`scripts/vanitygen.sh`]: https://github.com/3esmit/erc2470/blob/master/scripts/vanitygen.sh
[`scripts/vanitygen-info.js`]: https://github.com/3esmit/erc2470/blob/master/scripts/vanitygen-info.js
[3esmit]: https://github.com/3esmit
[jbaylina]: https://github.com/jbaylina
[0xjac]: https://github.com/0xjac
[CC0]: http://creativecommons.org/publicdomain/zero/1.0/
[LICENSE]: https://github.com/3esmit/erc2470/blob/master/LICENSE
[solc-install]: https://solidity.readthedocs.io/en/v0.5.11/installing-solidity.html