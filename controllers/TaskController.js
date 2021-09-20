import Task from "../models/TaskModel.js"

export const getAllTasks = async(req,res)=>{
  const data = await Task.find()
  console.log(data)
  res.json(data)
}

export const getTaskById = async(req,res)=>{
  const data =await Task.findById(req.params.id)
  if(data){
    res.json(data)
  }
  else{
    res.status(404)
    throw new Error("Task Not Found")
  }
}

export const updateTask = async(req,res)=>{
  const data = await Task.findById(req.params.id)
  if(data){
    data.status = req.body.status

    const UpdatedData = await data.save()

    res.json(UpdatedData)
  }
  else{
    res.status(404)
    throw new Error("Task Not Found")
  }
}

export const deleteTask = async(req,res)=>{
  const data =await Task.findByIdAndDelete(req.params.id)
  if(data){
    res.send("task deleted successfully")
  }
  else{
    res.status(404)
    throw new Error("Task Not Found")
  }
}

export const addTask = async(req,res)=>{
  const {title, description, targetDate} = req.body
  
  const newTask = {
    title,
    description,
    status: "To Do",
    targetDate: targetDate ? targetDate : new Date()
  }
  const data = await Task.create(newTask) 

  if(data){
    res.status(201).json(data)
  }

  else{
    res.status(400)
    throw new Error("data not valid")
  }
}