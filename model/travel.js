const mongoose = require("mongoose");
const travelSchema = new mongoose.Schema({
  destination: String,
  startDate: Date,
  endDate: Date,
  activities: Array,
});

const Travel = mongoose.model("travels", travelSchema);

module.exports = Travel;
