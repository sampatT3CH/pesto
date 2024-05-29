import User from "../models/userModel.js";
import bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken';
import { comparePassword, hashPassword } from "../helpers/authHelper.js";


export const register = async(req,res) => {
    try{
        const {username, password} = req.body;
        const existingUser = await User.findOne({username});
        if(existingUser){
            return res.status(400).json({message:"username already exist"})
        }

        const hashedPassword = await hashPassword(password)

        const user = new User({username,password:hashedPassword,avatar:""})
        const savedUser = await user.save();
        const payload = {
            id: savedUser._id,
            username: savedUser.username,
          };
          const token = await JWT.sign(payload,process.env.JWT_SECRET,{expiresIn:'7d'})
        res.status(200).json({
            success:true,
            message:"User Created Successfully",
            savedUser,
            token
        })

    }catch(err){
        res.status(500).json({message:'Server Error'});
    }
}

export const login = async (req,res) => {
    try{
      const {username, password} = req.body
      if(!username || !password){
        return res.status(404).json({
          success:false,
          message:"Invalid email or password",
        })
      }
      //check user
      const user = await User.findOne({username})
      if(!user){
        return res.status(404).json({
          success:false,
          message:"Username is not registered",
        })
      }
    const match = await comparePassword(password, user.password)
    
    if(!match){
      return res.status(200).json({
        success:false,
        message:"Password did not match",
      })
    }
    
    //token
    const payload = {
        id: user.id,
        username: user.username,
      };
    const token = await JWT.sign(payload,process.env.JWT_SECRET,{expiresIn:'7d'})
    res.status(200).json({
      success:true,
      message:"Logged in successfully",
      token,
      user
    })
    }catch(error){
    console.log(error);
    res.status(500).json({
      success:false,
      message:"server error",
      error
    });
    }
    }


    export const uploadAvatar = async (req, res) => {
     
      try {
      
      } catch (err) {
        res.status(500).json({
          success: false,
          message: "Server error"
        });
      }
    };  