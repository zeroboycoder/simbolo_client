const mongoose = require("mongoose")

module.exports = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    instructorId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    imageId: {
        type: mongoose.Types.ObjectId,
    },
    categoryIds: {
        type: Array
    },
    duration: {
        type: String
    },
    batch: {
        type: Number
    },
    level: {
        type: String
    },
    startDate: {
        type: Date
    },
    fee: {
        type: String
    },
    day: {
        type: Array
    },
    startTime: {
        type: String
    },
    endTime: {
        type: String
    },
    curriculums: {
        type: Array
    },
    descriptionMy: {
        type: String,
    },
    descriptionEng: {
        type: String,
    },
})
