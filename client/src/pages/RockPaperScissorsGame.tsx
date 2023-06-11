import { styled } from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import { Spin } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import Rock from '../assets/rock-emoji.png';
import Paper from '../assets/paper-emoji.png';
import Scissors from '../assets/scissors-emoji.png';
import { useAppDispatch, useAppSelector } from '../store/store';
import checkRRps from '../utils/checkRps';
import { changeGame, resetPlay, endGame } from '../store/rockPaperScissorsReducer';
import { useNavigate } from 'react-router-dom';

interface IRockPaperScissorsGameProps {
  socket: any;
}

const RockPaperScissorsGame = ({ socket }: IRockPaperScissorsGameProps) => {
  const { myScore, opponentScore, roomName, round } = useAppSelector(
    (state) => state.rps
  );
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [elementChosen, setElementChosen] = useState('');
  const [opponentElementChosen, setOpponentElementChosen] = useState('');
  useEffect(() => {
    const handlePlayerMoveReceive = ({ element }: { element: string }) => {
      setOpponentElementChosen(element);
      if (elementChosen) {
        const result = checkRRps(elementChosen, element);
        if (result === 'Draw') {
          toast('Draw', { autoClose: 2000 });
        }else{
           if(result==='me') {
             toast('You won this time!',{autoClose:2000});
             dispatch(changeGame({youWon:true}));
           }else{
            toast('You lose this time!',{autoClose:2000});
            dispatch(changeGame({youWon:false}));
           }

           if(myScore===2 || opponentScore===2) {
            if(myScore>opponentScore) {
              toast('You win!',{autoClose:2000});
            }else{
              toast('You lose',{autoClose:2000})
            }
            
            setTimeout(()=>{
              dispatch(resetPlay());
              navigate('/')
            },2000);
           }
        }

        setTimeout(() => {
          setElementChosen('');
          setOpponentElementChosen('');
        }, 2000);
      }
    };
    socket?.on('player-move-receive', handlePlayerMoveReceive);
    return () => {
      socket?.off('player-move-receive', handlePlayerMoveReceive);
    };
  }, [
    socket,
    elementChosen,
    opponentElementChosen,
    myScore,
    opponentScore,
    round,
    dispatch,
    navigate
  ]);
  const handlePlayerMove = (element: string) => {
    socket.emit('player-move', { element, roomName });
    setElementChosen(element);
    if (opponentElementChosen) {
      const result = checkRRps(element, opponentElementChosen);
      if (result === 'Draw') {
        toast('Draw', { autoClose: 2000 });
      } else {
        if (result === 'me') {
          toast('You won this time!', { autoClose: 2000 });
          dispatch(changeGame({ youWon: true }));
        } else {
          toast('You lose this time!', { autoClose: 2000 });
          dispatch(changeGame({ youWon: false }));
        }
        if(myScore===2 || opponentScore===2) {
          if (myScore > opponentScore) {
            toast('You won!', { autoClose: 2000 });
          }else{
            toast('You lose!',{autoClose:2000});
          }
          dispatch(resetPlay());
          setTimeout(() => {
            dispatch(endGame({roomName}))
            navigate('/');
          }, 2000);
        }
        
      }
      setTimeout(() => {
        setElementChosen('');
        setOpponentElementChosen('');
      }, 2000);
    }
    setTimeout(() => {
      setElementChosen('');
      setOpponentElementChosen('');
    }, 2000);
  };
  return (
    <GameContainer>
      <ToastContainer />
      <PlayerContainer>
        <h3 style={{ fontSize: 24 }}>Score: {myScore} </h3>
        {elementChosen ? (
          <ComponentsContainer>
            <ElementWrapper>
              <img
                width={200}
                height={300}
                src={
                  elementChosen === 'rock'
                    ? Rock
                    : elementChosen === 'paper'
                    ? Paper
                    : Scissors
                }
                alt=""
              />
            </ElementWrapper>
          </ComponentsContainer>
        ) : (
          <ComponentsContainer>
            <ElementWrapper onClick={() => handlePlayerMove('rock')}>
              <img width={200} height={300} src={Rock} alt="" />
            </ElementWrapper>
            <ElementWrapper onClick={() => handlePlayerMove('paper')}>
              <img width={200} height={300} src={Paper} alt="" />
            </ElementWrapper>
            <ElementWrapper onClick={() => handlePlayerMove('scissors')}>
              <img width={200} height={300} src={Scissors} alt="" />
            </ElementWrapper>
          </ComponentsContainer>
        )}
      </PlayerContainer>
      <p style={{ fontSize: 50 }}>VS</p>
      <PlayerContainer>
        <h3 style={{ fontSize: 24 }}>Score: {opponentScore}</h3>

        {!opponentElementChosen ? (
          <SpinWrapper>
            <Spin size="large" />
          </SpinWrapper>
        ) : opponentElementChosen && !elementChosen ? (
          <SpinWrapper>
            <CheckedIcon />
            <h3 style={{ fontSize: 28 }}>Oponent made the choice!</h3>
          </SpinWrapper>
        ) : (
          <ComponentsContainer>
            <img
              width={200}
              height={300}
              src={
                opponentElementChosen === 'rock'
                  ? Rock
                  : opponentElementChosen === 'paper'
                  ? Paper
                  : Scissors
              }
              alt=""
            />
          </ComponentsContainer>
        )}
      </PlayerContainer>
    </GameContainer>
  );
};

const GameContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  gap: 100px;
  align-items: center;
  color: white;
`;

const PlayerContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 100px;
  flex-direction: column;
`;

const ComponentsContainer = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: center;
`;
const ElementWrapper = styled.div`
  padding: 20px;
  border: 1px solid white;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.4s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const SpinWrapper = styled.div`
  width: 242px;
  height: 346px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const CheckedIcon = styled(CheckOutlined)`
  font-size: 30px;
`;
export default RockPaperScissorsGame;
