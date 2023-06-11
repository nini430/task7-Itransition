import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../store/store';
import { setPoint, allowMove } from '../store/tictactoeReducer';
import checkGame from '../utils/checkGame';
import Declaration from './Declaration';
import { Dispatch, SetStateAction } from 'react';

interface ITikTakToeBoardProps {
  socket: any;
  showEndPopup: string;
  setShowEndPopup: Dispatch<SetStateAction<string>>;
}

const TikTakToeBoard = ({
  socket,
  showEndPopup,
  setShowEndPopup,
}: ITikTakToeBoardProps) => {
  const dispatch = useAppDispatch();
  const { board, allowedMove, mySymbol, roomName } = useAppSelector(
    (state) => state.tictactoe
  );

  const handleSetPoint = (x: number, y: number) => {
    dispatch(setPoint({ x, y, symbol: mySymbol }));
    const newBoard = JSON.parse(JSON.stringify(board));
    newBoard[x][y] = mySymbol;
    socket.emit('add-move', { symbol: mySymbol, position: [x, y], roomName });
    dispatch(allowMove(false));
    const result = checkGame(newBoard);
    if (result !== 'continue') {
      dispatch(allowMove(true));
    }
    if (result === 'draw') {
      setShowEndPopup(result);
    } else if (result === 'X') {
      setShowEndPopup(mySymbol === 'X' ? 'You Win' : 'You Lose');
    } else if (result === 'O') {
      setShowEndPopup(mySymbol === 'O' ? 'You Win' : 'You Lose');
    }
  };

  return (
    <BoardContainer allowedMove={allowedMove}>
      {!!showEndPopup && (
        <Declaration
          setShowEndPopup={setShowEndPopup}
          socket={socket}
          message={showEndPopup}
        />
      )}
      {board.map((row: any, rIndex: number) => (
        <BoardRowContainer>
          {row.map((column: any, cIndex: number) => (
            <BoardCube
              columnvalue={column}
              onClick={() => handleSetPoint(rIndex, cIndex)}
            >
              {column}
            </BoardCube>
          ))}
        </BoardRowContainer>
      ))}
    </BoardContainer>
  );
};

const BoardContainer = styled(({ allowedMove, ...props }: any) => (
  <div {...props} />
))`
  pointer-events: ${({ allowedMove }) => (allowedMove ? 'default' : 'none')};
`;

const BoardRowContainer = styled.div`
  display: flex;
`;
const BoardCube = styled(({ columnvalue, ...rest }: any) => <div {...rest} />)`
  width: 300px;
  height: 300px;
  border: 1px solid white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 60px;
  color: white;
  cursor: pointer;
  pointer-events: ${({ columnvalue }) => (columnvalue ? 'none' : 'default')};
  transition: all 0.3s ease;

  &:hover {
    background: rgb(199, 224, 239);
  }
`;

export default TikTakToeBoard;
