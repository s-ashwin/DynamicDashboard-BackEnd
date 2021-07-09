var express = require('express')
const { isAdmin, isSignedin } = require('../controllers/auth')
var router = express.Router()
const { getUserById } = require('../controllers/user')
const {createRole} = require("../controllers/role")

router.param('userId', getUserById)
router.post("/role/create/:userId",isSignedin, isAdmin ,createRole)

module.exports=router

