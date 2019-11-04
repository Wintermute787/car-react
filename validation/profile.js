const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data) {
    let errors = {};

    data.username = !isEmpty(data.username) ? data.username : "";

    if (!validator.isLength(data.username, {
            min: 2,
            max: 30
        })) {
        errors.username = "username must be between 2 and 30 characters"
    }

    if (validator.isEmpty(data.username)) {
        errors.username = "username is required"
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}