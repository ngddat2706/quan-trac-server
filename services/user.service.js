const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const auth = require("../middlewares/auth");

async function login(params, callback){
    const {username, password} = params;
    const user = await User.findOne({ username});

    if(user != null && password != null){
        if(bcrypt.compareSync(password, user.password)) {
            const token = auth.generateAccessToken(username);
            // call toJSON method applied during model instantiation
            return callback(null, {...user.toJSON(), token});
        }else{
            return callback({
                message: "Invalid Username/Password!",
            });
        }
    }else{
        return callback({
            message:"Invalid Username/Password!",
        });
    }
}

async function register(params, callback){
    // if(params.username === undefined){
    //     console.log(params.username);
    //     return callback(
    //         {
    //             message: "Username Required",
    //         },
    //         ""
    //     );
    // }
    //Quang will do a validate function later
    
    const user = new User(params);
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