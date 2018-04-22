import web3 from './web3.js';
import campaignFactory from './build/CampaignFactory.json';

const campaignFactoryIntace = new web3.eth.Contract(
  JSON.parse(campaignFactory.interface),
  '0x6aF5836Ec2dDcd479Ed84839c3CF8D32A9217a11' // TODO: Make this an Enviroment Variable.
);

export default campaignFactoryIntace;
