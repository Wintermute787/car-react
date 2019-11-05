const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");
const users = require("./routes/api/users");

const app = express();
require("dotenv").config();

//DB setup
const db = require("./config/keys").mongoURI;
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Mongodb is connected"))
  .catch(err => console.log(err));

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());

//passport middleware
app.use(passport.initialize());
require("./config/passport")(passport);

//routes
app.use("/api/users", users);
//server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server has started on ${port}`));
