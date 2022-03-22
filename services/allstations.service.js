const { AllStations, AllValues } = require("../models/allstations.model");

async function addStation(params, callback){
    if(params.Id === undefined){
        return callback(
            {
                message: "Id Station Required",
            },
            ""
        );
    } 

    const station = new AllStations(params);
    station.save()
    .then((response)=>{
        return callback(null, response);
    })
    .catch((error)=>{
        return callback(error);
    });
}

async function updateStation(params, callback){
    if(params.Id === undefined){
        return callback(
            {
                message: "Id Station Required",
            },
            ""
        );
    } 

    const station = await AllStations.find((station) => station.Id === params.Id);
    station.updateOne({$set: req.body})
    .then((response)=>{
        return callback(null, response);
    })
    .catch((error)=>{
        return callback(error);
    });
}

module.exports = {
    addStation,
    updateStation,
};