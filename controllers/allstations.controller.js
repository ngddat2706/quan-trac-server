const allstationServices = require("../services/allstations.service");

exports.addStation =(req, res, next)=>{
    allstationServices.addStation(req.body, (error, results)=>{
        if(error){
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: results,
        });
    });
};

exports.getData = async (req, res, next)=>{
    allstationServices.getStation(req.query, (error, results)=>{
        if(error){
            return next(error);
        }
        return res.status(200).json(results);
    });
 };