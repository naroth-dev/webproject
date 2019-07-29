const mongoose = require("mongoose");

// Schema Setup
var epLinksSchema = new mongoose.Schema({
    nos: Number,
    link: String
});

module.exports = mongoose.model("epLinks", epLinksSchema);