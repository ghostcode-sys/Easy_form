const jwt = require("jsonwebtoken");
const User = require("../Models/User");
const jwtkey = process.env.SECRETKEY;


const tokenValidate = async(req, res, next) => {
    const {authorization} = req.headers;
    if(!authorization){
        res.status(400).send("token Required")
    }
    const token = authorization.split(" ")[1];
    // console.log(token, jwtkey)
       jwt.verify(token,jwtkey,async (err,payload)=>{
           if(err){
             return  res.status(401).send({error:"Invalid Token"})
           }
        const {UserID} = payload;
           const user = await User.findById(UserID)
           req.user = user
           next()
        })
}


module.exports = tokenValidate