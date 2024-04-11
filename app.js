import express from "express";
import { config } from "dotenv";

const app = express();

config({ path: ".env" });

app.get("/", (req, res) => {
    res.send("Welcome!!");
})

// Starting Server
const port = process.env.PORT;
app.listen(port, ()=> {
    console.log(`Serving on port: ${port}`);
});