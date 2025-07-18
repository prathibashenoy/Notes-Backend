import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            min: 3,
            max: 10,

        }
    },
    {
        // to set the time field on mongoose 
        // time is updated when there is changes applied through mongoose
        timestamps:true
    }
)

const User= mongoose.model("User",userSchema);
export default User;