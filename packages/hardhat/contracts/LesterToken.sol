// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract LesterToken is ERC20 {
    constructor() ERC20("DAI", "DAI") {
        _mint(msg.sender, 9990000000000000000000000);
    }
}