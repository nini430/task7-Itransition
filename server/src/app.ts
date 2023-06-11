import express,{Request,Response} from 'express';
import cors from 'cors';
import path from 'path'

import apiRouter from './routes/api';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/v1', apiRouter);


app.use(express.static(path.join(__dirname,'..','public')));

app.get('/*',(req:Request,res:Response)=>{
    res.sendFile(path.join(__dirname,'..','public','index.html'));
})
export default app;
