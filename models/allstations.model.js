const mongoose = require("mongoose");
//const uniqueValidator = require("mongoose-unique-validator");
const Params = new mongoose.Schema({
    Name: {
        type: String,
    },
    Code: {
        type: String,
    },
    Unit: {
        type: String,
    },
    Min: {
        type: String,
    },
    Max: {
        type: String,
    },
    Color: {
        type: String,
    },
});

const ValueDict = new mongoose.Schema({
    ParamValue: {
        type: String,
    },
    ParamStatus: {
        type: String,
        default: 0,
    },
    Time: {
        type: Date,
        default: Date.now(),
    },
    Unit: {
        type: String,
    },
    Min: {
        type: String,
        default: 0,
    },
    Max: {
        type: String,
        default: 0,
    },
});

const Value = new mongoose.Schema({
    ValueDict: [{
        type: mongoose.Types.ObjectId,
        ref: 'ValueDict',
    }],
    HappenedTime: {
        type: Date,
        default: Date.now(),
    },
    ReceivedTime: {
        type: Date,
        default: Date.now(),
    },
});

const AllStationSchem = new mongoose.Schema({
    Id: {
        type: String,
        required: true,
    },
    Name: {
        type: String,
        required: true,
    },
    DeviceCode: {
        type: String,
        required: true,
    },
    TelNo: {
        type: String,
        required: true,
    },
    Latitude: {
        type: String,
        required: true,
    },
    Longitude: {
        type: String,
        required: true,
    },
    InstallDate: {
        type: Date,
        default: Date.now(),
    },
    ChargeDate: {
        type: Date,
        default: Date.now(),
    },
    // Params: {
    //     type: String,
    //     default: "Not defined"
    // },
    // Value: {
    //     type: String,
    //     default: "Not defined"
    // },
    Connected: {
        type: Boolean,
        default: true,
    },

});



AllStationSchem.set("toJSON", {
    transform: (document, returnedObject)=>{
        //returnedObject.Id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

//AllStationSchem.plugin(uniqueValidator, {message: "Name Station already in use."});

const AllStations = mongoose.model("AllStations", AllStationSchem);
module.exports = AllStations;