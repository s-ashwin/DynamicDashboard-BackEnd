const express = require('express')
const cors = require('cors')
const bodyparser = require("body-parser")
const cookieparser = require("cookie-parser")
const app = express()
const mongoose = require('mongoose')
require("dotenv").config();

const roleRoutes = require('./routes/role')
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const chartRoutes = require('./routes/chart')

app.use(cors())
app.use(bodyparser.json())
app.use(cookieparser())

const port = process.env.PORT || 3000

mongoose.connect(process.env.DBURL, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
    .then(()=>{console.log("Connected to DB");})

app.use('/api', authRoutes)
app.use('/api', roleRoutes)
app.use('/api', userRoutes)
app.use('/api', chartRoutes)

app.get('/', (req,res)=> res.json({message:"heyy"}))

app.listen(port)

module.exports=app