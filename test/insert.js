/* global artifacts contract describe assert it */

const TestDLL = artifacts.require('TestDLL.sol');
const utils = require('./utils.js');

contract('DLL', () => {
  describe('Function: insert', () => {
    it('Should not allow inserting 0 node', async () => {
      const proxy = await TestDLL.deployed();

      try {
        await proxy.insert(0, 0, 0);
      } catch (err) {
        assert(utils.isEVMException(err), err.toString());

        return;
      }

      assert(false, 'Inserted 0 node');
    });

    it('Should not allow inserting a node with non-existent prev node', async () => {
      const proxy = await TestDLL.deployed();

      try {
        await proxy.insert(4, 5, 0);
      } catch (err) {
        assert(utils.isEVMException(err), err.toString());

        return;
      }

      assert(false, 'Inserted a node with non-existent prev node');
    });

    it('Should not allow inserting a node with non-existent next node', async () => {
      const proxy = await TestDLL.deployed();

      try {
        await proxy.insert(0, 5, 6);
      } catch (err) {
        assert(utils.isEVMException(err), err.toString());

        return;
      }

      assert(false, 'Inserted a node with non-existent next node');
    });

    it('Should not allow inserting a node with invalid next node', async () => {
      const proxy = await TestDLL.deployed();

      await proxy.insert(0, 5, 0); // 0->5->0
      await proxy.insert(5, 10, 0); // 0->5->10->0

      try {
        await proxy.insert(0, 3, 10);
      } catch (err) {
        assert(utils.isEVMException(err), err.toString());

        return;
      }

      assert(false, 'Inserted a node with invalid next node');
    });

    it('Should not allow inserting a node with invalid prev node', async () => {
      const proxy = await TestDLL.deployed();

      try {
        await proxy.insert(0, 7, 10);
      } catch (err) {
        assert(utils.isEVMException(err), err.toString());

        return;
      }

      assert(false, 'Inserted a node with invalid prev node');
    });

    it('Should change the position when inserting an existing node', async () => {
      const proxy = await TestDLL.deployed();

      // The list is currently 0->5->10->0
      await proxy.insert(10, 5, 0); // 0->10->5->0

      const start = await proxy.getStart();
      const end = await proxy.getEnd();
      assert.strictEqual(start.toString(10), '10', 'expected start to be 10');
      assert.strictEqual(end.toString(10), '5', 'expected end to be 5');
    });

    it(
      'Should not allow the last node to be reinserted with itself as the previous node',
      async () => {
        const proxy = await TestDLL.deployed();

        try {
          // The list is currently 0->10->5->0
          await proxy.insert(5, 5, 0);
        } catch (err) {
          assert(utils.isEVMException(err), err.toString());

          // Accountability checks
          const start = await proxy.getStart();
          const end = await proxy.getEnd();
          assert.strictEqual(start.toString(10), '10', 'expected start to be 10');
          assert.strictEqual(end.toString(10), '5', 'expected end to be 5');

          return;
        }

        assert(false, 'The last node was re-inserted with itself as the previous node');
      },
    );
  });
});

