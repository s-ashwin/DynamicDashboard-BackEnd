const User = require("../models/user")
const jwt = require("jsonwebtoken")
const expressJwt = require("express-jwt")

exports.signup = (req, res)=> {

    const user = new User(req.body)

    user.save((err,user)=>{
        if(err){
            return res.status(400).json({
                error:"SignUp Error"
            })
        }
        else{
            return res.status(200).json({
                name:user.name,
                email:user.email,
                id:user._id
            })
        }
    })
}