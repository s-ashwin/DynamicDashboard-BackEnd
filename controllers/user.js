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

exports.updateUser=(req,res)=>{
    User.findByIdAndUpdate(
        {_id: req.profile._id},
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