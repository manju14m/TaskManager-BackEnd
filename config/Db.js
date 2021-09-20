import  Mongoose  from "mongoose";

const connectDB = async()=>{
  try {
      await Mongoose.connect(process.env.MONGO_URI,{
      useUnifiedTopology:true,
      useNewUrlParser:true,
    })
    .then(()=>console.log("connected to MongoDB"))
  } catch (error) {
    console.log(error)
  }
}

export default connectDB;