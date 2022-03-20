const AllStations = require("../models/allstations.model");

async function sendData(params, callback){
    if(params.Name === undefined){
        return callback(
            {
                message: "Name Station Required",
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

module.exports = {
    sendData,
};