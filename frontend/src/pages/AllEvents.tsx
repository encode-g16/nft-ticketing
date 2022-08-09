import React, { useEffect, useState } from 'react'
import Header from '../components/Header';
import eventData from '../MockEventData.json';
import EventBox, { EventProp } from '../components/EventBox';

const AllEvents = () => {
  const [input, setInput] = useState<string| undefined>(undefined);
  const [filteredEvents, setFilteredEvents] = useState<EventProp[]>(eventData)
  
  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    let newInput = e.target.value.toLowerCase();
    setInput(newInput);
    let userEvents = eventData.filter((event) => event.eventName.toLowerCase().includes(newInput))
    setFilteredEvents(userEvents)
  }

  return (
    <div>
        <header>
            <Header />
      </header>
      <div className="font-sans text-black flex my-16 mx-16 w-[600px] h-[60px]">
        <div className="flex w-full rounded-xl">
    
            <input type="text" className="text-xl px-4 py-2 w-full border-2 border-gray-200 focus:border-black focus:placeholder:text-transparent" placeholder="Find your next event..." onChange={e => handleChange(e)}/>
            <button className="flex items-center justify-center px-4 border-2">
              <svg className="h-4 w-8 text-grey-dark items-end" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"/></svg>
            </button>
        </div>
      </div>
        <div className="grid grid-cols-1 xl:grid-cols-4 md:grid-cols-2 gap-5 mx-5 sm:mx-16">
            {
              input
              ? filteredEvents!.map(({eventName, eventDate, location, description, price, organiser, file}) => <EventBox eventName={eventName} eventDate={eventDate} location={location} price={price} organiser={organiser} description={description} file={file}/>)
              : eventData.map(({eventName, eventDate, location, description, price, organiser, file}) => <EventBox eventName={eventName} eventDate={eventDate} location={location} price={price} organiser={organiser} description={description} file={file}/>)
            }
        </div>

    </div>
  )
}

export default AllEvents