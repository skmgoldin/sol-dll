/* global artifacts contract describe assert it */

const TestDLL = artifacts.require('TestDLL.sol');

contract('DLL', () => {
  describe('Function: exists', () => {
    it('Should return false for 0 node', async () => {
      const proxy = await TestDLL.deployed();

      await proxy.insert(0, 1, 0);
      const exists = await proxy.exists(0);

      assert.strictEqual(exists, false, 'expected exists to be false');
    });
  });
});

