import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 90,
    },
    body: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 200,
        unique: true,
    }
    
})

const PostModel = mongoose.model("Post", postSchema)

export default PostModel