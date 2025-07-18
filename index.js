import express from "express";
import connectDB from "./config/connectDb.js";
import cors from "cors";
import authRoutes from './routes/auth.js';
import noteRoutes from './routes/notes.js';
import dotenv from "dotenv";

dotenv.config();

 
const app =express();
const PORT=3000;

app.use(cors({
  origin:"http://localhost:5173"
}))
app.use(express.json());

app.get("/", (req,res) => {
  res.send("hi")
});

app.use('/api/auth', authRoutes);
 app.use('/api/notes', noteRoutes);

connectDB()
  .then(() =>{
    app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000}');
    });
    
})
.catch((err) => {
    console.log("server is not running due to:",err)
});




