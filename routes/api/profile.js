const express = required("express");
const router = express.Router();
const passport = require("passport");

//load profile model
const Profile = require("../../models/Profile");
//load user profile
const User = require("../../models/User");
const validateProfileInput = require("../../validation/profile");
const validateVehicleInput = require("../../validation/vehicle");
const validateMaintenanceInput = require("../../validation/maintenance");


//@Route    GET api/profile/test
//@desc     tests profile route
//@access   public

router.get("/test", (req, res) => {
    res.json({
        msg: "profile works"
    })
})


//@Route    GET api/profile
//@desc     get current users profile
//@access   private
router.get(
    '/',
    passport.authenticate('jwt', {
        session: false
    }),
    (req, res) => {
        const errors = {};
        Profile.findOne({
                user: req.user.id
            })
            .populate("user", ["name"])
            .then(profile => {
                if (!profile) {
                    errors.noprofile = "there is no profile for this user"
                    return res.status(404).json(errors)
                }
                res.json(profile);
            })
            .catch(err => res.status(404).json(err))
    }
)

//@Route    GET api/profile/all
//@desc     get all profiles
//@access   public
router.get('/all', (req, res) => {
    errors = {};
    Profile.find()
        .populate('user', ['name'])
        .then(profiles => {
            if (!profiles) {
                errors.noprofiles = "there are no profiles"
                return res.status(404).json(errors)
            }
            res.json(profiles)
        })
        .catch(err => {
            res.status(404).json({
                profile: "there are no profiles"
            })
        })
})

//@route    Get api/profile/username/:username
//@desc     get profile by username
//@access   public
router.get('/username/:username', (req, res) => {
    const errors = {};
    Profile.findOne({
            username: req.user.username
        })
        .then(profile => {
            if (!profile) {
                errors.noprofile = "there is no profile for this user"
                return res.status(404).json(errors);
            } else {
                res.json(profile);
            }
        })
        .catch(error => res.status(404).json(error))
})

//@route    Get api/profile/user/:user_id
//@desc     get profile by user id
//@access   public
router.get('/user/:user_id', (req, res) => {
    const errors = {};
    Profile.findOne({
            user: req.params.user_id
        })
        .populate('user', ['name'])
        .then(profile => {
            if (!profile) {
                errors.noprofile = "there is no profile for this user id"
                res.status(404).json(errors)
            } else {
                res.json(profile)
            }
        })
        .catch(error =>
            res.status(404).json({
                profile: "there is no profile this user id"
            }))
})

//@route    POST api/profile
//@desc     create or edit user profile
//@access   public
router.post(
    "/",
    passport.authenticate("jwt", {
        session: false
    }),
    (req, res) => {
        const {
            errors,
            isValid
        } = validateProfileInput(req.body);
        if (!isValid) {
            return res.status(400).json(errors)
        }
        const profileFields = {};
        profileFields.user = req.user
        if (req.body.username) profileFields.username = req.body.username;
        Profile.findOne({
            user: req.user.id
        }).then(profile => {
            if (profile) {
                Profile.findByIdAndUpdate({
                    user: req.user.id
                }, {
                    $set: profileFields
                }, {
                    new: true
                }).then(profile => res.json(profile))
            } else {
                Profile.findOne({
                    username: profileFields.username
                }).then(profile => {
                    errors.username = "username already exists"
                    res.status(400).json(errors)
                })
                new Profile(profileFields).save().then(profile => res.json(profile))
            }
        })
    }
)