// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

import "hardhat/console.sol";

contract SimpleDeFiToken is ERC20 {
    constructor() ERC20("Simple DeFi Token", "SDFT") {
        _mint(msg.sender, 10e24);
    }

    function transferWithAutoBurn(address to, uint256 amount) public {
        require(balanceOf(msg.sender) >= amount, "Not enough tokens");
        uint256 burnAmount = amount / 10;
        console.log(
            "Burning %s from %s, balance is %s",
            burnAmount,
            to,
            balanceOf(to)
        );

        _burn(msg.sender, burnAmount);
        transfer(to, amount - burnAmount);
    }
}
