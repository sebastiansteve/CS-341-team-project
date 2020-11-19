const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const User = require('./models/user');

const PORT = process.env.PORT || 5000

const MONGODB_URL = process.env.MONGODB_URL || "mongodb+srv://samhay:artport341@art-portfolio.3l0ic.mongodb.net/portfolio?retryWrites=true&w=majority"

const app = express();

const corsOptions = {
    origin: "https://cs-431-team-project.herokuapp.com/",
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

// Looking to see if there is a user logged in
// app.use((req, res, next) => {
//     if (!req.session.user) {
//       return next();
//     }
//     User.findById(req.session.user._id)
//       .then(user => {
//         req.user = user;
//         next();
//       })
//       .catch(err => console.log(err));
//   });

//connect to routes
const routes = require('./routes/routes');

app.use(express.static(path.join(__dirname, 'public')))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .use(bodyParser({ extended: false }))
    .use('/', routes)
    .use((req, res, next) => {
        res.render('pages/404', { title: '404 - Page Not Found', path: req.url })
    });

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