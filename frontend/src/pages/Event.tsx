import React, { useState, useEffect } from 'react';  
import { useParams } from "react-router-dom";
import Header from '../components/Header';
import { useWeb3React } from '@web3-react/core';
import useContract from '../hooks/useContract';
import { ethers } from 'ethers';
//import FactoryABI from '../abi';
import {HomeEventProp} from './Home';
import { RouteComponentProps,matchPath } from 'react-router';
  //temporary data until we have the API to call
const event = {
    title: "Eth Hackathon",
    description: "Come and build the future of DeFi on Ethereum. Prize money of £20,000!",
    organiser: "Eth Global",
    location: "212 Hackney Road, London, E1 2AP, UK",
    date: "01/01/20",
    time: "19:00",
    imageUrl: "/hackathon.jpg",
    price: 0.05
}

// async function fetchEvent(eventId: string) {
//     const ApiUrl = "www.api.com/events/" + eventId;
//     const response = await fetch(ApiUrl);
//     return response;
// }
interface RouteParams {
    id: string, 
}

export default function Event(props:RouteComponentProps<RouteParams>) {
    const routeId = props.match.params!.id.slice(1)
    const { account, active } = useWeb3React();
    //const eventContract = useContract(eventId, FactoryABI);
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [txHash, setTxHash] = useState('');
    const [errorStatus, setErrorStatus] = useState(false);
    const [txError, setTxError] = useState('');
    const etherScanBase = 'https://rinkeby.etherscan.io/tx/'
    const [event, setEvent] = useState<HomeEventProp|null>({
        contractAddress: '',
        name: '',
        date: '',
        location: '',
        description: '',
        price:'',
        ownerAddress: '',
        imageUrl: '',
      })
      
        useEffect(() => {
        const fetchData = async () => {
          const data = await fetch(`http://localhost:4000/events`, {
              method: "GET",
          })
          const json = await data.json();
          const singleEvent = json.events.filter(({contractAddress}:{contractAddress: string}) => contractAddress?.toLowerCase() === routeId.toLowerCase())
          setEvent(singleEvent[0])
          console.log(singleEvent[0])
        }
        fetchData().catch(err => console.log(err));
      },[])

    
    const price = event?.price;
    //uncomment this line to use the API
    //const event = fetchEvent(eventId);
    
    const [selectedValue, setSelectedValue] = useState<string>("1");
    const [totalPrice, setTotalPrice] = useState<number|undefined>(0);
    
    function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
        setSelectedValue(event.target.value);
    }

    const calcTotalPrice = (pricePerTicket: number) => {
        const total = pricePerTicket * Number(selectedValue);
        setTotalPrice(Number(total.toFixed(2)));
    }


    // async function buyTicket(){
    //     try {
    //         setIsLoading(true);
    //         //register transfer event from smart contract
    //         eventContract.removeAllListeners();
    //         eventContract.on("Transfer", () => {
    //             setSuccess(true);
    //             setIsLoading(false);
    //         })
    //         const tx = await eventContract.mint(data.eventDate,data.eventDate,data.location,data.price,data.numTickets, { value: ethers.utils.parseEther(costToDeployEvent) });
    //         setTxHash(tx.hash);
    //     }
    //     catch (error) {
    //         console.log(error);
    //         setErrorStatus(true);
    //         setTxError("failed to mint");
    //     }
    // }

  return (
    <div className='max-h-full'>
        <header>
            <Header/>
        </header>

        {!isLoading &&
        <div className="block mx-auto md:grid md:grid-cols-4 md:gap-10 md:max-w-screen-lg">
            <img src={event?.imageUrl} alt="event banner" 
            className="block mx-2 overflow-hidden md:col-span-2 rounded-md border border-gray-400 shadow-lg"/>

            <div className='mx-2 mt-5 border border-gray-400 rounded-md shadow-lg block md:col-span-2 md:mt-0'>
                <h1 className='p-2 m-0 text-center text-lg text-white bg-blue-600 font-semibold rounded-t-md'>{event?.name}</h1>
                <hr/>
                <div className="grid grid-cols-3 gap-0">
                    <p className="p-2 font-semibold col-span-1">Event Name:</p><p className="p-2 col-span-2 text-ellipsis overflow-hidden">{event?.name}</p>
                    <p className="p-2 font-semibold col-span-1">Description:</p><p className="p-2 col-span-2">{""}</p>
                    <p className="p-2 font-semibold col-span-1">Organiser:</p><p className="p-2 col-span-2 text-ellipsis overflow-hidden">{event?.ownerAddress}</p>
                    <p className="p-2 font-semibold col-span-1">Location:</p><p className="p-2 col-span-2">{event?.location}</p>
                    <p className="p-2 font-semibold col-span-1">Date (mm/dd/yy):</p><p className="p-2 col-span-2">{event?.date}</p>
                    {/* <p className="p-2 font-semibold col-span-1">Time:</p><p className="p-2 col-span-2">{event.time}</p> */}
                    <p className="p-2 font-semibold col-span-1">Price per Ticket (ETH):</p><p className="p-2 col-span-2">{event?.price}</p>
                </div>
            </div>
            <div className='mx-2 block md:col-start-3 md:col-span-2 border border-gray-400 rounded-md shadow-lg'>
                <div className='block md:grid md:grid-cols-4 md:gap-2'>
                    <label className='p-2 font-semibold col-span-1' htmlFor="number-of-tickets">Number of Tickets:</label>
                    <select value={selectedValue} onChange={handleChange}
                    className="w-[50px] p-2 m-2 rounded-lg col-span-1" name="number-of-tickets" id="number-of-tickets">
                        <option value="1" className="">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                    <label className='p-2'>Total: {totalPrice?.toFixed(2)} ETH</label>
                    <button type="submit" 
                        className="p-2 m-2 rounded-lg bg-blue-600 text-white 
                        col-span-1 font-semibold hover:bg-blue-700 shadow-md"
                        >Buy
                    </button>  
                </div>
            </div>


        </div> 
        } {/* end of !isLoading */}
        {isLoading && <p>Hang tight, minting your ticket...</p>}
        {success && 
            <>
                <p>Your ticket has been minted!</p>
                <p>Transaction Hash: <a href={etherScanBase + txHash}>{txHash}</a></p>
            </>
        }
    </div>
  )
}
