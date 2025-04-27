import { Request, Response } from "express";

import bcrypt from 'bcrypt';

import User from "../models/user.model.js";

import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";

import { AuthRequest } from "../middlewares/auth.middleware.js";

export const signUp = async (req: Request, res: Response) => {
    const {email, fullname, password} = req.body;

    try{

        if(!email || !fullname || !password) {
            res.status(400).json({message: 'All fields required'});
        }

        if(password.length < 6) {
            res.status(400).json({message: 'Password must be of atleast 6 chatacters'});
            return
        }

        const user = await User.findOne({email: email});

        if(user) {
            res.status(400).json({message: "User already exists"});
            return
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            email,
            fullname,
            password: hashPassword,
        });

        await newUser.save();

        if(newUser) {
            generateToken(newUser._id, res);

            res.status(201).json({
                _id: newUser._id,
                email: newUser.email,
                fullname: newUser.fullname,
                profilePic: newUser.profilePic,
            }) 
            return
        }
        else{
            res.status(400).json({message: 'Invalid user data'});
            return
        }
    }
    catch(err) {
       if(err instanceof Error) {
        console.log(`Error: ${err.message}`);
        res.status(500).json({message: 'server not responding'})
        return
       }
       else{
        console.log('Unknown error: ', err);
       }
    }
}

export const login = async (req: Request, res: Response) => {
    try{
        const {email, password} = req.body;

        if(!email || !password) {
            res.status(400).json({message: "All fields required"});
            return
        }

        const user = await User.findOne({
            email,
        });

        if(!user) {
            res.status(404).json({message: "User not found"});
            return
        }

        const hash = user.password;
        const authUser = await bcrypt.compare(password, hash);

        if(!authUser) {
            res.status(401).json({message: 'Incorrect Password'});
            return
        }

        generateToken(user._id, res);

        res.status(200).json({
            _id: user._id,
            email: user.email,
            fullname: user.fullname,
            profilePic: user.profilePic
        });

        return
    }
    catch(err) {
        if(err instanceof Error) {
            console.log(`Error: ${err.message}`);
            res.status(500).json({
                message: 'Server not responding'
            });
            return
        }
    }
}

export const signOut = (req: Request, res: Response) => {
    try{
        res.cookie('jwt', '', {maxAge: 0});
        res.status(200).json({
            message: "Logout Successfully"
        });
    }
    catch(err){ 
        if(err instanceof Error) {
            console.log(`Error: ${err.message}`);
            res.status(500).json({message: "Server not responding"});
        }
    }
}

export const updateProfile = async (req: AuthRequest, res: Response) => {
    try{
        const { profilePic } = req.body;

        const userId = req.user?._id

        if(!profilePic) {
            res.status(400).json({
                message: "Profile pic not found"
            });
            return
        }

        const uploadResopnse = await cloudinary.uploader.upload(profilePic)

        const updateUser = await User.findByIdAndUpdate(userId, {
            profilePic: uploadResopnse.secure_url
        }, {new: true});

        res.status(200).json(updateUser)
    }
    catch(err) {
        if(err instanceof Error) {
            console.log(`Error: ${err.message}`);
            res.status(500).json({message: 'Server not responding'});
        }
        else{
            console.log('Unknown error', err);
        }
    }
}

export const checkAuth = async(req: AuthRequest, res: Response) => {
    try{
        const user = req.user;
        if(!user) {
            res.status(404).json({
                message: "User data not found"
            });
            return
        }

        res.status(200).json(user);
    }
    catch(err) {
        console.log("Error: ", err);
        res.status(500).json({message: 'Server not responding'});
    }
}