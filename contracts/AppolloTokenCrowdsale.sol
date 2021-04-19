// SPDX-License-Identifier: All Rights Reserved"
pragma solidity ^0.8.3;

import "./Crowdsale.sol";

contract AppolloTokenCrowdsale is Crowdsale {

    KycContract kyc;
    constructor(
        uint256 rate,    // rate in TKNbits
        address payable wallet,
        IERC20 token
    )
        Crowdsale(rate, wallet, token)
    {

    }

}