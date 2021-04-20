// SPDX-License-Identifier: All Rights Reserved"
pragma solidity ^0.8.3;

import "./Crowdsale.sol";
import "./KycContract.sol";

contract AppolloTokenCrowdsale is Crowdsale {

    KycContract kyc;
    constructor(
        // rate in TKNbits
        uint256 rate, address payable wallet,
        IERC20 token,KycContract _kyc)
        Crowdsale(rate, wallet, token)
    { 
        kyc = _kyc;
        
        }

    function _preValidatePurchase(address beneficiary, uint256 weiAmount) internal view override {
        super._preValidatePurchase(beneficiary, weiAmount);
        require(kyc.kycCompleted(beneficiary), "KYC not completed yet, aborting");
    }

}