import React, { useEffect, useState } from 'react'
import Header from '../components/Header' 
import eventData from '../MockEventData.json';
import {EventProp} from '../components/EventBox';
import EventBox from '../components/EventBox';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { HomeEventProp } from './Home';
import { Link } from 'react-router-dom';

const MyCreatedEvents = () => {
  const { account, activate, active } = useWeb3React<Web3Provider>()
  const [myEvents, setMyEvents] = useState<HomeEventProp[]|null>([{
    contractAddress: '',
    name: '',
    date: '',
    location: '',
    description: '',
    price:'',
    ownerAddress: '',
    imageUrl: '',
  }])
  const [eventData, setEventData] = useState<HomeEventProp[]|null>([{
    contractAddress: '',
    name: '',
    date: '',
    location: '',
    description: '',
    price:'',
    ownerAddress: '',
    imageUrl: '',
  }])

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(`http://localhost:4000/events`, {
          method: "GET",
      })
      const json = await data.json();
      setEventData(json.events)
    }
    fetchData().catch(err => console.log(err));
  },[])


  useEffect(() => {
    if(active && account){
      let userEvents = eventData!.filter(event => event.ownerAddress.toLowerCase() === account.toLowerCase())
      setMyEvents(userEvents)
    }
  },[account]);

  // if (account === null) {
  //   return (
  //     <div className="App App-header">
  //       {
  //         isMetamaskInstalled ? (
  //           <div>
  //             <button onClick={connectWallet}>Connect Your Metamask Wallet</button>
  //           </div>
  //         ) : (
  //           <p>Install Your Metamask wallet</p>
  //         )
  //       }
  
  //     </div>
  //   );
  // }

  return (
    <div>
        <header>
            <Header />
        </header>
        <div className="flex mx-auto flex-col items-center gap-8 mb-16">
          {!account || !active?
          (<p className="text-center text-2xl drop-shadow-7xl font-semibold">Connect Your Wallet to View Your Created Events</p>)
          :(<p className="text-center text-2xl drop-shadow-7xl font-semibold">Connected Wallet: <span className="text-lime-500">{account}</span> </p>)}
        </div>
        
          {(account && myEvents!.length>0) ?
          (<div className="grid grid-cols-1 xl:grid-cols-4 md:grid-cols-2 gap-5 mx-5 sm:mx-16">
            {myEvents!.map(({contractAddress, name, date, location, price, ownerAddress, imageUrl}) => <Link to={`/events/:${contractAddress}`} key={contractAddress}><EventBox key={contractAddress} eventName={name} eventDate={date} location={location} price={price} organiser={ownerAddress} contractAddress={contractAddress} file={imageUrl}/></Link>)}
          </div>)
          : <div className="text-center"><p>No events to display</p></div>
          }
        
        
        
        {/* To create a JSON file containing mock events. Display eventboxes */}
    </div>
  )
}

export default MyCreatedEvents