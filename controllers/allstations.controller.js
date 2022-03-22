const { AllStations, AllValues } = require("../models/allstations.model");
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
    try{
        const allStations = await AllStations.find();
        res.json(allStations);
    }catch(err){
        res.json({message: err});
    }
 };