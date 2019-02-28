//initialization
var express = require("express");
var app = express();

//enable to use css files
app.use(express.static("public"));

//omit the "ejs" tag at the end of the view page names
app.set("view engine", "ejs");

//default route
app.get("/", function(req, res){
   console.log("Root route has been accessed.");
   res.send("something");
});

//animal page
app.get("/animal/:animal", function(req, res){
   console.log("Animal route has been accessed."); 
   var animal = req.params.animal;
   var list = [
      {title: "title 1", author:"author 1", description: "description 1"},
      {title: "title 2", author:"author 2", description: "description 2"},
      {title: "title 3", author:"author 3", description: "description 3"}
   ];
   res.render("animal",  {animal: animal,
                        list: list});
});
                        
//error page
app.get("*", function(req, res){
   res.send("Error! This page does not exist."); 
});

//start server
app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Server has started."); 
});