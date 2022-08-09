import { BigNumber, ethers } from "ethers";
import * as EventContractFactoryJson from "../artifacts/contracts/EventContractFactory.sol/EventContractFactory.json";
import { EventContractFactory } from "../typechain-types";
import { getWallet, getRopstenProvider } from "../utils";

const eventFactoryAddress = "0xc5a63195951Fa3c2c9870edF5C5808C04c1DeD4d";
const eventName = "GopherCon";
const location = "London";
const date = new Date(2023, 1, 1, 0, 0, 0, 0);
const numberOfTickets = 1000;
const ticketPrice = ethers.utils.parseEther("0.5");

async function main() {
  const wallet = getWallet();
  const provider = getRopstenProvider();
  const signer = wallet.connect(provider);

  const eventCreatorContract = new ethers.Contract(
    eventFactoryAddress,
    EventContractFactoryJson.abi,
    signer
  ) as EventContractFactory;

  const tx = await eventCreatorContract.createEvent(
    eventName,
    location,
    date.getTime(),
    numberOfTickets,
    ticketPrice
  );
  await tx.wait();
  console.log(`event created with transaction hash ${tx.hash}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
