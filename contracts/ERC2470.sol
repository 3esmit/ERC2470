// SPDX-License-Identifier: CC0-1.0
pragma solidity 0.7.3;


/**
 * @title ERC-2470: Singleton Factory
 * @notice Exposes CREATE2 (EIP-1014) to deploy bytecode on deterministic addresses based on initialization code and salt.
 * @author Ricardo Guilherme Schmidt <ricardo3@status.im>
 * @author Richard Meissner <richard@gnosis.io>
 */
contract ERC2470 {

    /**
     * @notice Fallback forwards `msg.data` with salt `bytes32(0)` to `deploy(bytes,bytes32)`.
     * @dev Returns address of created contract even for fallback
     */
    fallback() external payable {
        require(msg.data.length > 0, "ERC2470: bad call");
        address payable createdContract = deploy(msg.data, bytes32(0));
        assembly {
            mstore(0, createdContract)
            return(0, 32)
        }
    }

    /**
     * @notice Deploys `_initCode` using `_salt` for defining the deterministic address.
     * @param _initCode Initialization code.
     * @param _salt Arbitrary value to modify resulting address.
     * @return createdContract Created contract address.
     */
    function deploy(bytes memory _initCode, bytes32 _salt)
        public
        payable
        returns (address payable createdContract)
    {
        assembly {
            createdContract := create2(callvalue(), add(_initCode, 0x20), mload(_initCode), _salt)
        }
        require(createdContract != address(0), "ERC2470: CREATE2 failed");
    }

    /**
     * @notice Calculates the resulting address of a contract created in this factory.
     * @param _initCode Initialization code.
     * @param _salt Arbitrary value to modify resulting address.
     * @return resultAddress predicted address.
     */
    function predictedAddress(
        bytes memory _initCode,
        bytes32 _salt
    ) 
        external 
        view 
        returns(address payable resultAddress) 
    {
        return address(uint256(keccak256(abi.encodePacked(
            byte(0xff),
            address(this),
            _salt,
            keccak256(_initCode)
        ))));
    }
}
// IV is a value changed to generate the vanity address.
// IV: TBD