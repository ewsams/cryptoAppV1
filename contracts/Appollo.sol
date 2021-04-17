// SPDX-License-Identifier: All Rights Reserved"
pragma solidity ^0.8.3;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * @title AppolloToken
 * @dev Very Appollo ERC20 Token example, where all tokens are pre-assigned to the creator.
 * Note they can later distribute these tokens as they wish using `transfer` and other
 * `ERC20` functions.
 */
contract AppolloToken is ERC20 {

    /**
     * @dev Constructor that gives msg.sender all of existing tokens.
     */
    constructor (uint256 initialSupply) ERC20("Appollo Token", "APP") {
        _mint(msg.sender, initialSupply);
    }
}