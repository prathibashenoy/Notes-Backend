import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();


const connectDB = async() => {
    try {
        const connectedString = await mongoose.connect (
            process.env.MONGO_URI
        )
    } catch(error) {
        console.log("Error occured while connecting to mongodb",error)
    }
};

export default connectDB;  