const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    otpCode: {
        type: Number
    }
})

module.exports = adminSchema;