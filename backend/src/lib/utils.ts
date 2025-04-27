import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';

import { Response } from 'express';
import { Types } from 'mongoose';

dotenv.config();

export const generateToken = (userId: Types.ObjectId, res:Response)=> {
    const secret = process.env.JWT_SECRET;

    const token = jwt.sign({userId: userId}, secret!,  {
        expiresIn: '7d'
    });

    res.cookie('jwt', token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV !== 'development'
    })

    return token
};
