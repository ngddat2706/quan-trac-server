const allvalueServices = require("../services/allvalues.services");

exports.addValue = (req, res, next)=>{
    allvalueServices.addValue(req.body, (error, results)=>{
        if(error){
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: results,
        });
    });
};

exports.getValue = (req, res, next)=>{
    allvalueServices.getValue(req.query, (error, results)=>{
        if(error){
            return next(error);
        }
        const Url = "/api/Values/GetAll?"
                    +"stationId="+ req.query.stationId
                    +"&pageNum=" + req.query.pageNum
                    +"&pageSize=" + req.query.pageSize
                    +"&interval=" + req.query.interval
                    +"&startTime="+ req.query.startTime
                    +"&endTime="+ req.query.endTime;
        return res.status(200).send({
            currentPage: Number(req.query.pageNum),
            pageCount: Number(req.query.pageSize),
            data: results,
            pagination: {
                PreviousUrl: Url,
                PreviousPages: Url,
                NextUrl: Url,
                NextPages: Url,
            },

        });
    });

 };
