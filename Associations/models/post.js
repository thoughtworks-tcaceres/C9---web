var mongoose = require("mongoose");

// POST - title, content
var postSchema = new mongoose.Schema({
    title: String,
    content: String
});

module.exports = mongoose.model("Post", postSchema);

//---alternate way of dooing it
// var Post = mongoose.model("Post", postSchema);
// module.exports = Post;