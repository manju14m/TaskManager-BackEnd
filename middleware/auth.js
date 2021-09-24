import jwt from "jsonwebtoken"

function auth(req,res,next){
  const token = req.header("x-auth-token")
  if(!token){
    return res.status(401).json({msg:"No token, authorization denied"})
  }
  try {
    const decoded = jwt.verify(token,process.env.JWT_SECRET)
    console.log(decoded)
    req.user = decoded.id;
    next()
  } catch (error) {
    res.status(400).json({msg:"Token is not valid"})
  }
}

export default auth