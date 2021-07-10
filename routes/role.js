var express = require('express')
const { isAdmin, isSignedin } = require('../controllers/auth')
var router = express.Router()
const { getUserById } = require('../controllers/user')
const {createRole, getAllRole, getRoleById, updateRole} = require("../controllers/role")

router.param('userId', getUserById)
router.param('roleId', getRoleById)
router.post("/role/create/:userId",isSignedin, isAdmin ,createRole)
router.get("/role/getall/:userId",isSignedin, isAdmin ,getAllRole)
router.put("/role/update/:userId/:roleId",isSignedin, isAdmin ,updateRole)

module.exports=router

