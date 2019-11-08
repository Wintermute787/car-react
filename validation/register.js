const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (
    !validator.isLength(data.name, {
      min: 2,
      max: 30
    })
  ) {
    errors.name = "name must be between 2 and 30 characters";
  }

  if (validator.isEmail(data.name)) {
    errors.name = "name field is required";
  }

  if (validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  if (!validator.isEmail(data.email)) {
    errors.email = "email is invalid";
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "password field is required";
  }

  if (
    !validator.isLength(data.password, {
      min: 6,
      max: 30
    })
  ) {
    errors.password = "password must be between 6 and 30 characters";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
