App = {
  loading: false,
  contracts: {},
  load: async () => {
    await App.loadWeb3();
    await App.loadAccounts();
    await App.loadContracts();
    await App.render();
  },
  loadWeb3: async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      window.ethereum.enable();
      App.web3Provider = window.web3.currentProvider;
    }
  },
  loadAccounts: async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    if (accounts && accounts.length) {
      App.account = accounts[0];
    }
  },
  loadContracts: async () => {
    const todoList = await $.getJSON("TodoList.json");
    try {
      App.contracts.todoList = await TruffleContract(todoList);
      App.contracts.todoList.setProvider(App.web3Provider);
      App.todoList = await App.contracts.todoList.deployed();
    } catch (error) {
      console.log(error);
    }
  },
  render: async () => {
    if (App.loading) {
      return;
    }
    App.setLoading(true);

    $("#account").html(App.account);
    await App.renderTasks();

    App.setLoading(false);
  },
  renderTasks: async () => {
    const taskCount = await App.todoList.taskCount();
    const $taskTemplate = $(".taskTemplate");

    for (let i = 1; i <= taskCount; i++) {
      const task = await App.todoList.tasks(taskCount);

      const $newTaskTemplate = $taskTemplate.clone();
      $newTaskTemplate.find(".content").html(task.description);
      $newTaskTemplate
        .find("input")
        .prop("name", task.id)
        .prop("checked", task.complete);

      if (task.complete) {
        $("#completedTaskList").append($newTaskTemplate);
      } else {
        $("#taskList").append($newTaskTemplate);
      }

      $newTaskTemplate.show();
    }
  },
  setLoading: (loading) => {
    App.loading = loading;
    const loader = $("#loader");
    const content = $("#content");
    if (loading) {
      loader.show();
      content.hide();
    } else {
      loader.hide();
      content.show();
    }
  },
};

$(() => {
  $(window).load(() => {
    App.load();
  });
});
