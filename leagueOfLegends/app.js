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
    var searchterm = req.query.summonerName;
    var apiKey = "?api_key=*insert key here*";
    var url1 = "https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/";
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