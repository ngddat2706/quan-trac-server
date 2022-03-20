const fcm = require('../services/notification.service');

exports.fcm = (req, res, next)=>{
    fcm.notification((error)=>{
        if(error){
            return next(error);
        }
        return res.status(200).send({
            Success: "Notification send successfully"
        })
    });
};