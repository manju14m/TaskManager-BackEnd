import Task from "../models/TaskModel.js"

export const getAllTasks = async(req,res)=>{
  const data = await Task.find({user:req.user})
  res.json(data)
}

export const updateTask = async(req,res)=>{

  // let data = await Task.findById(req.params.id)
  const {title, description, targetDate, status} = req.body
  try {
    let task = await Task.findById(req.params.id)

    if (!task) return res.status(404).json({msg: 'Task not found'});

    // Make sure user owns Task
    
    if (task.user.toString() !== req.user) {
      return res.status(401).json({msg: 'Not authorized'});
    }

    task.title = title
    task.description = description
    task.targetDate = targetDate
    task.status = status

    const UpdatedTask = await task.save()
    res.json(UpdatedTask)
  }
   catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}



export const deleteTask = async(req,res)=>{

  try {
    let task = await Task.findById(req.params.id)

    if (!task) return res.status(404).json({msg: 'Task not found'});

    // Make sure user owns Task
    
    if (task.user.toString() !== req.user) {
      return res.status(401).json({msg: 'Not authorized'});
    }

    await Task.findByIdAndDelete(req.params.id)

    res.send("task deleted successfully")
  }
   catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}

export const addTask = async(req,res)=>{
  const {title, description, targetDate} = req.body
  
  const newTask = {
    user:req.user,
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