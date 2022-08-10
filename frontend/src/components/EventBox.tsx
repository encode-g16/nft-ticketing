import React from 'react'
import { FormData } from './CreateEventForm';

export interface EventProp {
  eventName: string;
  eventDate: string;
  location: string;
  description?: string;
  price:string;
  contractAddress: string;
  organiser:string;
  file: string;
}

const EventBox = ({eventName, eventDate, location, contractAddress, description, price, organiser, file}:EventProp) => {

  const imagePrefix = "http://localhost:4000"
 
  return (
    <div className="event-container-outer w-[90%] h-[600px] flex flex-col rounded-xl overflow-hidden border-solid border-gray-300 border-2 cursor-pointer shadow-gray-800 mb-8" >
      <div className="w-full overflow-hidden h-[300px] min-h-[300px]">
        <img src={`${imagePrefix}${file}`} alt="" className="w-full h-full object-cover" crossOrigin="anonymous"/>
      </div>
          <h3 className="text-2xl font-medium leading-8 py-4 px-6 text-ellipsis overflow-hidden">
            {eventName}
          </h3>
          <p className="px-6 text-xl font-semibold pb-3 text-indigo-600 text-ellipsis overflow-hidden">{eventDate}</p>
          <p className=" px-6 text-xl pb-3 text-slate-500 text-ellipsis overflow-hidden">{location}</p>
          <p className="px-6 text-xl pb-5 text-slate-500 text-ellipsis overflow-hidden">{price? `${price} ETH` : `Free`}</p>
          <p className="px-6 text-xl pb-5 text-slate-500 text-ellipsis overflow-hidden">Contract Address: {contractAddress}</p>
          <p className="px-6 text-xl pb-5 text-slate-500 text-ellipsis overflow-hidden">Organiser: {organiser}</p>
    </div>
  )
}

export default EventBox