import styled from 'styled-components'
import {Button} from 'antd'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../store/store'
import { setGame } from '../store/common'

const Welcome = () => {
    const dispatch=useAppDispatch();
    const navigate=useNavigate();
  return (
    <WelcomeContainer>
        <WelcomeText>Welcome to Game Fun!</WelcomeText>
        <SubText>
        Choose the game you wanna play:
        </SubText>
        <GameContainer>
        <Button onClick={()=>{
            dispatch(setGame('tic-tac-toe'))
            navigate('/room');
        }}  style={{width:300,color:'rgb(82, 180, 237)'}}>Tic Tac Toe</Button>
        <Button onClick={()=>{
            dispatch(setGame('rock-paper-scissors'));
            navigate('/room');
        }} style={{width:300,color:'rgb(82, 180, 237)'}}>Rock papers Scissors</Button>
        </GameContainer>
        
    </WelcomeContainer>
  )
}


const WelcomeContainer=styled.div`
    width:100vw;
    height:100vh;
    display:flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap:30px;
`

const WelcomeText=styled.div`
    font-size:32px;
    color:white;
`

const SubText=styled.span`
    font-size:20px;
    color:white;
    font-weight:300;
`

const GameContainer=styled.div`
    padding:20px;
    border:1px solid white;
    display:flex;
    flex-direction:column;
    gap:10px;
    border-radius:20px;
`
export default Welcome;