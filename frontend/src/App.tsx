import CreateEvent from './pages/CreateEvent';
import Event from './pages/Event';
import Home from './pages/Home'
import AllEvents from './pages/AllEvents';
import MyCreatedEvents from './pages/MyCreatedEvents';
import React, {useContext, useState, useEffect} from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { Web3ReactProvider } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'

function getLibrary(provider: any): Web3Provider {
    const library = new Web3Provider(provider)
    library.pollingInterval = 12000
    return library
  }

export default function App() {

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Router>
        <div>
          <Switch>
            <Route exact path="/create-event">
              <CreateEvent />
            </Route>
            <Route path="/events/:id">
              <Event />
            </Route>
            <Route path="/my-created-events">
              <MyCreatedEvents />
            </Route>
            <Route path="/all-events">
              <AllEvents />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </Web3ReactProvider>
  );
}
