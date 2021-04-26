// SPDX-License-Identifier: All Rights Reserved"
pragma solidity ^0.8.0;

import "./crowd-sale/CappedCorwdsale.sol"
import "./crowd-sale/TimedCrowdsale.sol"
import "./crowd-sale/Crowdsale.sol";
import "./KycContract.sol";

contract AppolloTokenCrowdsale is Crowdsale, CappedCrowdsale, TimedCrowdsale {


      // Track investor contributions
    uint256 public investorMinCap = 2000000000000000; // 0.002 ether
    uint256 public investorHardCap = 50000000000000000000; // 50 ether
    mapping(address => uint256) public contributions;

    KycContract kyc;
    constructor(
        // rate in TKNbits
        uint256 rate, 
        address payable wallet,
        IERC20 token, 
        uint cap,
        uint256 openingTime,
        uint256 closingTime,
        KycContract _kyc)
        Crowdsale(rate, wallet, token)
        CappedCrowdsale(cap)
        TimedCrowdsale( openingTime,closingTime)
    { 
        kyc = _kyc;
        
        }

    function _preValidatePurchase(address beneficiary, uint256 weiAmount) internal view override {
        super._preValidatePurchase(beneficiary, weiAmount);
        uint256 _existingContribution = contributions[beneficiary];
        uint256 _newContribution = _existingContribution.add(_weiAmount);
        require(_newContribution >= investorMinCap && _newContribution <= investorHardCap);
        contributions[beneficiary] = _newContribution;
        require(kyc.kycCompleted(beneficiary), "KYC not completed yet, aborting");
    }

}