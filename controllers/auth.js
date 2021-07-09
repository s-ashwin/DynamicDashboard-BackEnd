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

exports.signin = (req, res)=> {

    const{email,password} = req.body

    User.findOne({email},(err,user)=>{
        if(err || !user){
            return res.status(400).json({
                error:"No User Found"
            })
        }
        if(!user.authenticate(password)){
            return res.status(401).json({
                error:"Email and Password doesn't match"
            })
        }

        const token = jwt.sign({_id: user._id}, process.env.SECRET)
        res.cookie("token", token, {expire: new Date()+9999})

        const {_id, name, email, role} = user
        return res.json({
            token,
            user:{
                _id,
                name,
                email,
                role
            }
        })

    })
}

exports.signout = (req, res)=> {
    res.clearCookie("token")
    res.json({
        message:"Signed Out"
    })
}

exports.isSignedin = expressJwt({
    secret: process.env.SECRET,
    algorithms: ['HS256'],
    userProperty: "auth"
})

exports.isAdmin = (req,res,next)=>{
    
    if(req.profile.role.name!='Admin'){
        return res.status(403).json({
            error:"No Admin Previlages"
        })
    }
    next()
}