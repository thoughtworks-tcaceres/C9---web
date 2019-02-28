var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/cat_app", { useNewUrlParser: true });

var catSchema = new mongoose.Schema({
   name: String,
   age: Number,
   temperament: String
});

var Cat = mongoose.model("Cat", catSchema);

Cat.create({
   name: "Snow White",
   age: 15,
   temperament: "Bland"
}, function(err, cat){
    if(err){
        console.log("error");
    } else{
        console.log(cat);
    }
});



// //adding a new cat to the DB
// var newCat = new Cat({
//     name: "pikachu",
//     age: 11,
//     temperament: "Grouchy"
// });

// newCat.save(function(err, cat){
//     if(err){
//         console.log("something went wrong");
//     } else { 
//         console.log("we just saved a cat to the database");
//         console.log(cat);
//     }
// }); 

Cat.find({}, function(err, cats){
    if(err){
        console.log("oh no, error!");
        console.log(err);
    } else {
        console.log("all the cats");
        console.log(cats);
    }
});


//retrieve all cats from the DB and console.log each one