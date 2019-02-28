var express = require("express");
var app = express();

/*************
ROUTES
**************/

app.get("/", function(req,res) {
    console.log("root page has been accessed.");
    res.send("root page");
});

app.get("/test", function(req,res) {
    console.log("/test page has been accessed.");
    res.send("/test page");
})

/*************
START SERVER
**************/
app.listen(process.env.PORT, process.env.IP, function() {
   console.log("Server has been started."); 
});
