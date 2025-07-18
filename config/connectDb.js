import mongoose from "mongoose";


const connectDB = async() => {
    try {
        const connectedString = await mongoose.connect (
            "mongodb+srv://prathibashenoy10:IpddmSGPkUaFDUtk@cluster0.j22btkg.mongodb.net/UserNotes"
        )
    } catch(error) {
        console.log("Error occured while connecting to mongodb",error)
    }
};

export default connectDB;  