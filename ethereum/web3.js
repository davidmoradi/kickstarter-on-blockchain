const { INFURA_RINKEBY_URL } = process.env
import Web3 from 'web3';
let web3;

// We are inside the brower and user is running MetaMask.
if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
  // Hijack MetaMask's web3 provider and replace it
  // with new instace of web3 with version `1.0.0-beta.33`.
  // Why ? Because the version `0.20.3` of web3 provided by MetaMask sucks.
  // And we cant/shouldnt rely on MetaMask not changing their web3 version,
  // so this way no matter what our web3 will always be version `1.0.0-beta.33`
  web3 = new Web3(window.web3.currentProvider);
  window.web3 = web3;
} else {
  // We are on the server *OR* User isnt running MetaMask.
  const provider = new Web3.providers.HttpProvider(INFURA_RINKEBY_URL);

  web3 = new Web3(provider);
}
export default web3;
