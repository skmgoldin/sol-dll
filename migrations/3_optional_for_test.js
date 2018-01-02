/* global artifacts */

const DLL = artifacts.require('./DLL.sol');
const TestDLL = artifacts.require('TestDLL.sol');

module.exports = function (deployer, network) {
  if (network === 'develop' || network === 'test') {
    deployer.link(DLL, TestDLL);

    deployer.deploy(TestDLL);
  }
};
