const fetch = require('node-fetch');

async function notification(callback){
    var notification = {
        "body": "Demo NodeJS",
        "title": "Quan Trắc Online",
        "android_channel_id": "high_importance_channel",
        "image":"https://cdn2.vectorstock.com/i/1000x1000/23/91/small-size-emoticon-vector-9852391.jpg",
        "sound": false
    }
    
    var notification_body = {
        "to":"/topics/All",
        'notification': notification,
    }

    fetch('https://fcm.googleapis.com/fcm/send',{
        'method': 'POST',
        'headers':{
            'Authorization':'key='
            +'AAAABhEExwc:APA91bFYa2iw4UElxpcszVFtBrr2hee9qTN75hY7QgmAW6uUwM1slw40yvPMTw6QpsS4XECc8urCBYbCiUT2G-ChnujnxUemkNBHPpY_IO30pxQ0-dIj8fxxpPuF9-NmvqdZfvRI0m0J',
            'Content-Type': 'application/json',
        },
        'body': JSON.stringify(notification_body)
    }).then(()=>{
        return callback(null);
    }).catch((err)=>{
        callback({
            message: "Some thing went wrong!",
        });
    })
}

module.exports ={
    notification,
}