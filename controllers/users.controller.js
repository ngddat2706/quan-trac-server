const bcrypt = require("bcryptjs");
const userServices = require("../services/user.service");
const User = require("../models/user.model");

/**
 * 1. To secure the password, we are using the bcryptjs, It stores the hashed password in the database.
 * 2. In the SignIn API, we are checking whether the assigned and retrieved passwords are the same or not using the bcrypt.compare() method.
 * 3. In the SignIn API, we set the JWT token expiration time. Token will be expired within the defined duration.
 */
exports.register = (req, res, next)=>{
    const {password} = req.body;

    const salt = bcrypt.genSaltSync(10);

    req.body.password = bcrypt.hashSync(password, salt);

    userServices.register(req.body, (error, results)=>{
        if(error){
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: results,
        });
    });
};

exports.login = (reg, res, next)=>{
    const {username, password} = reg.body;

    userServices.login({username, password}, (error, results)=>{
        if(error){
            return next(error);
        }
        return res.status(200).send({
            //message: "Success",
            //data: results,
            access_token: results.token,
            token_type: "token_type",
            expires_in: "1h",
            refresh_token: results.id
        });
    });
};

exports.userProfile = async (req, res, next)=>{
   try{
       const users = await User.find();
       res.json(users);
   }catch(err){
       res.json({message: err});
   }
};
