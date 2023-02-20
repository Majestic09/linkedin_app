
const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    title: String,
    body: String,
    device: String,
    no_if_comments: Number,
    userId : String
    
});

const postModel = mongoose.model("userPost", postSchema);

module.exports = { postModel };