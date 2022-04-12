App = {
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
    $("#account").html(App.account);
  },
};

$(() => {
  $(window).load(() => {
    App.load();
  });
});
