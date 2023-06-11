import {Routes,Route} from 'react-router-dom'
import {io} from 'socket.io-client'
import Welcome from './pages/Welcome'
import TicTacToeGame from './pages/TicTacToeGame'
import { useEffect, useState } from 'react'
import EnterRoom from './pages/EnterRoom'
import WaitingPage from './pages/WaitingPage'
import RockPaperScissorsGame from './pages/RockPaperScissorsGame'

function App() {
  const [socket,setSocket]=useState<any>(null);

  useEffect(()=>{
    if(!socket) {
      setSocket(io('https://two-live-games.onrender.com'));
    }
  },[socket])
  return (
    <>
    <Routes>
      <Route path="/" element={<Welcome/>}/>
      <Route path='/room' element={<EnterRoom socket={socket}/>}/>
      <Route path='/waiting' element={<WaitingPage socket={socket} />}/>
      <Route path='/tic-tac-toe' element={<TicTacToeGame socket={socket}/>}/>
      <Route path='/rock-paper-scissors' element={<RockPaperScissorsGame socket={socket}/>}/>
    </Routes>
    </>
  )
}

export default App
