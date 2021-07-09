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

app.use(cors())
app.use(bodyparser.json())
app.use(cookieparser())

mongoose.connect(process.env.DBURL, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
    .then(()=>{console.log("Connected to DB");})

app.use('/api', authRoutes)
app.use('/api', roleRoutes)
app.use('/api', userRoutes)

app.get('/', (req,res)=> res.json({message:"heyy"}))

if(!process.env.DETA_RUNTIME){
    app.listen(4000)
}

module.exports=app