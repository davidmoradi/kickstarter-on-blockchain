import web3 from './web3.js';
import campaignFactory from './build/CampaignFactory.json';

const campaignFactoryIntace = new web3.eth.Contract(
  JSON.parse(campaignFactory.interface),
  '0xeE2fad724a885DC52Bf9a06c5275b596350840Ef' // TODO: Make this an Enviroment Variable.
);

export default campaignFactoryIntace;
