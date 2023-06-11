import { Server } from 'socket.io';

const ioListen = (io: InstanceType<typeof Server>) => {
  

  io.on('connection', (socket) => {
    console.log(`User is connected with id  : ${socket.id}`);

    socket.on('first-player-joined', ({ roomName }: { roomName: string }) => {
      socket.join(roomName);
    });
    socket.on('second-player-joined', ({ roomName }: { roomName: string }) => {
      socket.join(roomName);
      socket.to(roomName).emit('second-player-joined');
    });
    //tic-tac-toe-only logic start
    socket.on('add-move', ({ symbol, position, roomName }:{symbol:string,position:any,roomName:string}) => {
      console.log('at least', roomName);
      socket.to(roomName).emit('receive-move', { symbol, position });
    })
    //tic-tac-toe-only logic finish
    socket.on('request-another', ({ roomName }: { roomName: string }) => {
      socket.to(roomName).emit('receive-request');
    });

    //rps-only  logic start

    socket.on('player-move',({roomName,element}:{roomName:string,element:string})=>{
        socket.to(roomName).emit('player-move-receive',{element});
    });
    

    //rps-only logic finish

    socket.on('accept-request', ({ roomName }: { roomName: string }) => {
      socket.to(roomName).emit('receive-accept');
    });

    socket.on('reject-request', ({ roomName }: { roomName: string }) => {
      socket.to(roomName).emit('receive-reject');
    });
    
  });

};

export default ioListen;
