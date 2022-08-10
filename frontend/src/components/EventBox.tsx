import React from 'react'
import { FormData } from './CreateEventForm';

export interface EventProp {
  eventName: string;
  eventDate: string;
  location: string;
  description?: string;
  price:string;
  organiser:string;
  file: string;
}

const EventBox = ({eventName, eventDate, location, description, price, organiser, file}:EventProp) => {
  return (
    <div className="event-container-outer w-[90%] flex flex-col rounded-xl overflow-hidden border-solid border-gray-300 border-2 cursor-pointer shadow-gray-800 mb-8">
      <div className="w-full overflow-hidden h-[300px]">
        <img src={file} alt="" className="w-full h-full object-cover"/>
      </div>
          <h3 className="text-2xl font-medium leading-8 py-4 px-6">
            {eventName}
          </h3>
          <p className="px-6 text-xl font-semibold pb-3 text-indigo-600">{eventDate}</p>
          <p className=" px-6 text-xl pb-3 text-slate-500">{location}</p>
          <p className="px-6 text-xl pb-5 text-slate-500">{price? `${price} ETH` : `Free`}</p>
          <p className="px-6 text-xl pb-5 text-slate-500 text-ellipsis overflow-hidden">Organiser: {organiser}</p>
    </div>
  )
}

export default EventBox