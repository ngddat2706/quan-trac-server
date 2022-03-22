const { AllStations, AllValues } = require("../models/allstations.model");

async function addValue(params, callback){
    if(params.Id === undefined){
        return callback(
            {
                message: "Id Station Required",
            },
            ""
        );
    } 

    const station = new AllValues(params);
    station.save()
    .then(async (response)=>{
        try{
            await AllStations.updateOne({Id: params.Id},{$set:{Value: response}});
            return callback(null, response);
        }
        catch(error){
            return callback(error);
        }
        
    })
    .catch((error)=>{
        return callback(error);
    });
}


async function getValue(params, callback){
    if(params.stationId === undefined){
        return callback(
            {
                message: "stationId Required",
            },
            ""
        );
    } 

    try {
        const allValues = await AllValues.find({Id: params.stationId});
        return callback(null, allValues);
    }
    catch(error){
        return callback(error);
    }
}



module.exports = {
    addValue,
    getValue,
};