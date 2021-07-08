const express = require('express')
const cors = require('cors')
const bodyparser = require("body-parser")
const cookieparser = require("cookie-parser")
const app = express()
const mongoose = require('mongoose')
require("dotenv").config();

const roleRoutes = require('./routes/role')
const authRoutes = require('./routes/auth')

app.use(cors())
app.use(bodyparser.json())
app.use(cookieparser())

mongoose.connect(process.env.DBURL, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
    .then(()=>{console.log("Connected to DB");})

app.use('/api', authRoutes)
app.use('/api', roleRoutes)

app.listen(4000)