var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
//var middleware = require("../middleware/index.js")
var middleware = require("../middleware")

router.get("/", function(req, res){
   res.render("landing"); 
});


// ==========
// AUTH ROUTES
// ==========

//show register form
router.get("/register", (req, res) => {
   res.render("register");
});

//handle sign up logic
router.post("/register", (req, res) => {
    var newUser = new User({username: req.body.username});
    var newPassword = req.body.password;
    User.register(newUser, newPassword, (err, user) => {
       if(err){
           req.flash("error", err.message);
           return res.redirect("/register");
       }
       passport.authenticate("local")(req, res, function() {
           req.flash("success", "Welcome to YelpCamp " + user.username);
           res.redirect("/campgrounds"); 
       });
   });
});

//show login form
router.get("/login", (req,res) => {
   res.render("login"); 
});

//handling login logic
router.post("/login", passport.authenticate("local",
    {
        failureRedirect: "/login"
    }) , (req, res) => {
        res.redirect("/campgrounds");
});

//logout route
router.get("/logout", (req,res) => {
   req.logout();
   req.flash("success", "You have been logged out.");
   res.redirect("/campgrounds");
});

module.exports = router;