const mongoose = require("mongoose")

module.exports = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imageId: {
        type: String,
    },
    education: {
        type: String
    },
    position: {
        type: String
    },
    workExperience: {
        type: String
    },
    specialistField: {
        type: String
    },
    description: {
        type: String
    }
})
