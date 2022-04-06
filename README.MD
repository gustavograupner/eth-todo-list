This project is my first project using Ethereum Smart Contracts with Solidity;

I've based my studies on this [tutorial](https://www.youtube.com/watch?v=coQ5dg8wM2o&list=PLQLTU9dUD38qBl5AZeGl9ufwPyxgRK974&index=3&t=683s) from **freeCodeCamp.org**

## Notes from a beginner:
- To compile a contract use the command: `truffle compile` this will generate a build folder with the contract compiled in a json file;
- Before deploy a contract you must config the **truffle-config.js** file. This file is where you config the connection with the blockchain;
- Create a migration file (Note: start this file's name with a sequential number. With that Truffle will execute these sequentially)
- To deploy a contract to the blockchain using the command: **truffle migrate**
- Access the Truffle Console: **truffle console**
- Retrieve a contract from a blockchain:
- 1. Access the truffle console: 
- 2. Type in the console `todoList = TodoList.deployed() // TodoList was declared on the migration file.`
