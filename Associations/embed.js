var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/blog_demo", {useNewUrlParser: true});

// POST - title, content
var postSchema = new mongoose.Schema({
    title: String,
    content: String
});
var Post = mongoose.model("Post", postSchema);

// USER - email, name
var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [postSchema]
});
var User = mongoose.model("User", userSchema);

// // EXAMPLE INFORMATION
// var newUser = new User({
//     email: "hermione@gmail.com",
//     name: "Hermione Granger"
// });

// newUser.posts.push({
//   title: "How to brew polyjuice potion",
//   content: "Just kidding. Go to potions class to learn it!"
// });

// newUser.save((err, user) => {
//     if(err){
//         console.log(err);
//     } else {
//         console.log(user);
//     }
// });

// var newPost = new Post({
//     title: "Reflections on apples",
//     content: "they are delicious"
// });

// newPost.save((err,post) => {
//     if(err){
//         console.log(err);
//     } else {
//         console.log(post);
//     }
// });

User.findOne({name: "Hermione Granger"}, (err, user) => {
    if(err){
        console.log(err);
    } else {
        user.posts.push({
            title: "3 things i really hate",
            content: "voldermort, voldermort, voldemort"
        });
        user.save((err,user)=>{
            if(err){
                console.log(err);
        } else {
            console.log(user);
        }
        });
    }
});