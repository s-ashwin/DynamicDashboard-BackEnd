var express = require('express')
var router = express.Router()

const {createRole} = require("../controllers/role")

router.post("/role/create",createRole)

module.exports=router

