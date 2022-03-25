const mongoose = require("mongoose");
//const uniqueValidator = require("mongoose-unique-validator");
const ParamSchema = mongoose.Schema({
    Name: {
        type: String,
        default: "0"
    },
    Code: {
        type: String,
        default:"",
    },
    Unit: {
        type: String,
        default:"",
    },
    Min: {
        type: Number,
        default: 0,
    },
    Max: {
        type: Number,
        default: 0,
    },
    Color: {
        type: String,
        default: "",
    },
});

const ValueDictSchema = mongoose.Schema({
    ParamValue: {
        type: Number,
        default: 0
    },
    ParamStatus: {
        type: Number,
        default: 0
    },
    Time: {
        type: Date,
        default: Date.now(),
    },
    Unit: {
        type: String,
        default: ""
    },
    Min: {
        type: Number,
        default: 0
    },
    Max: {
        type: Number,
        default: 0
    },
});

const ValueSchema = mongoose.Schema({
    Id: {
        type: String,
        default: "0"
    },
    ValueDict: {
        type: Map,
        of: ValueDictSchema,
        default: {"0": {}},
    },
    HappenedTime: {
        type: Date,
        default: Date.now(),
    },
    ReceivedTime: {
        type: Date,
        default: Date.now(),
    },
});

const AllStationSchem = mongoose.Schema({
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
    Params: {
       type: [ParamSchema],
       default: {}
    },
    Value: {
        type: ValueSchema,
        default: {},
    },
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
        delete returnedObject.Value.Id;
    },
});

ValueSchema.set("toJSON", {
    transform: (document, returnedObject)=>{
        //returnedObject.Id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

//AllStationSchem.plugin(uniqueValidator, {message: "Name Station already in use."});

const AllStations = mongoose.model("AllStations", AllStationSchem);
const AllValues = mongoose.model("AllValues", ValueSchema);
module.exports = {
    AllStations,
    AllValues,
};