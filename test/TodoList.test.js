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

  it("creates tasks", async () => {
    const result = await this.todoList.createTask("A new task");
    const taskCount = await this.todoList.taskCount();
    const { args } = result.logs[0];
    assert.equal(taskCount.toNumber(), 2);
    assert.equal(args.id, 2);
    assert.equal(args.description, "A new task");
    assert.equal(args.complete, false);
  });

  it("toggles task completion", async () => {
    const result = await this.todoList.toggleCompleted(1);
    const task = await this.todoList.tasks(1);
    const { args } = result.logs[0];
    assert.equal(task.id.toNumber(), 1);
    assert.equal(task.complete, true);
    assert.equal(args.id.toNumber(), 1);
    assert.equal(args.complete, true);
  });
});
