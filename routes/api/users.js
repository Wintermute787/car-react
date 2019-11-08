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
  User.findOne({
    email: req.body.email
  }).then(user => {
    if (user) {
      errors.email = "email already exists";
      return res.status(400).json(errors);
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});
//@route    POST api/users/login
//@desc     user login / return JWTtoken
//@access   private
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  //check the validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;
  //find user by email
  User.findOne({
    email
  }).then(user => {
    //check for user
    if (!user) {
      errors.email = "user was not found";
      return res.status(400).json(errors);
    }
    //check password. bcrypt compaire will match the passwords
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        //if the user is matched assign the user payload
        const payload = { id: user.id, name: user.name };
        //create a new signIn token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer" + token
            });
          }
        );
      } else {
        errors.password = "password did not match";
        return res.status(400).json(errors);
      }
    });
  });
});

//@route    GET api/users/current
//@desc     get current user
//@access   private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

module.exports = router;
