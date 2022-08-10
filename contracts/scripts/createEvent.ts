import { BigNumber, ethers } from "ethers";
import * as EventContractFactoryJson from "../artifacts/contracts/EventContractFactory.sol/EventContractFactory.json";
import { EventContractFactory } from "../typechain-types";
import { getWallet, getRopstenProvider } from "../utils";
import * as EventABI from "../artifacts/contracts/EventContractFactory.sol/EventContractFactory.json";
import { LogDescription } from "@ethersproject/abi";

const eventFactoryAddress = "0xf99F908CbE90B1a6eb86Df5F561F20910c3A9a38";
const eventName = "AWS Summit";
const location = "Manchester";
const date = new Date(2023, 3, 10, 0, 0, 0, 0);
const numberOfTickets = 1000;
const ticketPrice = ethers.utils.parseEther("0.2");

async function main() {
  const wallet = getWallet();
  const provider = getRopstenProvider();
  const signer = wallet.connect(provider);

  const eventCreatorContract = new ethers.Contract(
    eventFactoryAddress,
    EventContractFactoryJson.abi,
    signer
  ) as EventContractFactory;

  console.log("setting up listeners...");
  const eventCreateFilter = eventCreatorContract.filters.EventCreation();
  provider.once(eventCreateFilter, ({ topics, data }) => {
    const iface = new ethers.utils.Interface(EventABI.abi);
    const parsedLog = iface.parseLog({ topics, data });
    console.log("PARSED LOG:", parsedLog);

    console.log("contract address:", parsedLog.args["contractAddress"]);
  });

  console.log("creating new event...");
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
