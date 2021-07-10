const User = require('../models/user')

exports.getUserById=(req,res,next,id)=>{
    User.findById(id).populate('role').exec((err,user)=>{
        if(err || !user){
            return res.status(400).json({
                error:"No User Found"
            })
        }
        req.profile=user
        next()
    })
}

exports.findUserById=(req,res,next,id)=>{
    User.findOne({_id:id},{_id:1}).exec((err,user)=>{
        if(err || !user){
            return res.status(400).json({
                error:"No User Found"
            })
        }
        req.user=user
        next()
    })
}

exports.getAUser = (req,res)=>{
    User.findOne({_id:req.user._id},{salt:0, encry_password:0, __v:0})
        .populate('role', "name")
        .exec((err,user)=>{
            if(err || !user){
                return res.status(400).json({
                    error:"No Users Found"
                })
            }
            res.json(user)
        })
}

exports.getAllUsers = (req,res)=>{
    User.find({},{salt:0, encry_password:0, __v:0})
        .populate('role', "name")
        .exec((err,user)=>{
            if(err || !user){
                return res.status(400).json({
                    error:"No Users Found"
                })
            }
            res.json(user)
        })
}

exports.updateUser=(req,res)=>{
    User.findByIdAndUpdate(
        {_id: req.user._id},
        {$set: req.body},
        {new:true, useFindAndModify:false},
        (err,user)=>{
            if(err || !user){
                return res.status(400).json({
                    error:"Update Unsuccessful"
                })
            }
            user.salt=user.encry_password=undefined
            res.json(user)
        }
    )
}