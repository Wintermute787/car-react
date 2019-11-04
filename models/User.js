const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    passport: {
        type: String,
        required: true
    }
});

module.exports = User = mongoose.model("users", userSchema);