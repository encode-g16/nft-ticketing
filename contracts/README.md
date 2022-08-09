# Contracts

Run the following commands to get setup

1. `yarn`
2. `yarn hardhat compile` - this will produce the contract ABIs
3. Set environment variables for `PRIVATE_KEY` and `ROPSTEN_URL`
4. `yarn hardhat run scripts/deployEventContractFactory.ts` - this will deploy a new event factory contract
5. copy and past the contract address and put into the script of `createEvent`
6. `yarn hardhat run scripts/createEvent.ts` - this will create a new event through the even factory contract.

NOTE: variable can be updated in the scripts.
