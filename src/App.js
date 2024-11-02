import logo from './logo.svg';
import './App.css';
//1. import Web3 module
import { Web3 } from 'web3';
import { useState } from 'react';

// contract address
const ADDRESS = '0xE51e2cF24e9484daD663743af3828338414f94c3';

const ABI = [{"inputs":[{"internalType":"uint256","name":"_initialCount","type":"uint256"},{"internalType":"string","name":"_initialMessage","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"count","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decrement","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getMessage","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"increment","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"message","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_newMessage","type":"string"}],"name":"updateMessage","outputs":[],"stateMutability":"nonpayable","type":"function"}];

function App() {
  const [counter, setCounter] = useState("none");
  const [message, setMessage] = useState("none");
  const [newMessage, setNewMessage] = useState('');

  //2. initialize the web3 object with injected provider
  const web3 = new Web3(window.ethereum);

  //3. initialize the contract ABI + ADDRESS
  const myContract = new web3.eth.Contract(ABI, ADDRESS);

  //4. interact with reading functions
  async function getCounter() {
    const result = await myContract.methods.getCount().call();
    setCounter(result.toString());
  }

  async function getMessage() {
    const result = await myContract.methods.getMessage().call();
    setMessage(result.toString());
  }

  async function increaseCounter() {
    //5. connect accounts and writing functions
    const accountsConnected = await window.ethereum.request({ method: 'eth_requestAccounts' });

    // writing functions
    const txReceipt = await myContract.methods.increment().send({ from: accountsConnected[0] });
    console.log(txReceipt);

    getCounter();
  }

  async function decreaseCounter() {
    //5. connect accounts and writing functions
    const connectedAccounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

    // interact with dicrease counter
    const txReceipt = await myContract.methods.decrement().send({ from: connectedAccounts[0] });
    console.log(txReceipt);

    getCounter();
  }

  async function updateMessage(newMessage) {
    //5. connect accounts and writing functions
    const connectedAccounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

    // interact with dicrease counter
    const txReceipt = await myContract.methods.updateMessage(newMessage).send({ from: connectedAccounts[0] });
    console.log(txReceipt);

    getMessage();
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <br/>
        <button onClick={getCounter}>Get current counter</button>
        <br/>
        <button onClick={increaseCounter}>Increase counter</button>
        <br/>
        <button onClick={decreaseCounter}>Decrease counter</button>
        <br/>
        <p>Counter: {counter}</p>
        <br/>
        <button onClick={getMessage}>Get Current Message</button>
        <br/>
        <p>Message: {message}</p>
        <br/>
        <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
        <br/>
        <button onClick={() => updateMessage(newMessage)}>Update Message</button>
        <br/>
      </header>
    </div>
  );
}

export default App;