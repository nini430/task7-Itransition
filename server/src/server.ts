import http from 'http'
import dotenv from 'dotenv'
dotenv.config();
import io from 'socket.io'

import app from './app'
import connectDB from './utils/connectDB';
import ioListen from './sockets';


const server=http.createServer(app);
const ioServer=new io.Server();
ioServer.attach(server,{cors:{origin:'*',methods:['GET','POST']}});

const PORT=7000;

server.listen(PORT,()=>{
    connectDB();
    ioListen(ioServer);
    console.log(`Server listening on port ${PORT}`);
})

