const mongoose = require("mongoose")
const Schema = mongoose.Schema

const dataEntrySchema = new Schema({
  num: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  image: {
    type: Array,
    required: true
  },
  comment: {
    type: String,
    required: false
  },
  date: {
    type: Date,
    default: Date.now
  }
})

const DataEntry = mongoose.model("DataEntry", dataEntrySchema)
module.exports = DataEntry
