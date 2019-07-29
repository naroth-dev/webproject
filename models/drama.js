const mongoose = require("mongoose");

// Schema Setup
var dramaSchema = new mongoose.Schema({
    title: String,
    image: String,
    genre: String,
    noEps: Number,
    cast: String,
    ep: Number,
    epLink: String,
    epLinks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "epLinks"
        }
    ]
});

module.exports = mongoose.model("dramaList", dramaSchema);