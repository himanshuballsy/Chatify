import express, {Request, Response} from 'express';

import dotenv from 'dotenv';

import { authRouter } from './routes/auth.route.js';

import messageRouter from './routes/message.route.js';

import cors from 'cors';

import { connectDB } from './lib/db.js';

import cookieParser from 'cookie-parser';

import {app, server} from './lib/socket.js'

import path from 'path';


dotenv.config();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(express.json({limit: '10mb'}));

app.use(cookieParser());

app.use('/api/auth', authRouter);

app.use('/api/message', messageRouter);

const PORT = process.env.PORT;

const __dirname = path.resolve();  


//app.use(express.static(path.join(__dirname, "..NexaChat/frontend/dist")));

app.get('/', (req: Request, res: Response) => {
    res.send("hello world")
} )
app.use(express.static(path.join(__dirname, "..NexaChat/frontend/dist")));

server.listen(process.env.PORT || 3000, ()=> {
    console.log(`server started at port: ${PORT}`)
    connectDB(process.env.MONGOURL as string);
})
