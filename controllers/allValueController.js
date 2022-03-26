const allvalueServices = require("../services/allValueServices.js");

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
    allvalueServices.getValue(req.query, (error, pageCount,results, pagination)=>{
        if(error){
            return next(error);
        }
        return res.status(200).send({
            currentPage: Number(req.query.pageNum),
            pageCount: pageCount,
            data: results,
            pagination: pagination,

        });
    });

 };
