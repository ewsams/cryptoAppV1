// SPDX-License-Identifier: All Rights Reserved"
pragma solidity ^0.8.0;

import "@openzeppelin//contracts/utils/math/SafeMath.sol";
import "./Crowdsale.sol";

/**
 * @title CappedCrowdsale
 * @dev Crowdsale with a limit for total contributions.
 */
abstract contract CappedCrowdsale is Crowdsale  {
    using SafeMath for uint256;

    // Track investor contributions
    uint256 public investorMinCap = 20000000000000000; // 0.02 ether
    uint256 public investorHardCap = 50000000000000000000; // 50 ether
    mapping(address => uint256) public contributions;


    uint256 private _cap;

    /**
     * @dev Constructor, takes maximum amount of wei accepted in the crowdsale.
     * @param cap Max amount of wei to be contributed
     */
    constructor (uint256 cap) {
        require(cap > 0, "CappedCrowdsale: cap is 0");
        _cap = cap;
    }

    /**
     * @return the cap of the crowdsale.
     */
    function cap() public view returns (uint256) {
        return _cap;
    }

    /**
     * @dev Checks whether the cap has been reached.
     * @return Whether the cap was reached
     */
    function capReached() public view returns (bool) {
        return weiRaised() >= _cap;
    }

    function investorContributions(address beneficiary, uint256 weiAmount) internal view virtual {
        uint256 _existingContribution = contributions[beneficiary];
        uint256 _newContribution = _existingContribution.add(weiAmount);
        require(_newContribution >= investorMinCap && _newContribution 
        <= investorHardCap, "Ivestor must meet capital requirements");
    }
    /**
     * @dev Extend parent behavior requiring purchase to respect the funding cap.
     * @param beneficiary Token purchaser
     * @param weiAmount Amount of wei contributed
     */
    function _preValidatePurchase(address beneficiary, uint256 weiAmount) internal view virtual override {
        super._preValidatePurchase(beneficiary, weiAmount);
        investorContributions(beneficiary, weiAmount);
        require(weiRaised().add(weiAmount) <= _cap, "CappedCrowdsale: cap exceeded");
    }
}