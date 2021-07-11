var express = require('express')
const { isAdmin, isSignedin } = require('../controllers/auth')
var router = express.Router()
const { getUserById } = require('../controllers/user')
const {createRole, getAllRole, getRoleById, updateRole, getARole, deleteRole} = require("../controllers/role")

router.param('userId', getUserById)
router.param('roleId', getRoleById)
router.post("/role/create/:userId",isSignedin, isAdmin ,createRole)
router.get("/role/getall/:userId",isSignedin, isAdmin ,getAllRole)
router.get("/role/get/:userId/:roleId",isSignedin, isAdmin ,getARole)
router.put("/role/update/:userId/:roleId",isSignedin, isAdmin ,updateRole)
router.delete("/role/delete/:userId/:roleId",isSignedin, isAdmin ,deleteRole)

module.exports=router

