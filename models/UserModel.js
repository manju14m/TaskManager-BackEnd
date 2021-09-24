import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:[true, "Please Enter a Valid Password" ],
    minlength:[6, "Minimum password length should be 6 characters"]
  },
  registeredDate:{
    type:Date,
    default: new Date()
  }
})

const User = mongoose.model("user",userSchema)
export default User