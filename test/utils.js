/* eslint-env mocha */

const utils = {
  isEVMException: err => (
    utils.isInvalidOpcode(err) || utils.isRevert(err)
  ),
  isInvalidOpcode: err => (
    err.toString().includes('invalid opcode')
  ),
  isRevert: err => (
    err.toString().includes('revert')
  ),
};

module.exports = utils;
