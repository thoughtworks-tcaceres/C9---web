//initialization
var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    Campground      = require("./models/campground"),
    Comment         = require("./models/comment"),
    seedDB          = require("./seeds"),
    User            = require("./models/user"),
    flash           = require("connect-flash"),
    methodOverride  = require("method-override"); 

//requiring routes    
var commentRoutes       = require("./routes/comments"),
    campgroundRoutes    = require("./routes/campgrounds"),
    indexRoutes         = require("./routes/index"),
    reviewRoutes = require("./routes/reviews");
    
//connect to mongo DB - yelp_camp DB
mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true});
//in order to use body-parser --> extract information from forms
app.use(bodyParser.urlencoded({extended:true}));

//removal of the ".ejs" for view files
app.set("view engine","ejs");

//public folder for stylesheets
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

app.use(flash());

//seedDB();

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "ned and oliver",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next(); 
});

app.use("/", indexRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/reviews", reviewRoutes);

//start server
app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The \"YelpCamp\" Server has started."); 
});