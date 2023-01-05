const mongoose = require("mongoose")

module.exports = new mongoose.Schema({
    name: { type: String },
    data: { type: String, required: true },
    type: { type: String },
    mimeType: { type: String },
    metadata: { type: Object }
})
