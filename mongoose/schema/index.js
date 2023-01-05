const mongoose = require("mongoose");

const models = {
    Admin: mongoose.model("admin", require("./admin")),
    Course: mongoose.model("course", require("./course")),
    Category: mongoose.model("category", require("./category")),
    Instructor: mongoose.model("instructor", require("./instructor")),
    File: mongoose.model("file", require("./file"))
}

module.exports = {
    models
}