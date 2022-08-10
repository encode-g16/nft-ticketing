import { ethers } from "ethers";
import * as EventContractFactoryJson from "../artifacts/contracts/EventContractFactory.sol/EventContractFactory.json";
import { EventContractFactory } from "../typechain-types";
import { getWallet, getRopstenProvider } from "../utils";
import fs from "fs";

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
    const fileContent = `export const eventFactoryAddress = "${eventCreator.address}";`;

    //copy contract factory address into FS
    fs.writeFile(
        "../contracts/eventFactoryContractAddress.ts",
        fileContent,
        (err) => {
            if (err) {
                console.error(err);
            }
            // file written successfully
        }
    );
    fs.writeFile(
        "../frontend/src/eventFactoryContractAddress.ts",
        fileContent,
        (err) => {
            if (err) {
                console.error(err);
            }
            // file written successfully
        }
    );

    //copy ABI into the front end folder
    fs.copyFile(
        "../contracts/artifacts/contracts/EventContractFactory.sol/EventContractFactory.json",
        "../frontend/src/FactoryABI.json",
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
