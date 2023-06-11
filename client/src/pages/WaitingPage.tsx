import { useEffect } from 'react';
import { Spin } from 'antd';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/store';

interface IWaitingPageProps {
  socket: any;
}

const WaitingPage = ({ socket }: IWaitingPageProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {chosenGame}=useAppSelector(state=>state.common);
  useEffect(() => {
    const handleSecondPlayerJoin = () => {
      navigate(`/${chosenGame}`);
    };
    socket.on('second-player-joined', handleSecondPlayerJoin);

    return () => {
      socket.off('second-player-join', handleSecondPlayerJoin);
    };
  }, [navigate, socket, dispatch]);
  return (
    <LoadingContainer>
      <Spin size="large" />
    </LoadingContainer>
  );
};

const LoadingContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgb(199, 224, 239);
`;

export default WaitingPage;
