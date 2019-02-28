var express = require("express");
var app = express();
var bodyParser = require("body-parser");

//allows usage of body parser (extract information from form inputs)
app.use(bodyParser.urlencoded({extended:true})); 

//allow public folder for CSS to be used
app.use(express.static("public"));

//do not need to include ".ejs" for each rendered file
app.set("view engine", "ejs");

 var friends = ["Tony", "Miranda", "Justin", "Pierre", "Lily"];

app.get("/", function(req, res){
   res.render("home"); 
});

app.get("/friends", function(req, res){
   res.render("friends", {friends: friends}); 
});

app.post("/addfriend", function(req, res){
    var newFriend = req.body.newfriend;
    friends.push(newFriend);
    res.redirect("/friends");
});

app.get("*", function(req, res){
   res.send("Error - this page does not exist."); 
});

//server startup
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has been started.");
});