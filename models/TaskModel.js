import mongoose from "mongoose"
// import pkg from 'date-fns';
// const {format} = pkg;

const taskSchema = new mongoose.Schema({
  title:{
    type:String,
    required:true
  },
  description:{
    type:String,
    required:true
  },
  status:{
    type:String,
    default: "To Do"
  },
  targetDate:{
    type:Date,
    default: new Date()
  }
})

const Task = mongoose.model("task",taskSchema)
export default Task