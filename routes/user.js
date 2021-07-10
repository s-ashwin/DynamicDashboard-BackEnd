const express = require('express')
const { isSignedin, isAdmin } = require('../controllers/auth')
const { getUserById, updateUser, getAllUsers, getAUser, findUserById } = require('../controllers/user')
const router = express.Router()

router.param('userId', getUserById)
router.param('id', findUserById)
router.get("/user/getall/:userId",isSignedin, isAdmin, getAllUsers)
router.get("/user/get/:userId/:id",isSignedin, isAdmin, getAUser)
router.put("/user/update/:userId/:id",isSignedin, isAdmin , updateUser)

module.exports = router