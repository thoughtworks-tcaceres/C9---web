var express = require("express");

//express package
var app = express();
//request package
var request = require("request");

//do not require ".ejs" at the end of the render names
app.set("view engine", "ejs");

//search route
app.get("/search", function(req, res){
   res.render("search");
});

//results route
app.get("/results", function(req, res){
   var searchTerm = req.query.searchTerm;
   var url = "http://www.omdbapi.com/?apikey=thewdb&s=" + searchTerm;
   request(url, function(error, response, body){
      if(!error && response.statusCode === 200){
          var parsedData = JSON.parse(body);
          res.render("results", {
                                data: parsedData,
                                searchTerm: searchTerm
                                });
      }
   });
});

//error route
app.get("*", function(req, res){
    res.send("error - this page does not exist");
});

//start server
app.listen(process.env.PORT, process.env.IP, function(){
   console.log("server has started");
});