const TodoList = artifacts.require("./contracts/TodoList.sol");

contract("TodoList", (accounts) => {
  before(async () => {
    this.todoList = await TodoList.deployed();
  });

  it("deploy successfully", async () => {
    const address = await this.todoList.address;
    assert.notEqual(address, "0x0");
    assert.notEqual(address, "");
    assert.notEqual(address, null);
    assert.notEqual(address, undefined);
  });

  it("list tasks", async () => {
    const taskCount = await this.todoList.taskCount();
    const task = await this.todoList.tasks(taskCount);
    assert.equal(taskCount, 1);
    assert.equal(task.id.toNumber(), taskCount.toNumber());
    assert.equal(task.description, "Check if it works");
    assert.equal(task.complete, false);
  });
});
