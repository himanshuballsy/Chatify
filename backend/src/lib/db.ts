import mongoose from "mongoose";

import dotenv from 'dotenv';

dotenv.config();

const connectDB = async (URL: string) => {
    try{
        console.log(URL);
        const conn = await mongoose.connect(URL);
        console.log(`Mongo DB connected at: ${conn.connection.port}`);
    }
    catch(err){
        console.log(`Mongo DB Connetion error: ${err}`);
    }
}

export {connectDB}