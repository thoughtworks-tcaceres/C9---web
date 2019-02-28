var express                 = require("express"),
    app                     = express(),
    mongoose                = require("mongoose"),
    passport                = require("passport"),
    bodyParser              = require("body-parser"),
    LocalStrategy           = require("passport-local"),
    passportLocalMongoose   = require("passport-local-mongoose"),
    expressSession          = require("express-session"),
    User                    = require("./models/user");

mongoose.connect("mongodb://localhost:27017/auth_demo_app", {useNewUrlParser:true});
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

app.use(expressSession({
    secret: "team rocket",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//====================
//ROUTES
//====================

app.get("/", (req, res) => {
   res.render("home"); 
});

app.get("/secret", isLoggedIn, (req, res) => {
    res.render("secret");
});

//====================
//AUTH ROUTES
//====================

//show sign up form
app.get("/register", (req, res) => {
    res.render("register");
});

//handling user sign up
app.post("/register", (req, res) => {
   User.register(new User({username: req.body.username}), req.body.password, (err, user) => {
       if(err) {
           console.log(err);
           return res.render("register");
       }
       passport.authenticate("local")(req, res, function() {
           res.redirect("/secret");
       });
   });
});


//LOGIN ROUTES
//render login form
app.get("/login", (req, res) => {
   res.render("login"); 
});

//login logic
app.post("/login", passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
}), (req, res) => {
});

//logout logic
app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

app.listen(process.env.PORT, process.env.IP, function() {
   console.log("server has started ....."); 
});