import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import TikTakToeBoard from '../components/TikTakToeGame';
import { useAppDispatch, useAppSelector } from '../store/store';
import { setPoint, allowMove } from '../store/tictactoeReducer';
import checkGame from '../utils/checkGame';

interface ITicTacToeProps {
  socket: any;
}

const TicTacToeGame = ({ socket }: ITicTacToeProps) => {
  const { board, mySymbol } = useAppSelector((state) => state.tictactoe);
  const [showEndPopup, setShowEndPopup] = useState<any>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleMove = ({
      symbol,
      position,
    }: {
      symbol: 'X' | 'O';
      position: any;
    }) => {
      console.log(symbol, position[0], position[1], 'aja');
      dispatch(setPoint({ x: position[0], y: position[1], symbol }));
      console.log(board);
      const tempBoard = JSON.parse(JSON.stringify(board));
      tempBoard[position[0]][position[1]] = symbol;
      console.log('temp', tempBoard);
      dispatch(allowMove(true));
      const result = checkGame(tempBoard);
      console.log(result);
      if (result !== 'continue') {
        dispatch(allowMove(true));
      }
      if (result === 'draw') {
        setShowEndPopup('Draw');
      } else if (result === 'X') {
        setShowEndPopup(mySymbol === 'X' ? 'You Win' : 'You Lose');
      } else if (result === 'O') {
        setShowEndPopup(mySymbol === 'O' ? 'You Win' : 'You Lose');
      }
    };
    socket.on('receive-move', handleMove);
    return () => {
      socket.off('receive-move', handleMove);
    };
  }, [board]);
  return (
    <GameContainer>
      <TikTakToeBoard
        showEndPopup={showEndPopup}
        setShowEndPopup={setShowEndPopup}
        socket={socket}
      />
    </GameContainer>
  );
};

const GameContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export default TicTacToeGame;
