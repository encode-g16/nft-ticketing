//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Event is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private ticketCounter;

    string public location;
    uint256 public dateOfEvent;
    uint256 public maxNumOfTickets;
    uint256 public ticketPrice;
    address public owner;

    mapping(uint256 => bool) public redeemedTickets;

    event TicketSold(address indexed buyerAddress, uint256 ticketId);

    event TicketRedeemed(
        address indexed buyerAddress,
        uint256 indexed ticketId
    );

    struct SignatureParts {
        bytes32 r;
        bytes32 s;
        uint8 v;
    }

    constructor(
        string memory _eventName,
        uint256 _dateOfEvent,
        string memory _location,
        uint256 _maxNumOfTickets,
        uint256 _ticketPrice,
        address _owner
    ) ERC721(_eventName, "TICK") {
        dateOfEvent = _dateOfEvent;
        location = _location;
        maxNumOfTickets = _maxNumOfTickets;
        ticketPrice = _ticketPrice;
        owner = _owner;
    }

    function mint() external payable returns (bool) {
        require(ticketCounter.current() < maxNumOfTickets, "sold out");
        require(msg.value == ticketPrice, "incorrect amount paid");

        ticketCounter.increment();

        uint256 newTicketId = ticketCounter.current();
        _mint(msg.sender, newTicketId);

        emit TicketSold(msg.sender, newTicketId);

        return true;
    }

    function remainingTickets() external view returns (uint256) {
        return maxNumOfTickets - ticketCounter.current();
    }

    function verifyTicket(
        uint256 _id,
        address _owner,
        bytes memory _signature
    ) public returns (bool) {
        require(!redeemedTickets[_id], "ticket already redeemed");
        string memory message = string(abi.encodePacked(Strings.toString(_id)));

        SignatureParts memory sigParts = splitSignature(_signature);
        string memory header = "\x19Ethereum Signed Message:\n000000";
        uint256 lengthOffset;
        uint256 length;
        assembly {
            length := mload(message)
            lengthOffset := add(header, 57)
        }
        require(length <= 999999);
        uint256 lengthLength = 0;
        uint256 divisor = 100000;
        while (divisor != 0) {
            uint256 digit = length / divisor;
            if (digit == 0) {
                if (lengthLength == 0) {
                    divisor /= 10;
                    continue;
                }
            }
            lengthLength++;
            length -= digit * divisor;
            divisor /= 10;
            digit += 0x30;
            lengthOffset++;
            assembly {
                mstore8(lengthOffset, digit)
            }
        }
        if (lengthLength == 0) {
            lengthLength = 1 + 0x19 + 1;
        } else {
            lengthLength += 1 + 0x19;
        }
        assembly {
            mstore(header, lengthLength)
        }
        bytes32 check = keccak256(abi.encodePacked(header, message));
        require(
            _owner == ecrecover(check, sigParts.v, sigParts.r, sigParts.s),
            "invalid ticket"
        );
        redeemedTickets[_id] = true;
        emit TicketRedeemed(_owner, _id);

        return true;
    }

    function splitSignature(bytes memory sig)
        internal
        pure
        returns (SignatureParts memory)
    {
        require(sig.length == 65, "invalid signature length");

        bytes32 r;
        bytes32 s;
        uint8 v;

        assembly {
            /*
            First 32 bytes stores the length of the signature
    
            add(sig, 32) = pointer of sig + 32
            effectively, skips first 32 bytes of signature

            mload(p) loads next 32 bytes starting at the memory address p into memory
            */

            // first 32 bytes, after the length prefix
            r := mload(add(sig, 32))
            // second 32 bytes
            s := mload(add(sig, 64))
            // final byte (first byte of the next 32 bytes)
            v := byte(0, mload(add(sig, 96)))
        }

        return SignatureParts(r, s, v);
    }

    function withdraw() public onlyOwner {
        (bool sent, ) = msg.sender.call{value: address(this).balance}("");
        require(sent, "failed to withdraw");
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "must be owner");
        _;
    }
}
