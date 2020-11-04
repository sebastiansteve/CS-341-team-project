const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 5000

const MONGODB_URL = process.env.MONGODB_URL || "mongodb+srv://samhay:artport341@art-portfolio.3l0ic.mongodb.net/portfolio?retryWrites=true&w=majority"

const app = express();

const corsOptions = {
    origin: "https://guarded-falls-94352.herokuapp.com/",
    optionSuccessStatus: 200
};
app.use(cors(corsOptions));

const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    family: 4
}

//connect to routes

mongoose
    .connect(
        MONGODB_URL, options
    )
    .then(result => {
        app.listen(PORT);
    })
    .catch(err => {
        console.log(err);
    });