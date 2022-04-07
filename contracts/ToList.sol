pragma solidity >=0.4.22 <0.9.0;

contract TodoList {
    uint256 public taskCount = 0;

    struct Task {
        uint256 id;
        string description;
        bool complete;
    }

    mapping(uint256 => Task) public tasks;

    constructor() public {
        createTask("Check if it works");
    }

    function createTask(string memory _description) public {
        taskCount++;
        tasks[taskCount] = Task(taskCount, _description, false);
    }
}
