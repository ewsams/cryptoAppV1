const path = require("path");
require('dotenv').config({ path: './.env' });
const HDWalletProvider = require("@truffle/hdwallet-provider");
const MetaMaskAccountIndex = 0;


module.exports = {
  networks: {
    development: {
      host: "127.0.0.1:7545",
      port: 7545,
      network_id: "5777" // Match any network id
    },
    ganache_local: {
      provider: function () {
        return new HDWalletProvider(process.env.MNEMONIC,
        "http://127.0.0.1:7545",
         MetaMaskAccountIndex)
      },
      network_id: 5777
    },
    ropsten_infura: {
      provider: function () {
        return new HDWalletProvider(process.env.MNEMONIC, "https://ropsten.infura.io/v3/8db2d61eab884182a8ec68cf25fbd343", MetaMaskAccountIndex)
      },
      network_id: 3
    },
    goerli_infura: {
      provider: function () {
        return new HDWalletProvider(process.env.MNEMONIC, "https://goerli.infura.io/v3/8db2d61eab884182a8ec68cf25fbd343", MetaMaskAccountIndex)
      },
      network_id: 5
    }
  },
  compilers: {
    solc: {
      version: "0.8.0"
    }
  }
};
