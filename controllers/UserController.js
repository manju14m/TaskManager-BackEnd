import express from "express"
import User from "../models/UserModel.js"

const addUser = async(req,res)=>{
  // console.log(req.body.name)
  const data = await User.create(req.body.name)

  if(data){
    res.status(201).json(data)
  }
  else{
    res.status(400)
    throw new Error("User not created")
  }
}

export default addUser