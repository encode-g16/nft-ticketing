//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Event is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    string public eventName;
    uint32 public dateOfEvent;
    string public location;
    uint32 public maxNumOfTickets;
    uint256 public ticketPrice;
    address payable public eventOrganiser;
    address public factoryAddress;
    mapping(uint256 => bool) public redeemedTickets;

    // maximum number of tickets sold
    error MaxNumberOfTicketsSold(uint maxNumOfTickets);
    // amount not upto to ticket price
    error WrongTicketPrice(uint ticketPrice);

    event ticketSold(address eventId, uint ticketId, address buyerAddress);

    constructor(string memory _eventName, uint32  _dateOfEvent, string memory _location, uint32 _maxNumOfTickets, uint256 _ticketPrice, address payable _eventOrganiser, address _factoryAddress ) ERC721("EventTicket","ET")
    {
        eventName = _eventName;
        dateOfEvent = _dateOfEvent;
        location = _location;
        maxNumOfTickets = _maxNumOfTickets;
        ticketPrice = _ticketPrice;
        eventOrganiser = _eventOrganiser;
        factoryAddress = _factoryAddress;
    }

    function mint() public payable returns(bool) {
        if(_tokenIds.current() > maxNumOfTickets){
            revert MaxNumberOfTicketsSold(maxNumOfTickets);
        }

        if(msg.value != ticketPrice){
            revert WrongTicketPrice(ticketPrice);
        }

        _tokenIds.increment();

        uint256 newTicketId = _tokenIds.current();
        _mint(msg.sender, newTicketId);

        emit ticketSold(address(this), newTicketId, msg.sender);
        return true;
    }
}
