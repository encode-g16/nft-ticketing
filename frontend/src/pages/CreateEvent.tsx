import React from 'react'
import Header from '../components/Header';
import CreateEventForm from '../components/CreateEventForm';

export default function CreateEvent() {
  return (
    <div>
        <header>
            <Header/>
        </header>
        <div>
            <CreateEventForm/>
        </div>
    </div>
  )
}
