import express from "express";
import { config } from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";

const app = express();

config({ path: ".env" });

//Middlewares
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true })); 

// Creating database
mongoose.connect('mongodb://localhost:27017/socialMedia')
.then(() => {
    console.log("Database connected");
}).catch((error) => {
    console.log("Error connecting to mongodb.", error);
});

// Creating schema
const postSchema = new mongoose.Schema({
    postText: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

//Creating Model
const Post = mongoose.model('Post', postSchema);

app.get("/", async (req, res) => {
    const posts = await Post.find().sort({ createdAt: 'desc'});
    res.render('index', { posts });
});

app.post("/posts", async(req, res) => {
    const newPost = new Post(req.body);
    await newPost.save();
    res.redirect('/');
})

// Starting Server
const port = process.env.PORT;
app.listen(port, ()=> {
    console.log(`Serving on port: ${port}`);
});