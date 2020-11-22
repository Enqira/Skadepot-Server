const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dataEntrySchema = new Schema({
    title: {
        type: String,
        required: true
    },
    imageName: {
        type: String,
        required: false
    },
    imagePath: {
        type: String,
        required: false
    },
    date: {
        type: String
    }
    
})

const DataEntry = mongoose.model('DataEntry', dataEntrySchema)
module.exports = DataEntry


