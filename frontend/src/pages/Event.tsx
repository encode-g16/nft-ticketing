import React, { useState, useEffect } from 'react';  
import { useParams } from "react-router-dom";
import Header from '../components/Header';
import { useWeb3React } from '@web3-react/core';
import useContract from '../hooks/useContract';
import { ethers } from 'ethers';
import EventContractABI from '../EventContractABI.json';
import { HomeEventProp } from './Home';
import { RouteComponentProps, matchPath } from 'react-router';
const etherScanAddressUrlBase = 'https://ropsten.etherscan.io/address/';

interface RouteParams {
    id: string, 
}

export default function Event(props:RouteComponentProps<RouteParams>) {
    const routeId = props.match.params!.id.slice(1);
    const contractAddress = routeId;
    const { account, active } = useWeb3React();
    const eventContract = useContract(contractAddress,EventContractABI.abi);
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [txHash, setTxHash] = useState('');
    const [errorStatus, setErrorStatus] = useState(false);
    const [txError, setTxError] = useState('');
    const etherScanBase = 'https://ropsten.etherscan.io/tx/'
    const [selectedValue, setSelectedValue] = useState<string>("1");
    const [totalPrice, setTotalPrice] = useState<number|undefined>(0);
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
        const data = await fetch(`http://localhost:4000/events/${routeId}`, {
            method: "GET",
        })
        const json = await data.json();
    //   const singleEvent = json.events.filter(({contractAddress}:{contractAddress: string}) => contractAddress?.toLowerCase() === routeId.toLowerCase())
        setEvent(json)
    }
    fetchData().catch(err => console.log(err));
    },[])

    useEffect(() => {
        calcTotalPrice(event?.price);
    })

    function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
        setSelectedValue(event.target.value);
    }

    const calcTotalPrice = (pricePerTicketString: string | undefined) => {
        const pricePerTicket = Number(pricePerTicketString);
        const total = pricePerTicket * Number(selectedValue);
        setTotalPrice(Number(total.toFixed(2)));
    }

    const imagePrefix = "http://localhost:4000"

    async function buyTicket(price: string | undefined) {
        if(price !== undefined){
            try {
                setSuccess(false);
                setTxHash('');
                setIsLoading(true);
                //register transfer event from smart contract
  
                const response = await eventContract.mint({ value: ethers.utils.parseEther(price)});
                const receipt = await response.wait(1);
                setSuccess(true);
                setIsLoading(false);
                setTxHash(receipt.transactionHash);
                }
            catch (error) {
                console.log(error);
                setErrorStatus(true);
                setTxError("Failed to mint ticket.");
            }
        }
    }

  return (
    <div className='max-h-full'>
        <header>
            <Header/>
        </header>
        <div className="block mx-auto md:grid md:grid-cols-4 md:gap-10 md:max-w-screen-lg">
            <img src={`${imagePrefix}${event?.imageUrl}`} crossOrigin="anonymous" alt="event banner" 
            className="block mx-2 overflow-hidden md:col-span-2 rounded-md border border-gray-400 shadow-lg w-full h-full"/>

            <div className='mx-2 mt-5 border border-gray-400 rounded-md shadow-lg block md:col-span-2 md:mt-0'>
                <h1 className='p-2 m-0 text-center text-lg text-white bg-blue-600 font-semibold rounded-t-md'>{event?.name}</h1>
                <hr/>
                <div className="grid grid-cols-3 gap-0">
                    <p className="p-2 font-semibold col-span-1">Event Name:</p><p className="p-2 col-span-2 text-ellipsis overflow-hidden">{event?.name}</p>
                    {/* <p className="p-2 font-semibold col-span-1">Description:</p><p className="p-2 col-span-2">{""}</p> */}
                    <p className="p-2 font-semibold col-span-1">Organiser:</p><a href={etherScanAddressUrlBase + event?.ownerAddress} target="_blank" rel="noreferrer" className="p-2 col-span-2 text-ellipsis overflow-hidden underline text-blue-500">{event?.ownerAddress}</a>
                    <p className="p-2 font-semibold col-span-1">Contract Address:</p><a href={etherScanAddressUrlBase + event?.contractAddress} target="_blank" rel="noreferrer" className="p-2 col-span-2 text-ellipsis overflow-hidden underline text-blue-500">{event?.contractAddress}</a>
                    <p className="p-2 font-semibold col-span-1">Location:</p><p className="p-2 col-span-2">{event?.location}</p>
                    <p className="p-2 font-semibold col-span-1">Date (mm/dd/yy):</p><p className="p-2 col-span-2">{event?.date}</p>
                    {/* <p className="p-2 font-semibold col-span-1">Time:</p><p className="p-2 col-span-2">{event.time}</p> */}
                    <p className="p-2 font-semibold col-span-1">Price per Ticket (ETH):</p><p className="p-2 col-span-2">{event?.price}</p>
                </div>
            </div>
            <div className='mx-2 block md:col-start-3 md:col-span-2 '>
                <div className='block md:grid md:grid-cols-4 md:gap-2'>
                    {/* <label className='p-2 font-semibold col-span-1' htmlFor="number-of-tickets">Number of Tickets:</label>
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
                    <label className='p-2'>Total: {totalPrice?.toFixed(2)} ETH</label> */}
                    <button type="submit" 
                        className="p-2 m-2 rounded-lg bg-blue-600 text-white 
                        col-span-4 font-semibold hover:bg-blue-700 shadow-md"
                        onClick={() => buyTicket(event?.price)}
                        >Buy Ticket
                    </button>  
                </div>
                {isLoading && <p className="block text-center text-md">Please confirm in metamask and await for block confirmation</p>}
                {success && 
                    <>
                        <p className="block text-center text-md">Your ticket has been minted!</p>
                        <p className="block text-center text-md">Transaction Hash: <a href={etherScanBase + txHash} className="underline text-blue-500 text-lg">{txHash}</a></p>
                    </>
                }
            </div>
        </div> 
    </div>
  )
}
