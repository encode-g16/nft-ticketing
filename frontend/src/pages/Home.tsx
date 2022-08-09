import React from 'react';
import Header from '../components/Header';
import EventBox from '../components/EventBox';
import Hero from '../components/Hero';
import "../css/App.css"
import eventData from '../MockEventData.json'

const Home = () => {
  return (
    <div>
      <header>
        <Header />
      </header>
      <div>
        <Hero />
      </div>
      <div className="mx-auto px-[5%] pt-8">
          <div>
            <h2 className="my-8 text-2xl xl:ml-8 font-bold">Check Out Popular Events</h2>
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-4 md:grid-cols-2 gap-5 mx-5 sm:mx-16">
            {
              eventData.map(({eventName, eventDate, location, description, price, organiser, file}) => <EventBox eventName={eventName} eventDate={eventDate} location={location} price={price} organiser={organiser} description={description} file={file}/>)
            }
          </div>
      </div>
    </div>  
  )
}

export default Home