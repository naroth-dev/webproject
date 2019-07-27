// Declare requirement
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const methodOverride = require("method-override");



// Mongoose Connect
mongoose.connect('mongodb+srv://nararoth:CxEUuAAaC8wCeIuq@cluster0-bbu2l.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true
}).then(() => {
    console.log("Connected to DB!");
}).catch(err => {
    console.log('Error', err.message);
});

// App Configuration
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");

// Schema Setup
var dramaSchema = new mongoose.Schema({
    title: String,
    image: String,
    genre: String,
    noEps: Number,
    cast: String,
    ep: Number,
    epLink: String
});

var dramaList = mongoose.model("dramaList", dramaSchema);


app.get("/", (req, res) => {
    res.render("landing");
});

app.get("/drama", (req, res) => {
    dramaList.find({}, function (err, dramaList) {
        if (err) {
            console.log(err)
        } else {
            res.render("dramaPage", { dramaList: dramaList });
        }
    })

});

app.post("/drama", (req, res) => {
    var title = req.body.title;
    var image = req.body.image;
    var genre = req.body.genre;
    var noEps = req.body.noEps;
    var cast = req.body.cast;
    var ep = req.body.ep;
    var epLink = req.body.epLink;
    var newDrama = { title: title, image: image, genre: genre, noEps: noEps, cast: cast, ep: ep, epLink: epLink };
    dramaList.create(newDrama, (err, newlyCreated) => {
        if (err) {
            console.log(err)
        } else {
            res.redirect("/drama")
        }
    })
});

app.get("/drama/new", (req, res) => {
    res.render("new")
});


app.get("/drama/:title", (req, res) => {
    dramaList.find({ title: req.params.title }, (err, dramaList) => {
        if (err) {
            console.log(err);
        } else {
            console.log(dramaList);
            res.render("show", { dramaList: dramaList });
        };
    });
});


//edit drama routes
app.get("/drama/:title/edit", (req, res) => {
    dramaList.find({ title: req.params.title }, (err, dramaList) => {
        if (err) {
            console.log(err);
        } else {
            console.log(dramaList);
            res.render("edit", { dramaList: dramaList });
        };
    });
});

//Update Route
app.put("/drama/:title", (req, res) => {
    dramaList.update({ title: req.params.title }, {
        $set:
        {
            title: req.body.drama.title,
            image: req.body.drama.image,
            genre: req.body.drama.genre,
            noEps: req.body.drama.noEps,
            cast: req.body.drama.cast,
            ep: req.body.drama.ep,
            epLink: req.body.drama.epLink
        }
    }, (err, updateDrama) => {
        if (err) {
            console.log(err);
        } else {
            console.log(updateDrama);
            res.redirect("/drama")
        };
    });
});

//Delete drama routes
app.delete("/drama/:title", (req, res) => {
    dramaList.findOneAndDelete({ title: req.params.title }, (err, dramaList) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/drama")
        };
    });
});

// watch route
app.get("/drama/:title/:ep", (req, res) => {
    dramaList.find({ title: req.params.title }, (err, dramaList) => {
        if (err) {
            console.log(err);
        } else {
            console.log(dramaList);
            res.render("watch", { dramaList: dramaList });
        };
    });

});



app.listen(3000, process.env.IP, function () {
    console.log("server is running!");
});