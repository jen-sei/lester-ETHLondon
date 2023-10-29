// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "./IWormholeRelayer.sol";
import "https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/v3/solidity/contracts/interfaces/hooks/IPostDispatchHook.sol";

contract HyperlaneToWormholeHook is IPostDispatchHook {

    // Values hardcoded for testing as an example. Should be modified in production
    uint256 constant GAS_LIMIT = 250_000;
    uint16 constant TARGET_CHAIN = 14;
    address constant TARGET_ADDRESS = 0x726214809590FF452D6156c5c36bd9BD022CD916;

    IWormholeRelayer public immutable wormholeRelayer;

    Types public hookTypeEnum;

    constructor(address _wormholeRelayer, Types _hookType) {
        wormholeRelayer = IWormholeRelayer(_wormholeRelayer);
        hookTypeEnum = _hookType;
    }

    function hookType() external view override returns (uint8) {
       return uint8(hookTypeEnum);
    }

    function supportsMetadata(bytes calldata metadata)
        external
        view
        override 
        returns (bool) {
        // ToDo
        return true;
    }

    function quoteDispatch(bytes calldata metadata, bytes calldata message) public view override returns (uint256 cost) {
        (uint256 customGasLimit) = abi.decode(metadata, (uint256));
        (cost,) = wormholeRelayer.quoteEVMDeliveryPrice(TARGET_CHAIN, 0, customGasLimit);
        // (cost,) = wormholeRelayer.quoteEVMDeliveryPrice(TARGET_CHAIN, 0, GAS_LIMIT);
    }

    function postDispatch(bytes calldata metadata, bytes calldata message) public payable override {
        uint256 cost = quoteDispatch(metadata, message);
        require(msg.value == cost);
        (uint256 customGasLimit) = abi.decode(metadata, (uint256));
        wormholeRelayer.sendPayloadToEvm{value: cost}(
            TARGET_CHAIN,
            TARGET_ADDRESS,
            abi.encode(message, msg.sender),
            0,
            // GAS_LIMIT
            customGasLimit
        );
    }
}