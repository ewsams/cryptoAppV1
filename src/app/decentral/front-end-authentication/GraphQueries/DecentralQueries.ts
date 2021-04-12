import { gql } from 'apollo-angular-boost';
/* This file consist of variables
for constructing Queries
*/

export const SAMPLEQUERY = gql`
  {
    counts(first: 5) {
      id
      orderTotal
      orderParcel
      orderEstate
    }
    orders(first: 5) {
      id
      category
      nft {
        id
      }
      nftAddress
    }
  }
`;

export const LANDQUERY = gql`
  {
    parcels {
      owner {
        id
        address
        mana
      }
      nft {
        tokenURI
        name
        image
        createdAt
      }
    }
  }
`;

export const WEARABLESQUERY = gql`
  {
    wearables {
      id
      name
      category
      rarity
      collection
      nft {
        image
      }
      owner {
        address
      }
    }
  }
`;
