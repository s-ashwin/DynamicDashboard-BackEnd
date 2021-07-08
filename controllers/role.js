const Role = require("../models/role")

exports.createRole = (req,res)=>{
    const role = new Role(req.body)
    role.save((err,name)=>{
        if(err){
            return res.status(400).json({error:"Create Role Failed"})
        }
        res.json({name})
    })
}
