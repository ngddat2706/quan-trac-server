const { response } = require("express");
const { AllStations, AllValues } = require("../models/allstations.model");

async function addStation(params, callback) {
  if (params.Id === undefined) {
    return callback(
      {
        message: "Id Station Required",
      },
      ""
    );
  }

  const station = new AllStations(params);
  station
    .save()
    .then((response) => {
      return callback(null, response);
    })
    .catch((error) => {
      return callback(error);
    });
}

//Quang will do this
async function updateStation(params, callback) {
  if (params.Id === undefined) {
    return callback(
      {
        message: "Id Station Required",
      },
      ""
    );
  }
  const station = await AllStations.findOne({ Id: params.Id });
  if (!station){
      return callback("wrong Id");
  }

  station
    .updateOne({ $set: params })
    .then((response) => {
      return callback(null, response);
    })
    .catch((error) => {
      return callback(error);
    });
}

async function getAllStation(params, callback) {
  await AllStations.find()
    .then((response) => {
      return callback(null, response);
    })
    .catch((error) => {
      return callback(error);
    });
}

module.exports = {
  addStation,
  updateStation,
  getAllStation,
};
