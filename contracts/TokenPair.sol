// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {ITokenPair} from "./interfaces/ITokenPair.sol";

contract TokenPair is ITokenPair, ERC20 {}
