import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";

export const loginUser = async(req,res,next)=>{
  try {
    const {email, password} = req.body;

    let user =  await User.findOne({email}).select("+password");
    if(!user) return next(new Error("Invalid Email or Password",404));
    
    const isMatched = await bcrypt.compare(password, user.password);
    if(!isMatched) return next(new Error("Invalid Email or Password",404));
    
    sendCookie(user, res, `welcome back ${user.name}`, 200);  
  } catch (error) {
      next(error);
  }
} 



export const createNewUser = async(req,res,next)=>{
  try {
    const{name, email, password} = req.body;
    let user = await User.findOne({email});

    if(user) return next(new Error("user Already Exists",404));

    const hashedPassword = await bcrypt.hash(password,10);
    user = await User.create({name, email, password:hashedPassword});

    sendCookie(user, res, "Registered Successfully",201);
  } catch (error) {
      next(error);
  }
}



export const getMyProfile = (req,res)=>{
  res.status(200).json({
    success:true,
    user : req.user,
  });
}



export const logoutUser = (req, res)=>{
  res
    .status(200)
    .cookie("token","",{
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "Development"? "lax" : "none",
      secure: process.env.NODE_ENV === "Development"? false : true,  
    })
    .json({
    success:true,
    message : "Logged Out",
  });
}



export const updateUser = async(req,res)=>{}

export const deleteUser = async(req,res)=>{}