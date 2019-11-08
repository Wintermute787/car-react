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
