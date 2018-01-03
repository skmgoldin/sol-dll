/* global artifacts contract describe assert it */

const TestDLL = artifacts.require('TestDLL.sol');

contract('DLL', () => {
  describe('Function: contains', () => {
    it('Should return false for 0 node', async () => {
      const proxy = await TestDLL.deployed();

      await proxy.insert(0, 1, 0);
      const contains = await proxy.contains(0);

      assert.strictEqual(contains, false, 'expected contains to be false');
    });
  });
});

