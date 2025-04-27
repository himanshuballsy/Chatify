import { Router } from "express";
import { userAuth } from "../middlewares/auth.middleware.js";
import { getAllUser, getMessages, sendMessage } from "../controllers/message.controller.js";

const messageRouter = Router();

messageRouter.get('/users', userAuth, getAllUser); 
messageRouter.get('/:id', userAuth, getMessages); 
messageRouter.post('/send/:id', userAuth, sendMessage); 








export default messageRouter;