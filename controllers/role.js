const Role = require("../models/role")

exports.getRoleById=(req,res,next,id)=>{
    Role.findById(id).exec((err,role)=>{
        if(err || !role){
            return res.status(400).json({
                error:"No Role Found"
            })
        }
        req.role=role
        next()
    })
}

exports.getARole = (req,res)=>{
    Role.findOne({_id:req.role._id})
        .exec((err,role)=>{
            if(err || !role){
                return res.status(400).json({
                    error:"Error in getting role"
                })
            }
            res.json(role)
        })
}

exports.updateRole = (req,res)=>{
    Role.findByIdAndUpdate(
        {_id: req.role._id},
        {$set: req.body},
        {new:true, useFindAndModify:false},
        (err,role)=>{
            if(err || !role){
                return res.status(400).json({
                    error:"Update Unsuccessful"
                })
            }
            res.json(role)
        }
    )
}

exports.createRole = (req,res)=>{
    const role = new Role(req.body)
    role.save((err,name)=>{
        if(err){
            return res.status(400).json({error:"Create Role Failed"})
        }
        res.json({name})
    })
}

exports.getAllRole = (req,res)=>{
    Role.find()
        .exec((err,roles)=>{
            if(err || !roles){
                return res.status(400).json({
                    error:"Error in getting all roles"
                })
            }
            res.json(roles)
        })
}

exports.deleteRole=(req,res)=>{

    Role.findByIdAndDelete(req.role._id)
    .exec((err,removed)=>{
        if(err){
            return res.status(400).json({error:"Delete Role Failed"})
        }
        res.json({message:`${removed.name} Role Deleted`})
    })
}
