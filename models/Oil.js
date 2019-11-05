const mongoose = require("mongoose");
const Schema = require("Schema");

const oilSchema = new Schema({
  miles: {
    type: Number,
    required: true
  },
  oilType: {
    type: String,
    required: true
  },
  filter: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Oil = mongoose.model("oil", oilSchema);
