/* global artifacts contract describe assert it */

const TestDLL = artifacts.require('TestDLL.sol');
const utils = require('./utils.js');

contract('DLL', () => {
  describe('Function: insert', () => {
    it('Should not allow inserting 0 node', async () => {
      const proxy = await TestDLL.deployed();

      try {
        await proxy.insert(0, 0, 0);
        assert(false, 'Inserted 0 node');
      } catch (err) {
        assert(utils.isEVMException(err), err.toString());
      }
    });

    it('Should not allow inserting a node with invalid next node', async () => {
      const proxy = await TestDLL.deployed();

      try {
        await proxy.insert(0, 0, 1);
        assert(false, 'Inserted a node with invalid next node');
      } catch (err) {
        assert(utils.isEVMException(err), err.toString());
      }
    });

    it('Should not allow inserting a node with non-existent prev node', async () => {
      const proxy = await TestDLL.deployed();

      try {
        await proxy.insert(5, 6, 0);
        assert(false, 'Inserted a node with non-existent prev node');
      } catch (err) {
        assert(utils.isEVMException(err), err.toString());
      }
    });

    it('Should change the position when inserting an existing node', async () => {
      const proxy = await TestDLL.deployed();

      await proxy.insert(0, 1, 0);
      await proxy.insert(1, 2, 0);
      await proxy.insert(2, 1, 0);

      const start = await proxy.getStart();
      const end = await proxy.getEnd();
      assert.strictEqual(start.toString(10), '2', 'expected start to be 2');
      assert.strictEqual(end.toString(10), '1', 'expected end to be 1');
    });
  });
});

