var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/blog_demo_2", {useNewUrlParser: true});

var Post = require("./models/post");
var User = require("./models/user");

User.create({
    email: "faker@gmail.com",
    name: "faker"
});

Post.create({
    title: "faker pt1",
    content: "faker pt1 content"
}, (err,post) => {
    User.findOne({email: "faker@gmail.com"}, (err, foundUser) => {
        if(err){
            console.log(err);
        } else {
            foundUser.posts.push(post);
            foundUser.save((err, data)=> {
                if(err){
                    console.log(err);
                } else {
                    console.log("****************");
                    console.log(data);
                }
            });
        }
    });
});

User.findOne({email: "faker@gmail.com"}).populate("posts").exec((err,user) =>{
  console.log("======================");
  console.log(user);
});