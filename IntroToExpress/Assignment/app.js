var express = require("express");
var app = express();

//route for default home page
app.get("/", function (req,res) {
    console.log("/ has been accessed");
    res.send("Hi there, welcome to my assignment!");
});

//route for speak
app.get("/speak/:animal", function (req,res) {
    console.log("/speak has been accessed");

    var sounds = {
        pig: "Oink",
        cat: "Meow",
        dog: "Woof Woof!",
        cow: "Moo"
    }
    var animal = req.params.animal.toLowerCase();
    var animalSound = sounds[animal];
 
    res.send("The " + animal + " says '" + animalSound + "'");
});

//route for repeat
app.get("/repeat/:word/:number", function (req,res) {
   console.log("/repeat has been accessed");
   var word = req.params.word;
   var number = Number(req.params.number);
   var wordToSend = "";
   
   for(var i = 0; i < number; i++) {
       wordToSend = wordToSend + " " + word;
   }
   res.send(wordToSend);
});

//route for non-existant page
app.get("*", function (req,res) {
   res.send("Sorry, page not found...What are you doing with your life?");
});

//start server
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("server has started.");
});