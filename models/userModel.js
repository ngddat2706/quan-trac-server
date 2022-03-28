const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    email:{
        type: String,
        required: true,
        unique: true,
        max: 255,
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 6,
    },
    date:{
        type: Date,
        default: Date.now(),
    }
});

/**
 *  Here we are creating and setting an id property and 
    removing _id, __v, and the password hash which we do not need 
    to send back to the client.
 */
UserSchema.set("toJSON", {
    transform: (document, returnedObject)=>{
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        //do not reveal passwordHash
        delete returnedObject.password;
    },
});

/**
 * 1. The userSchema.plugin(uniqueValidator) method won’t let duplicate email id to be stored in the database.
 * 2. The unique: true property in email schema does the internal optimization to enhance the performance.
 */

UserSchema.plugin(uniqueValidator, {message: "Email already in use."});

const User = mongoose.model("user", UserSchema);
module.exports = User;