import { Button } from 'antd';
import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../store/store';
import { endGame, resetPlay } from '../store/tictactoeReducer';
import { useNavigate } from 'react-router-dom';

interface IDeclarationProps {
  message: string;
  socket: any;
  setShowEndPopup: Dispatch<SetStateAction<string>>;
}

const Declaration = ({
  message,
  socket,
  setShowEndPopup,
}: IDeclarationProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { roomName } = useAppSelector((state) => state.tictactoe);
  const [requesting, setRequesting] = useState(false);
  const [requestMessageSet, setRequestMessageSet] = useState(false);
  const tryAgainHandler = () => {
    setRequesting(true);
    toast('Requesting the new game to another player', { autoClose: 2000 });
    socket.emit('request-another', { roomName });
  };

  useEffect(() => {
    const handleReceiveRequest = () => {
      setRequestMessageSet(true);
    };
    const handleReceiveAccept = () => {
      dispatch(resetPlay());
      setShowEndPopup('');
    };

    const handleReceieveReject = () => {
      toast('Another player doesnt want another game', { autoClose: 2000 });
      setTimeout(() => {
        setShowEndPopup('');
        navigate('/');
        dispatch(resetPlay());
      }, 2000);
    };
    socket.on('receive-request', handleReceiveRequest);
    socket.on('receive-accept', handleReceiveAccept);
    socket.on('receive-reject', handleReceieveReject);

    return () => {
      socket.off('receive-request', handleReceiveRequest);
      socket.off('receive-accept', handleReceiveAccept);
      socket.off('receive-request', handleReceieveReject);
    };
  }, [socket, setShowEndPopup, dispatch, navigate]);

  const acceptGame = () => {
    socket.emit('accept-request', { roomName });
    setShowEndPopup('');
    dispatch(resetPlay());
  };
  const rejectGame = () => {
    socket.emit('reject-request', { roomName });
    setShowEndPopup('');
    dispatch(resetPlay());
    navigate('/');
    dispatch(endGame({ roomName }));
  };
  return (
    <DeclarationContainer>
      <DeclarationContext>
        {requesting ? (
          <h3>Waiting for the response from the player...</h3>
        ) : requestMessageSet ? (
          <>
            <h3>Another player wants another one! Do you wanna risk it?</h3>
            <ButtonsContainer>
              <Button onClick={acceptGame}>Sure!</Button>
              <Button onClick={rejectGame}>Not now!</Button>
            </ButtonsContainer>
          </>
        ) : (
          <>
            <h3 style={{ fontSize: 28 }}>The result : {message} </h3>
            <Button onClick={tryAgainHandler}>Try Again </Button>
          </>
        )}
      </DeclarationContext>
      <ToastContainer />
    </DeclarationContainer>
  );
};

const DeclarationContainer = styled.div`
  background: rgba(0, 0, 0, 0.7);
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DeclarationContext = styled.div`
  width: 400px;
  height: 300px;
  border-radius: 30px;
  padding: 30px;
  background: rgb(82, 180, 237);
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const ButtonsContainer = styled.div`
  display: flex;
  gap: 20px;
`;
export default Declaration;
