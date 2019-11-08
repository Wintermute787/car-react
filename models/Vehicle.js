const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vehicleSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  make: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  miles: {
    type: Number
  },
  maintenance: [
    {
      oilType: {
        type: String,
        required: true
      },
      milesAtOilChange: {
        type: Number
      },
      filterType: {
        type: String
      },
      milesAtFilterChange: {
        type: String
      },
      breakType: {
        type: String,
        required: true
      },
      milesAtBreakChange: {
        type: Number
      }
    }
  ]
});

module.exports = Vehicle = mongoose.model("vehicle", vehicleSchema);
