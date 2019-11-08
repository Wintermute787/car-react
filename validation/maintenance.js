const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateMaintenanceInput(data) {
  let errors = {};

  data.oilType = !isEmpty(data.oilType) ? data.oilType : "";
  data.filterType = !isEmpty(data.filterType) ? data.filterType : "";
  data.breakType = !isEmpty(data.breakType) ? data.breakType : "";

  if (validator.isEmpty(data.oilType)) {
    errors.oilType = "oil type is required";
  }
  if (validator.isEmpty(data.filterType)) {
    errors.filterType = "filter type is required";
  }
  if (validator.isEmpty(data.breakType)) {
    errors.breakType = "break type is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
