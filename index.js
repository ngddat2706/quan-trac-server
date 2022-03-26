const express = require('express')
const morgan = require('morgan')
const unless = require('express-unless')
const mongoose = require('mongoose')
require('dotenv/config');
// const dbConfig = require('./config/db.config')
const auth = require('./middlewares/auth')
const errors = require('./middlewares/errors')

const app = express()

// Connect MongooDB
mongoose.connect(
    process.env.DB_CONNECTION,
).then(
    ()=>{
        console.log('Database connected')
    },
    (error)=>{
        console.log("Database can't be con: " + error);
    }
);

app.use(morgan('combined'))

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

app.use("/oauth2", require("./routes/userRouter.js"));
app.use("/api/Stations", require("./routes/allStationRouter"));
app.use("/api/Values", require("./routes/allValueRouter"));
app.use("/api/fcm", require("./routes/notificationRouter"));

app.use(errors.errorHandler);

const port = process.env.PORT;
app.listen(port, function(){
    console.log("Ready to Go!");
    console.log("Listening on port " + port);
});