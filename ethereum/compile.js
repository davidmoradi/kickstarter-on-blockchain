const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

// Find build folder
const buildPath = path.resolve(__dirname + '/build');
// remove build folder
fs.removeSync(buildPath);
// Find Campaign contract file
const campaignPath = path.resolve(__dirname + '/contracts', 'Campaign.sol');
// Get the source of the contract
const source = fs.readFileSync(campaignPath, 'utf8');
// Compile the solidity source
const compliedContracts = solc.compile(source, 1).contracts;
// Create a build folder now
fs.ensureDirSync(buildPath);

// We have two contracts Campaign and CampaignFactory.
// So create two diffrent json files and output the json for each contract.
for (let contract in compliedContracts) {
  fs.outputJsonSync(
    path.resolve(buildPath, contract.replace(':', '') + '.json'),
    compliedContracts[contract]
  );
}
