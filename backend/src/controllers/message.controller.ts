import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware.js";
import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";
import { getReciverSocketId } from "../lib/socket.js";
import { io } from "../lib/socket.js";

export const getAllUser = async (req: AuthRequest, res: Response) => {
    try {
        const currentUserId = req.user._id;

        const filterdUsers = await User.find({ _id: { $ne: currentUserId } }).select('-password');

        res.status(200).json(filterdUsers);
        return
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: "Server not resonding" });
            console.log(err.message);
        }
        else {
            console.log('Unknown Error: ', err);
        }
    }
}

export const getMessages = async (req: AuthRequest, res: Response) => {
    try {
        const { id: chatUserId } = req.params;
        const myId = req.user._id;

        const messages = await Message.find({
            $or: [
                { senderId: myId, reciverId: chatUserId },
                { senderId: chatUserId, reciverId: myId }
            ]
        })

        if (!messages) {
            res.status(400).json({
                message: "No chats with this user"
            })
            return
        }

        res.status(200).json(messages);
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: "Server not resonding" });
            console.log(err.message);
        }
        else {
            console.log('Unknown Error: ', err);
        }
    }
}

export const sendMessage = async (req: AuthRequest, res: Response) => {
    try {
        const { text, image } = req.body;
        const { id: reciverId } = req.params;
        const senderId = req.user._id;
        let imageUrl;
        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        };

        const newMessage = new Message({
            senderId,
            reciverId,
            text,
            image: imageUrl
        })

        const response = await newMessage.save();

        const reciverSockedId = getReciverSocketId(reciverId);

        if(reciverSockedId) {
            io.to(reciverSockedId).emit('newMessage', response);
        }

        res.status(200).json(response);

    }  catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: "Server not resonding" });
            console.log(err.message);
        }
        else {
            console.log('Unknown Error: ', err);
        }
    }
}
