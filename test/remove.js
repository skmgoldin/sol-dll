/* global artifacts contract describe assert it */

const TestDLL = artifacts.require('TestDLL.sol');

contract('DLL', () => {
  describe('Function: remove', () => {
    it('Should ignore removing non-existent node', async () => {
      const proxy = await TestDLL.deployed();

      await proxy.insert(0, 1, 0);
      await proxy.remove(2);

      const start = await proxy.getStart();
      const end = await proxy.getEnd();
      assert.strictEqual(start.toString(10), '1', 'expected start to be 1');
      assert.strictEqual(end.toString(10), '1', 'expected end to be 1');
    });
  });
});

