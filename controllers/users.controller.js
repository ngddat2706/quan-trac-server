const bcrypt = require("bcryptjs");
const userServices = require("../services/user.service");

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
            message: "Success",
            data: results,
        });
    });
};

exports.userProfile = (req, res, next)=>{
    return res.status(200).json({message: "Authorized User!" });
};