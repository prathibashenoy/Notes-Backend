import { userModel } from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// dotenv is a package used in Node.js to load secret keys or environment variables from a file called .env.

dotenv.config()

//------------ to register user--------------
const registerUser = async (req, res) => {
    try {
        const username = req.body.userName;
        const password = req.body.passWord;

        if (!username || !password) {
            res.status(400).json({ message: "every fields are required to fill" })
        }
        // using bcrypt library the password is hashed for 10 rounds
        const hashedPassword = await bcrypt.hash(password, 10);
        const userRegister = await userModel.create({
            userName: username,
            password: hashedPassword
        })
        res.status(201).json({ message: "user created successfully" })
    } catch (error) {
        console.log(error)
       res.status(500).json({ message: "server error" });

    }
}

// ---------------------------LOGIN USER---------------------------

// to login user
// token is created when we are login 
const loginUser = async (req, res) => {
    try {

        const username= req.body.userName;
        const password= req.body.password;
        // if username and password is not entered
        if (!username || !password) {
            res.status(400).json({ message: "every fields are required to fill" })
            return;
        }
        // one is from schema
        // username will be get
        const findUser=await userModel.findOne({userName:username});
        
        // if entered the incorrect username
        if(!findUser){
             res.status(400).json({ message: "no user found" })
             return;
        }
        // need to check the hashed password trying to login password are same
        const isPasswordCorrect=await bcrypt.compare(password,findUser.password)
       
     
 /* 
 
LOGIN APP  
-----------
✅ Enter the credentials (username and password)  
✅ Click on the **Login** button  
✅ Backend checks the credentials from database  
✅ If correct → Login successful message is sent  
✅ Along with it, a **JWT token is generated** by the backend  
✅ This token is sent to the frontend  
✅ Frontend stores the token in **localStorage**

 App opens
 -----------------------
→ The app checks if the token is already saved in localStorage  
→ If found, the token is sent automatically to the backend  
→ If token is valid, user is already logged in  
→ Profile or dashboard is shown directly (no need to login again)

*/
        const loginToken= jwt.sign({userId:findUser._id},process.env.TOKEN_SECRET,{expiresIn:process.env.TOKEN_SECRET_EXPIRY})
    
        if(!isPasswordCorrect){
             res.status(400).json({ message: "incorrect password" })
             return;
        }
        else{
            // token is passed when login
             res.status(200).json({ message: "login successfull",loginToken })
             return;
        }
    } catch (error) {
        console.log("Error during login:", error); // 👈 Add this
       res.status(500).json({ message: "server error" });

    }
}

export { registerUser,loginUser }