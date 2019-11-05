const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

//load validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

//@route    Get api/users/test
//@desc     test users route
//@access   public
router.get("/test", (req, res) =>
  res.json({
    msg: "user route works"
  })
);

//@route    POST api/users/register
//@desc     registers a user
//@access   public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  //check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  //check to see if email exists, if it does throw error, if not continue
  User.findOne({
    email: req.body.email
  }).then(user => {
    if (user) {
      errors.email = "email already exists";
      return res.status(400).json(errors);
    } else {
      //create new variable "new user" and store objects from mongoose model into it
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });
      //once user data has been collected, use bcrypt to generate a salt for the password
      bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err;
        //hash the password
        newUser.password = hash;
        //save newUser variable into mongoDB with .save()
        newUser
          .save()
          .then(user => res.json(user))
          .catch(err => console.log(err));
      });
    }
  });
});

module.exports = router;
