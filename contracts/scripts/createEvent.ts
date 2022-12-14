import { BigNumber, ethers } from "ethers";
import * as EventContractFactoryJson from "../artifacts/contracts/EventContractFactory.sol/EventContractFactory.json";
import { EventContractFactory } from "../typechain-types";
import { getWallet, getRopstenProvider } from "../utils";
import * as EventABI from "../artifacts/contracts/EventContractFactory.sol/EventContractFactory.json";
import { eventFactoryAddress } from "../eventFactoryContractAddress";
import fs from "fs";

const eventName = "GopherCon";
const location = "London";
const date = new Date(2023, 1, 1, 0, 0, 0, 0);
console.log(`Date: ${date}`);
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

    console.log(`event created with transaction hash ${tx.hash} `);

    //copy ABI into the front end folder
    fs.copyFile(
        "../contracts/artifacts/contracts/Event.sol/Event.json",
        "../frontend/src/EventContractABI.json",
        (err) => {
            if (err) throw err;
            console.log(err);
        }
    );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
