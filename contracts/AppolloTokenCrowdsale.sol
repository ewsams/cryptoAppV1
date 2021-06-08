// SPDX-License-Identifier: All Rights Reserved"
pragma solidity ^0.8.0;

import "@openzeppelin//contracts/utils/math/SafeMath.sol";
import "./Crowdsale.sol";

contract AppolloTokenCrowdsale is Crowdsale {

    using SafeMath for uint256;

    constructor(
        // rate in TKNbits
        uint256 rate, 
        address payable wallet,
        IERC20 token)
        Crowdsale(rate, wallet, token){}

    function _preValidatePurchase(address beneficiary, uint256 weiAmount) 
    internal view override(Crowdsale){
        super._preValidatePurchase(beneficiary, weiAmount);
    }

}