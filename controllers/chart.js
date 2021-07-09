const Chart = require('../models/chart')

exports.getChartById=(req,res,next,id)=>{
    Chart.findById(id)
    .exec((err,chart)=>{
        if(err){
            return res.status(400).json({
                error: "Chart Not Found"
            })
        }
        req.chart=chart
        next()
    })
}

exports.createChart = (req,res)=>{
    const chart = new Chart(req.body)

    chart.save((err,chart)=>{
        if(err){
            return res.status(400).json({error:"Create Chart Failed"})
        }
        res.json({chart})
    })
}

exports.updateChart = (req,res)=>{
    Chart.findByIdAndUpdate(
        {_id: req.chart._id},
        {$set: req.body},
        {new:true, useFindAndModify:false},
        (err,chart)=>{
            if(err || !user){
                return res.status(400).json({
                    error:"Update Unsuccessful"
                })
            }
            res.json(chart)
        }
    )
}