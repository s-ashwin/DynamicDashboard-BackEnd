const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())

app.get('/api', (req,res)=>{
    return res.send("hello")
})

app.listen(4000)