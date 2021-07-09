const express = require('express')
const { isSignedin, isAdmin } = require('../controllers/auth')
const { getUserById, updateUser } = require('../controllers/user')
const router = express.Router()

router.param('userId', getUserById)
router.put("/user/update/:userId",isSignedin, isAdmin , updateUser)

module.exports = router