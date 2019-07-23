// Declare requirement
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// Mongoose Connect
mongoose.connect('mongodb+srv://nararoth:Iam@Nararoth1303378@cluster0-5mszq.mongodb.net/test?retryWrites=true&w=majority', {
	useNewUrlParser: true,
	useCreateIndex: true
}).then(()=>{
	console.log("Connected to DB!");
}).catch(err=>{
	console.log('Error',err.message);
});

// App Configuration
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
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

// dramaList.create({
//     title: "Nararoth Tester",
//     image: "https://images.unsplash.com/photo-1563285851-d81750ac22fe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
//     genre: "Sad",
//     noEps: 10,
//     cast: "Nararoth and Naroth"
// }, function(err, dramaList){
//     if(err){
//         console.log(err)
//     } else {
//         console.log("Newly Created!")
//     }
// });

// var dramaList = [
//     {name: "Nararoth", image: "https://images.unsplash.com/photo-1563285851-d81750ac22fe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
//     {name: "Vatey", image: "https://images.unsplash.com/photo-1563285851-d81750ac22fe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
//     {name: "Visal", image: "https://images.unsplash.com/photo-1563285851-d81750ac22fe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
//     {name: "Thearith", image: "https://images.unsplash.com/photo-1563285851-d81750ac22fe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
//     {name: "Thearith", image: "https://images.unsplash.com/photo-1563285851-d81750ac22fe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
//     {name: "Thearith", image: "https://images.unsplash.com/photo-1563285851-d81750ac22fe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
//     {name: "Thearith", image: "https://images.unsplash.com/photo-1563285851-d81750ac22fe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
//     {name: "Thearith", image: "https://images.unsplash.com/photo-1563285851-d81750ac22fe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
//     {name: "Thearith", image: "https://images.unsplash.com/photo-1563285851-d81750ac22fe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
//     {name: "Thearith", image: "https://images.unsplash.com/photo-1563285851-d81750ac22fe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
//     {name: "Flower", image: "https://images.unsplash.com/photo-1563285851-d81750ac22fe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
// ];

app.get("/", (req, res) => {
    res.render("landing");
});

app.get("/drama", (req, res) => {
    dramaList.find({}, function(err, dramaList){
        if(err){
            console.log(err)
        } else {
            res.render("dramaPage", {dramaList: dramaList}); 
        }
    })
   
});

app.post("/drama", (req,res) => {
    var title = req.body.title;
    var image = req.body.image;
    var genre = req.body.genre;
    var noEps = req.body.noEps;
    var cast = req.body.cast;
    var ep = req.body.ep;
    var epLink = req.body.epLink;
    var newDrama = {title: title, image: image, genre: genre, noEps:noEps, cast:cast, ep:ep, epLink:epLink};
    dramaList.create(newDrama, (err, newlyCreated) => {
        if(err){
            console.log(err)
        } else {
            res.redirect("/drama")
        }
    })
});

app.get("/drama/new", (req,res) => {
    res.render("new")
});

// app.get("/drama/:id", (req,res) => {
//     dramaList.findById( req.params.id , function(err, foundDrama){
//         if(err){
//             console.log(err)
//         } else {
//             res.render("show", {foundDrama: foundDrama});
//         }
//     });
    
// });

app.get("/drama/:title", (req,res) => {
    dramaList.find({title: req.params.title}, (err, dramaList) => {
        if(err){
            console.log(err);
        } else {
            console.log(dramaList);
            res.render("show", {dramaList: dramaList}); 
        };
    });
});

app.get("/drama/:title/:ep", (req,res) => {
    res.send("Future Ep")
});

app.listen(3000, process.env.IP, function(){
    console.log("server is running!");
});