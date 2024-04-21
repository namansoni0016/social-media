import express from "express";
const router = express.Router();
import { home, 
    getNewPost, 
    postNewPost, 
    getEditPost, 
    editPost, 
    deletePost } from "../controllers/postsController.js";
import { authenticate } from "../middlewares/authenticate.js";

router.get("/", authenticate, home);

router.get("/newPost", getNewPost);

router.post("/posts", authenticate, postNewPost);

router.get("/posts/:id/edit", authenticate, getEditPost);

router.put("/posts/:id", authenticate, editPost);

router.delete("/posts/:id", authenticate, deletePost);

export default router;