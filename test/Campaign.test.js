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
});

describe('Campaign', () => {
  it('it deployes Campaign and CampaignFactory contracts', () => {
    assert.ok(factory.options.address);
    assert.ok(campaign.options.address);
  });

  it('marks caller as the campaign manager', async () => {
    manager = await campaign.methods.manager().call();

    assert.ok(accounts[0], manager);
  });

  it('allows people to contribute money and marks them as contributer', async () => {
    await campaign.methods.contribute().send({
      from: accounts[1],
      value: '200'
    });

    const isContributor = await campaign.methods.contributers(accounts[1]).call();

    assert(isContributor);
  });

  it('requires a minimum contribution', async () => {
    try {
      await campaign.methods.contribute().send({
        from: accounts[1],
        value: '10'
      });
      assert(false);
    } catch (error) {
      assert(error)
    }
  });

  it('allow manager to create a payment request', async () => {
    await campaign.methods
      .createRequest('Buy Batteries', '100', accounts[1])
      .send({ from: accounts[0], gas: '1000000'})

    request = await campaign.methods.requests(0).call();

    assert.equal('Buy Batteries', request.description);
  });
});
