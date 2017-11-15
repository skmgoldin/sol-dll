/* global artifacts */

const DLL = artifacts.require('./DLL.sol');

module.exports = function (deployer) {
  deployer.deploy(DLL);
};
