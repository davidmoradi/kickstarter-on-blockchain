const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compliedFactory = require('./build/CampaignFactory.json');
const { INFURA_RINKEBY_URL } = process.env

const providerURL = INFURA_RINKEBY_URL; // replace with your Rinkeby test network URL
const mnemonic = "in crypto we trust ..."; // replace with your 12 word wallet mnemonic.

const provider = new HDWalletProvider(mnemonic, providerURL);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Deploying from account', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(compliedFactory.interface))
    .deploy({ data: compliedFactory.bytecode })
    .send({ gas: '1000000', from: accounts[0] });

  console.log('contract deployed to', result.options.address);
}

deploy();
