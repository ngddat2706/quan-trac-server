const express = require('express')
const morgan = require('morgan')
const unless = require('express-unless')
const mongoose = require('mongoose')

const dbConfig = require('./config/db.config')
const auth = require('./middlewares/auth')
const errors = require('./middlewares/errors')

const app = express()

// Connect MongooDB
mongoose.Promise = global.Promise;
mongoose.connect(
    dbConfig.db,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
).then(
    ()=>{
        console.log('Database connected')
    },
    (error)=>{
        console.log("Database can't be connected: " + error);
    }
);

app.use(morgan('combined'))

auth.authenticateToken.unless = unless;
app.use(
    auth.authenticateToken.unless({
        path:[
            {url: "/oauth2/login", methods: ["POST"]},
            {url: "/oauth2/register", methods: ["POST"]},
        ],
    })
)

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

app.use("/oauth2", require("./routes/users.router"));
app.use("/api/Stations", require("./routes/allstations.router"));
//app.use("/api/Values", require("./routes/allvalues.router"));

app.use(errors.errorHandler);

app.listen(process.env.port || dbConfig.port, function(){
    console.log("Ready to Go!");
});