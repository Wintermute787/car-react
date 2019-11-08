const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateVehicleInput(data) {
  let errors = {};

  data.make = !isEmpty(data.make) ? data.make : "";
  data.model = !isEmpty(data.model) ? data.model : "";

  if (validator.isEmpty(data.make)) {
    errors.make = "make is required";
  }

  if (validator.isEmpty(data.model)) {
    errors.model = "model is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
