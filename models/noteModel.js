import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
    {
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"user",
            required:true,
       },        
        text: {
            type: String,
            required: true            
        },
        content: {
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

const Note= mongoose.model("Note",noteSchema);
export default Note;