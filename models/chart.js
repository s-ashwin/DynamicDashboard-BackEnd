const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema

const chartSchema = new mongoose.Schema({
    name:{
        type: String,
        trim:true,
        required: true,
        unique:true,
    },
    data:{
        type:Object,
        required: true
    },
    url:{
        type: String,
        required: true,
    },
    roles:[{ type:ObjectId, ref:"Role" }]
})

module.exports = mongoose.model("Chart", chartSchema)