import styled from 'styled-components';
import { Input, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';

import {
  initialValues,
  validationSchema,
} from '../formik-validation/roomValidation';
import { useAppDispatch, useAppSelector } from '../store/store';
import { addPlayer } from '../store/tictactoeReducer';
import { addRpsPlayer } from '../store/rockPaperScissorsReducer';

interface IEnterRoomProps {
  socket: any;
}

const EnterRoom = ({ socket }: IEnterRoomProps) => {
  const { chosenGame } = useAppSelector((state) => state.common);
  const { roomEnterLoading } = useAppSelector((state) => state.tictactoe);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { handleSubmit, errors, dirty, getFieldProps, touched } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      if (chosenGame === 'tic-tac-toe') {
        dispatch(
          addPlayer({
            roomName: values.roomName,
            onSuccess: (data: string) => {
              if (data === 'waiting') {
                navigate('/waiting');
                socket.emit('first-player-joined', {
                  roomName: values.roomName,
                });
              } else {
                socket.emit('second-player-joined', {
                  roomName: values.roomName,
                });
                navigate(`/${chosenGame}`);
              }
            },
          })
        );
      } else {
        dispatch(
          addRpsPlayer({ roomName: values.roomName, onSuccess: (data:any) => {
              if(data.message==='waiting') {
                navigate('/waiting');
                socket.emit('first-player-joined', {
                  roomName: values.roomName,
                });
              }else{
                socket.emit('second-player-joined', {
                  roomName: values.roomName,
                });
                navigate(`/${chosenGame}`)
              }
          } })
        );
      }
    },
  });
  return (
    <EnterRoomContainer>
      <NameDescription>Enter Room Name</NameDescription>
      <NameInput>
        <Input
          {...getFieldProps('roomName')}
          style={{ width: 300 }}
          placeholder="uncle bobby"
        />
        {errors.roomName && touched.roomName && (
          <ErrorMessage>{errors.roomName}</ErrorMessage>
        )}
        <Button
          loading={roomEnterLoading}
          disabled={Object.keys(errors).length > 0 || !dirty}
          onClick={() => handleSubmit()}
        >
          Start
        </Button>
      </NameInput>
    </EnterRoomContainer>
  );
};

const EnterRoomContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
`;

const NameDescription = styled.h3`
  font-weight: 700;
  color: white;
  font-size: 32px;
`;

const NameInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const ErrorMessage = styled.span`
  color: red;
  font-size: 12px;
`;

export default EnterRoom;
