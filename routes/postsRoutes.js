import express from "express";
const router = express.Router();
import { home, 
    getNewPost, 
    postNewPost, 
    getEditPost, 
    editPost, 
    deletePost } from "../controllers/postsController.js";

router.get("/", home);

router.get("/newPost", getNewPost);

router.post("/posts", postNewPost);

router.get("/posts/:id/edit", getEditPost);

router.put("/posts/:id", editPost);

router.delete("/posts/:id", deletePost);

export default router;