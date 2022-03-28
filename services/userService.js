const User = require("../models/userModel.js");
const bcrypt = require("bcryptjs");
const auth = require("../middlewares/auth.js");
const Joi = require('@hapi/joi');


const registerValidate =(body)=>{
    const schema = Joi.object({
        username:Joi.string().min(6).required(),
        password:Joi.string().min(6).required(),
    })
    return schema.validate(body);
        
}

const loginValidate =(body)=>{
    const schema = Joi.object({
        username:Joi.string().min(6).required(),
        password:Joi.string().min(6).required(),
    })
    return schema.validate(body);
}

async function login(body, callback){
    const {error} = loginValidate(body);
    if(error)return callback(error.details[0].message);

    const {username, password} = body;
    const user = await User.findOne({ username});

    if(bcrypt.compareSync(password, user.password)) {
        const token = auth.generateAccessToken(username);
        // call toJSON method applied during model instantiation
        return callback(null, {...user.toJSON(), token});
    }else{
        return callback({
            message: "Invalid Username/Password!",
        });
    }
}

async function register(body, callback){

    const {error} = registerValidate(body);
    if(error)return callback(error.details[0].message);
    
    //check if name is already in the db
    
    const user = new User(body);
    user.save()
    .then((response)=>{
        return callback(null, response);
    })
    .catch((error)=>{
        return callback(error);
    });
}

module.exports = {
    login,
    register,
};