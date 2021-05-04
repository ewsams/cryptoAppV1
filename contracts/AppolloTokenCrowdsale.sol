// SPDX-License-Identifier: All Rights Reserved"
pragma solidity ^0.8.0;

import "@openzeppelin//contracts/utils/math/SafeMath.sol";
import "./CappedCrowdsale.sol";
import "./TimedCrowdsale.sol";
import "./WhitelistedCrowdsale.sol";
import "./Crowdsale.sol";
import "./KycContract.sol";

contract AppolloTokenCrowdsale is Crowdsale, CappedCrowdsale, TimedCrowdsale {

    using SafeMath for uint256;

    constructor(
        // rate in TKNbits
        uint256 rate, 
        address payable wallet,
        IERC20 token, 
        uint cap,
        uint256 openingTime,
        uint256 closingTime)
        Crowdsale(rate, wallet, token)
        CappedCrowdsale(cap)
        TimedCrowdsale( openingTime,closingTime){}

    function _preValidatePurchase(address beneficiary, uint256 weiAmount) 
    internal view override(Crowdsale, CappedCrowdsale,TimedCrowdsale){
        super._preValidatePurchase(beneficiary, weiAmount);
    }

}