const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const compliedFactory = require('../ethereum/build/CampaignFactory.json');
const compliedCampaign = require('../ethereum/build/Campaign.json');

let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  factory = await new web3.eth.Contract(JSON.parse(compliedFactory.interface))
    .deploy({ data: compliedFactory.bytecode })
    .send({ from: accounts[0], gas: '1000000'});

  await factory.methods.createCampaign('100').send({
    from: accounts[0], gas: '1000000'
  });

  [campaignAddress] = await factory.methods.getDeployedCampaigns().call()

  campaign = await new web3.eth.Contract(JSON.parse(compliedCampaign.interface), campaignAddress);

  console.log(campaign);

});

describe('Crypto', () => {
  it('Kitties', () => {
    assert.ok(campaignAddress);
  });
});
