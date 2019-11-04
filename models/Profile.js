const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const profileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    username: {
        type: String,
        required: true,
        max: 40
    },
    vehicles: [{
        make: {
            type: String,
            required: true
        },
        model: {
            type: String,
            required: true
        },
        miles: {
            type: Number,
            required: true
        }
    }]
})

module.exports = Profile = mongoose.model("profile", profileSchema)