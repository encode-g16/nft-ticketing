//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./Event.sol";

contract EventContractFactory is Ownable {
    mapping(address => bool) public events;
    uint256 public commission;

    event eventCreation(address deployer, string name, uint32 dateOfEvent, string location);
    
    constructor() {}

    function createEvent(
        string memory _eventName, uint32  _dateOfEvent, string memory _location, uint32 _maxNumOfTickets, uint256 _ticketPrice
    )  public returns(Event) {
        return new Event(
            _eventName, _dateOfEvent, _location, _maxNumOfTickets, _ticketPrice, payable(msg.sender), address(this)
        );
    }



}