// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract Counter {
    uint public count;
    string public message;

    constructor(uint _initialCount, string memory _initialMessage) {
        count = _initialCount;
        message = _initialMessage;
    }

    function getCount() public view returns (uint) {
        return count;
    }

    function getMessage() public view returns (string memory) {
    return message;
    }


    function increment() public {
        count++;
    }

    function decrement() public {
        require(count > 0, "Counter cannot be negative");
        count--;
    }

    function updateMessage(string memory _newMessage) public {
        message = _newMessage;
    }
}