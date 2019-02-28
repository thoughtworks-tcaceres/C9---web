var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
//var middleware = require("../middleware/index.js")
var middleware = require("../middleware")
var Review = require("../models/review");
var Comment = require("../models/review");

//INDEX - show all campgrounds
router.get("/", function(req, res){
    //get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            req.flash("error", "no campgrounds found");
            res.redirect("/");
        }else{
            res.render("campgrounds/index", {campgrounds:allCampgrounds});
        }
    })
});

//CREATE - add new campground to DB
router.post("/", middleware.isLoggedIn, function(req, res){
   //get data from form and add to campgrounds array
   //redirect back to campgrounds page
   var name = req.body.name;
   var image = req.body.image;
   var description = req.body.description;
   var price = req.body.price;
   var author = {
       id: req.user._id,
       username: req.user.username
   }
   var newCampground = {name: name, image: image, description: description, author: author, price: price};
   //create a new campground and save to DB
   Campground.create(newCampground, function(err, newlyCreated){
       if(err){
           req.flash("new campground cannot be created");
           res.redirect("/campgrounds");
       } else{
           res.redirect("/campgrounds/" + newlyCreated._id);
       }
   });
});

//NEW - show form to create new campground 
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("campgrounds/new");
});

//SHOW - shows more info about one campground
router.get("/:id", function(req, res){
    //find the campgroud with provided ID
    Campground.findById(req.params.id).populate("comments").populate({
            path: "reviews",
            options: {sort: {createdAt: -1}}
        }).exec((err, foundCampground) =>{
        if(err || !foundCampground){
            req.flash("error", "campground not found");
            res.redirect("/campgrounds");
        }else{
            //render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

//edit campground route
router.get("/:id/edit", middleware.isLoggedIn, middleware.checkCampgroundOwnership ,function(req, res) {
    res.render("campgrounds/edit", {campground: req.campground});
});

//update campground route
router.put("/:id", middleware.isLoggedIn, middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
            req.flash("error", "Did not update");
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//destroy campground route
router.delete("/:id", middleware.isLoggedIn, middleware.checkCampgroundOwnership, function(req, res){
   Campground.findById(req.params.id, function(err, campground){
       if(err || !campground){
           req.flash("error", "cannot delete");
           res.redirect("/campgrounds");
       } else {
           //delete all comments associated with the campground
           Comment.remove({"_id": {$in: campground.comments}}, function(err){
               if(err){
                   console.log(err);
                   return res.redirect("/campgrounds");
               }
               Review.remove({"_id" : {$in: campground.reviews}}, function(err){
                   if(err){
                       console.log(err);
                       return res.redirect("/campground");
                   }
                   //delete the campground
                   campground.remove();
                   req.flash("success", "Campground deleted successfully!");
                   res.redirect("/campgrounds");
               });
           });
       }
   });
});

module.exports = router;