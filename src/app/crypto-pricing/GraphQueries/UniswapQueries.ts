import { gql } from 'apollo-angular-boost';
/* This file consist of variables
for constructing Queries
*/

export const TABLEPRICINGQUERY = gql`
{
  tokens {
    id
    symbol
    name
    totalSupply
    tradeVolume
    tradeVolumeUSD
    totalLiquidity
  }
}
`;

