import mongoose from 'mongoose';

const tuitSchema = mongoose.Schema({
    _id: String,             // MongoDB ID
    topic: String,           // Topic of the tuit
    username: String,        // Username of the tuit's author
    handle: String,          // Handle of the tuit's author
    time: String,            // Time since tuit was posted
    image: String,           // Image associated with the tuit
    title: String,           // Title of the tuit
    tuit: String,            // Tuit content
    liked: Boolean,          // Whether the tuit is liked or not
    dislikes: Number,        // Number of dislikes
    likes: Number,           // Number of likes
    replies: Number,         // Number of replies
    retuits: Number          // Number of retuits (shares)
}, { collection: 'tuits' });

export default tuitSchema;
