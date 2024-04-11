import express from "express";
import { config } from "dotenv";
import mongoose from "mongoose";

const app = express();

config({ path: ".env" });

// Creating database
mongoose.connect('mongodb://localhost:27017/socialMedia')
.then(() => {
    console.log("Database connected");
}).catch((error) => {
    console.log("Error connecting to mongodb.", error);
})

// Creating schema
const postSchema = new mongoose.Schema({
    text: String,
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

//Creating Model
const postModel = mongoose.model('Post', postSchema);

app.get("/", (req, res) => {
    res.send("Welcome!!");
});

// Starting Server
const port = process.env.PORT;
app.listen(port, ()=> {
    console.log(`Serving on port: ${port}`);
});