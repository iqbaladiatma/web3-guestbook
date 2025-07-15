// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Guestbook {
    event NewMessage(address indexed from, uint256 timestamp, string message);

    struct Message {
        address sender;
        string message;
        uint256 timestamp;
    }

    Message[] private messages;

    function postMessage(string calldata _message) public {
        require(bytes(_message).length > 0, "Message cannot be empty");
        messages.push(Message(msg.sender, _message, block.timestamp));
        emit NewMessage(msg.sender, block.timestamp, _message);
    }

    function getAllMessages() public view returns (Message[] memory) {
        return messages;
    }
}