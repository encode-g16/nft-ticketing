import { ethers } from "ethers";
import * as EventContractFactoryJson from "../artifacts/contracts/EventContractFactory.sol/EventContractFactory.json";
import { EventContractFactory } from "../typechain-types";
import { getWallet, getRopstenProvider } from "../utils";

const fee = ethers.utils.parseEther("0.1");

async function main() {
  const wallet = getWallet();
  const provider = getRopstenProvider();
  const signer = wallet.connect(provider);

  const contractFactory = new ethers.ContractFactory(
    EventContractFactoryJson.abi,
    EventContractFactoryJson.bytecode,
    signer
  );
  const eventCreator = (await contractFactory.deploy(
    fee
  )) as EventContractFactory;
  await eventCreator.deployed();

  console.log(`Contract deployed with address: ${eventCreator.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
