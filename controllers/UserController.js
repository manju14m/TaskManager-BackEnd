import express from "express"
import User from "../models/UserModel.js"
import generateToken from "../utils/generateToken.js"
import bcrypt from "bcryptjs";


export const registerUser = async(req,res)=>{
  const {name, password} = req.body
  
  if(!name || !password){
    // return res.status(400).json({msg: "please Enter All Fields"})
    res.status(400)
    throw new Error("please Enter All Fields")
  }
 
  const userExists = await User.findOne({ name })

  if (userExists) {
    return res.status(400).json({msg:"User already exists"})
  }

  const newUser = await  User.create({
    name,
    password,
  });

const salt = await bcrypt.genSalt(10)
newUser.password =await bcrypt.hash(password,salt)

newUser.save()

  if (newUser) {
    return res.status(201).json({
      message:"User Created Successfully",
      user:{
        _id: newUser._id,
        name: newUser.name,
        token: generateToken(newUser._id),
      } 
    })
  } else {
    res.status(400).json({msg:"user not created"})
  }
}





export const loginUser = async(req,res)=>{
  const {name, password} = req.body

  if(!name || !password){
    res.status(400).json({msg: "please Enter All Fields"})
  }

  const user = await User.findOne({name})
  if (!user) {
    return res.status(400).json({msg:"User does not exists"})
  }

  
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({ msg: "invalid credentials" });
  }

  return res.status(201).json({
    message:"User logged in Successfully",
    user:{
      _id: user._id,
      name: user.name,
      token: generateToken(user._id),
    }
  })
}
