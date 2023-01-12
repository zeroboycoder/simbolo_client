const mongoose = require("mongoose");

// const uri = "mongodb://localhost:27017/simbolo";
const uri = "mongodb+srv://pyaesonekhant:Pyaesonekhant27@cluster0.fsiexts.mongodb.net/simbolo?retryWrites=true&w=majority";

const connectDB = () => {
    mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true }, err => {
        if (err) console.log("Fail to connect DB")
        else console.log("DB is connected")
    })
}

mongoose.connection.on('error', console.error.bind(console, "Mongoose connect failed"));

module.exports = connectDB