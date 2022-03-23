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
        return callback({ message: "stationId Required",},"");
    }
    if(params.pageNum === undefined){
        return callback({ message: "pageNum Required",},"");
    }
    if(params.pageSize === undefined){
        return callback({ message: "pageSize Required",},"");
    }
    if(params.interval === undefined){
        return callback({ message: "interval Required",},"");
    }
    if(params.startTime === undefined){
        return callback({ message: "startTime Required",},"");
    }
    if(params.endTime === undefined){
        return callback({ message: "endTime Required",},"");
    }

    try {
        const allValues = await AllValues.find({
            Id: params.stationId,
            ReceivedTime: {
                $gte: params.startTime,
                $lte: params.endTime,
            } 
        });
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