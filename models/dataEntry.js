const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dataEntrySchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: Array,
    required: false,
  },
  imagePath: {
    // type: String,
    required: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const DataEntry = mongoose.model("DataEntry", dataEntrySchema);
module.exports = DataEntry;
