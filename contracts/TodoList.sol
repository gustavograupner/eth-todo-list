pragma solidity >=0.4.22 <0.9.0;

contract TodoList {
    uint256 public taskCount = 0;

    struct Task {
        uint256 id;
        string description;
        bool complete;
    }

    event TaskCreated(uint256 id, string description, bool complete);

    event TaskComplete(uint256 id, bool complete);

    mapping(uint256 => Task) public tasks;

    constructor() public {
        createTask("Check if it works");
    }

    function createTask(string memory _description) public {
        taskCount++;
        tasks[taskCount] = Task(taskCount, _description, false);
        emit TaskCreated(taskCount, _description, false);
    }

    function toggleCompleted(uint256 _id) public {
        Task memory _task = tasks[_id];
        _task.complete = !_task.complete;
        tasks[_id] = _task;
        emit TaskComplete(_id, _task.complete);
    }
}
