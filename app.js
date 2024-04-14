import express from "express";
import { config } from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import methodOverride from "method-override";
import { Post } from "./models/postsModel.js";
import postRoutes from "./routes/postsRoutes.js";

const app = express();

config({ path: ".env" });

//Middlewares
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(methodOverride('_method')); 

//For Routes
app.use("/", postRoutes);

// Creating database
mongoose.connect('mongodb://localhost:27017/socialMedia')
.then(() => {
    console.log("Database connected");
}).catch((error) => {
    console.log("Error connecting to mongodb.", error);
});

// Starting Server
const port = process.env.PORT;
app.listen(port, ()=> {
    console.log(`Serving on port: ${port}`);
});