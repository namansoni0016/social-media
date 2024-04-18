import express from "express";
import { config } from "dotenv";
import mongoose from "mongoose";
import ejsMate from "ejs-mate";
import bodyParser from "body-parser";
import methodOverride from "method-override";
import postRoutes from "./routes/postsRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { authenticate } from "./middlewares/authenticate.js";
import cookieParser from "cookie-parser";

const app = express();

config({ path: ".env" });

//Middlewares
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(methodOverride('_method')); 
app.use(cookieParser());
app.use(authenticate);

//For Routes
app.use("/", postRoutes);
app.use("/", userRoutes);

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