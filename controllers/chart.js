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

exports.getAllCharts = (req,res)=>{
    Chart.find({})
        .populate("roles")
        .exec((err,charts)=>{
            if(err || !charts){
                return res.status(400).json({
                    error:"Error in getting all charts"
                })
            }
            res.json(charts)
        })
}

exports.getAChart = (req,res)=>{
    Chart.findById(req.chart._id)
        .exec((err,chart)=>{
            if(err || !chart){
                return res.status(400).json({
                    error:"Chart not found"
                })
            }
            res.json(chart)
        })
}

exports.getMyCharts = (req,res)=>{
    Chart.find({})
    .populate({path:"roles", match:{name:req.profile.role.name}})
    .exec((err,charts)=>{
        if(err || !charts){
            return res.status(400).json({
                error:"Error in getting all charts"
            })
        }
        mycharts = charts.filter(function(chart) {
            return chart.roles[0]; 
        });
        res.json(mycharts)
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
            if(err || !chart){
                return res.status(400).json({
                    error:"Update Unsuccessful"
                })
            }
            res.json(chart)
        }
    )
}