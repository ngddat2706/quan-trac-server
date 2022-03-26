const allstationServices = require("../services/allStationService.js");

exports.addStation =(req, res, next)=>{
    allstationServices.addStation(req.body, (error, results)=>{
        if(error){
            return next(error);
        }
        return res.status(200).send({
            message: "Add Station Success",
            data: results,
        });
    });
};

exports.getAllStation = async (req, res, next)=>{
    await allstationServices.getAllStation(req, (error, results)=>{
        if(error){
            return next(error);
        }
        return res.status(200).json(results);
    });
 };

exports.updateStation = async (req,res,next)=>{
    await allstationServices.updateStation(req.body,(error, results)=>{
        if(error){
            return next(error);
        }
        return res.status(200).json(results);
    });
}