/* global artifacts contract describe assert it */

const TestDLL = artifacts.require('TestDLL.sol');

contract('DLL', () => {
  describe('Function: contains', () => {
    it('Should return false for 0 node', async () => {
      const proxy = await TestDLL.deployed();

      const contains = await proxy.contains(0);

      assert.strictEqual(contains, false, 'expected contains node 0 to be false');
    });

    it('Should return true for a node which does exist', async () => {
      const proxy = await TestDLL.deployed();

      await proxy.insert(0, 1, 0);
      const contains = await proxy.contains(1);

      assert.strictEqual(contains, true, 'expected contains node 1 to be true');
    });
  });
});

