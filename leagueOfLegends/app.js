//initialization
var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    flash       = require("connect-flash"),
    request     = require("request");
    
//in order to use body-parser --> extract information from forms
app.use(bodyParser.urlencoded({extended:true}));

//removal of the ".ejs" for view files
app.set("view engine","ejs");

app.get("/", (req,res) => {
    res.render("index");
});

app.get("/results", (req, res) => {
    var searchterm = req.query.challengerQueue;
    var apiKey = "?api_key=RGAPI-00d1b399-00a3-41f2-9474-8dafc24d17a0";
    var url1 = "https://na1.api.riotgames.com/lol/league/v4/challengerleagues/by-queue/";
    var url = url1 + searchterm + apiKey;
    request(url, (error, response, body) => {
        if(!error && response.statusCode === 200){
            var parsedData = JSON.parse(body);
            console.log(parsedData);
            res.render("results", {
                                    data: parsedData,
                                    searchterm: searchterm
                                    });
        }
    });
});

app.get("*", (req, res) => {
    res.send("error - this page does not exist");
});

//start server
app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The \"League of Legends API\" Server has started."); 
});