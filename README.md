# Ethereum IPFS Solidity Web3.js ReactJS

* Fully decentralized Application published on IPFS

## Interaction with the Smart Contract

![Interaction with Smart Contract](https://user-images.githubusercontent.com/29623199/121769335-4c76ff80-cb63-11eb-91fa-26f0f05f32ef.JPG)

* Create, compile, deploy and add a Smart Contract to a Blockchain
* Interaction with Smart Contract:

1) Connect with a Blockchain via Web3
1) Run a decentralized Application (dApp) and upload a Video
1) Publish a Video through InterPlanetary File System (IPFS)
1) Get Hash from published Video
1) Adding the Video Hash to a Smart Contract through a Transaction
1) User of Smart Contract improve the Transaction
1) Adding the Video Hash and User Address to the Smart Contract

## Commands

| Command | Description |
| --- | --- |
| Truffle | |
| truffle migrate | Running the Migrate Script and deploy the Smart Contract to the Blockchain |
| truffle migrate | Running the Migrate Script and deploy a new Smart Contract to the Blockchain |
| truffle console | Running a JavaScript Runtime Environment that can interact with the Blockchain |
| truffle test | Running Test to check the Smart Contract |
| truffle networks | Listing all Addresses of deployed Smart Contract |
| Truffle Console | |
| dVideo = await DVideo.deployed() | Getting the deployed Smart Contract as JavaScript Version |
| dVideo | Printing out the deployed Smart Contract as JavaScript Version |
| name = await dVideo.name() | Getting the public State Variable 'name' from the deployed Smart Contract |
| name | Printing out the public State Variable |

## Dependencies

* Node.js: It allows to install all Dependencies and run the Client-side Application
* Truffle Framework: A Framework for Creating Ethereum Smart Contracts. It allows creating, testing and deploying Smart
  Contracts on a Blockchain
* Ganache: It provides a locally Blockchain for Testing Purpose
* MetaMask: A Browser Extension to connect with the Blockchain. It contains the Wallet for Ethereum
* Web3.js Connect the Browser with MetaMask Extension to the Blockchain based Website

### Update Dependencies (Node.js Modules)

* npm install -g npm-check-updates: Installing the Node.js-Check-Updates Module
* ncu –u: This will update the package.json File as the latest Versions available in npm Repositories on Web
* npm install: This will update the local node_modules Repository with the Versions present in package.json
* npm install --package-lock-only: This will update the Versions present in package-lock.json

## Solidity
### Events
* Events causes the Arguments to be stored in the Log of the Transaction
* The Log of the Transaction exists as long as the Block in the Blockchain exists (in Theory forever)
* Evetns log Changes into the Blockchain and make it true forever

### Address
* Every Account and Smart Contract has an Address
* It is used to send and receive Ether from one Account to another

### Mapping
* Data Type used to store Associations that allow to get a Value for a corresponding Key

### Require
* Convenience Function that guarantees Vailidity of Conditions that cannot be detected before Execution

### Struct
* Struct Types are used to represent a Record and allow to create own Data Types

### Enum
* Enums restrict a Variable to have on of predefined Values
