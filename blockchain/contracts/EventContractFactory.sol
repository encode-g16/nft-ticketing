//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

import "./Event.sol";

contract EventContractFactory {
    mapping(address => bool) public events;
    uint256 public fee;
    address payable public admin; //need to set this

    event eventCreation(address owner, address contractAddress, string name, uint32 dateOfEvent, string location);

    modifier onlyAdmin {
        // modifier code
        _;
    }
    
    constructor() {}

    function createEvent(
        string memory _eventName, uint32 _dateOfEvent, string memory _location, uint32 _maxNumOfTickets, uint256 _ticketPrice
    )  public {
        address eventAddress = address(new Event(
            _eventName, _dateOfEvent, _location, _maxNumOfTickets, _ticketPrice, payable(msg.sender)
        ));

        events[eventAddress] = true;
        emit eventCreation(msg.sender, eventAddress, _eventName, _dateOfEvent, _location);
    }

    function withdraw(address contractAddress) public {
        //
    } 

}