const express = require('express')
const { isAdmin, isSignedin } = require('../controllers/auth')
const router = express.Router()
const { getUserById } = require('../controllers/user')
const { getChartById, createChart, updateChart, getAllCharts, getAChart, getMyCharts } = require('../controllers/chart')

router.param('userId', getUserById)
router.param('chartId', getChartById)
router.get("/chart/mycharts/:userId", isSignedin ,getMyCharts)
router.get("/chart/getall/:userId", isSignedin, isAdmin ,getAllCharts)
router.get("/chart/get/:userId/:chartId", isSignedin, isAdmin ,getAChart)
router.post("/chart/create/:userId",isSignedin, isAdmin ,createChart)
router.put("/chart/update/:userId/:chartId",isSignedin, isAdmin ,updateChart)

module.exports=router

