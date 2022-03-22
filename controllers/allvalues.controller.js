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
        return res.status(200).send({
            message: "Success",
            data: results,
        });
    });

    // try{
    //     const allValues = await AllValues.find();
    //     res.json(allValues);
    // }catch(err){
    //     res.json({message: err});
    // }

 };
