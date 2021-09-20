import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./config/Db.js"
import TaskRouter from "./routes/TaskRoute.js"
import UserRouter from "./routes/UserRoute.js"

dotenv.config()
connectDB()

const app = express();
app.use(cors())
app.use(express.json())
const PORT = process.env.PORT || 8000

app.get("/",(req,res)=>{
  res.send("Welcome to Task manager")
})

app.use("/user", UserRouter)
app.use("/tasks", TaskRouter)


app.listen(PORT, ()=>console.log(`server is running on port ${PORT}`))

