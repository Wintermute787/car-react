const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");

const app = express();

//DB setup
const db = require("./config/keys").mongoURI;
mongoose
    .connect(db, {
        useNewUrlParser: true,
        useCreateIndex: true
    })
    .then(() => console.log("Mongodb is connected"))
    .catch(err => console.log(err));

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


//passport middleware
app.use(passport.initialize());
require('./config/passport')(passport)

//routes

//server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server has started on ${port}`))