# NFT Ticketing Platform

Encode final project - NFT ticketing platform.


## High Level Plan

### Smart Contracts

The platform will consist of two smart contacts.

#### Parent Contract

This contract is responsible for keeping track of events and deploying new ERC721 ticket contracts, the contract will also set price to pay for user to deploy a new collection

#### ERC721 Ticket Contract

This contract will be deployed when an event organiser wants to create a set of tickets for their event. They will need
to specify the name of the event, number of tickets available and price per ticket as a bare minimum.

The contract will also have extra methods and state variables to redeem and verify tickets.


### Backend

- handle caching of events and expose api to view available events.
- handle storage of metadata in IPFS or centralised DB


### Frontend

- Display events for people to view 
- Interact directly with smart contracts for transactions 
  - deploying new ticket collections
  - redeeming / verifying tickets 
- QR code generation (ticket holder can generate this at any point in time)
- QR code scanning (available for connected wallets that own the ticket collection)

### Extra Work

- Make parent contract a proxy contract that can be upgraded
- Use unstoppable domains for logins for event organisers and customers
- Allow Ticket holders to update metadata fields e.g ticket holder name
- Track events for analytics eg. Transfers, Redeemns etc
- General improvements to smart contracts and data handling



