const { response } = require("express");
const { AllStations, AllValues } = require("../models/allStationsModel.js");

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
async function updateStation(station, callback) {
  if (station.Id === undefined) {
    return callback(
      {
        message: "Id Station Required",
      },
      ""
    );
  }
  const foundedStation = await AllStations.findOne({ Id: station.Id });
  if (!foundedStation) {
    return callback(
      {
        message: "Wrong Id",
      },
      ""
    );
  }

  foundedStation
    .updateOne({ $set: station })
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
