const express = require('express')
const { isAdmin, isSignedin } = require('../controllers/auth')
const router = express.Router()
const { getUserById } = require('../controllers/user')
const { getChartById, createChart, updateChart } = require('../controllers/chart')

router.param('userId', getUserById)
router.param('chartId', getChartById)
router.post("/chart/create/:userId",isSignedin, isAdmin ,createChart)
router.post("/chart/update/:userId/:chartId",isSignedin, isAdmin ,updateChart)

module.exports=router

