import logo from './logo.svg';
import './App.css';
import {useState, useRef} from 'react'
import {io} from 'socket.io-client'
function App() {

  const inputRef = useRef(null)
  const socket = io('http://localhost:5000')
  const handleSend = () =>{
    socket.emit('send-msg', inputRef.current.value)
  }

  socket.on('reply-msg',(message)=>{
    console.log(message)
  })
  return (
    <div className="App">
      <input ref={inputRef}/>
      <button onClick={handleSend}>send</button>
    </div>
  );
}

export default App;
