const mongoose = require("mongoose");
const express = require("express");
require("dotenv").config();

const app = express();
let port = process.env.PORT || 3000;

const dbURI = process.env.CONNECTION_STRING;
const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
};

mongoose
    .connect(dbURI, options)
    .then(() => {
        console.log("Connected!");
    })
    .catch((err) => {
        console.log(err);
    });

var playersSchema = new mongoose.Schema({}, { strict: false });
var Players = mongoose.model("players", playersSchema);

// CORS ERROR RESOLUTION //
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Accept");
    next();
});
// CORS ERROR RESOLUTION //

app.get("/", (req, res) => {
    res.send("Welcome to my API!");
});

app.get("/players", async (req, res) => {
    var data = await Players.find();
    res.send(data);
});

app.listen(port, () => {
    console.log("Server Started!");
});