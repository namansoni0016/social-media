import { Post } from "../models/postsModel.js";

export const home = async (req, res) => {
    const posts = await Post.find().sort({ createdAt: 'desc'});
    res.render('index', { posts, currentUser: res.locals.currentUser });
};

export const getNewPost = (req, res) => {
    res.render('new');
};

export const postNewPost = async(req, res) => {
    const newPost = new Post(req.body);
    await newPost.save();
    res.redirect('/');
};

export const getEditPost = async (req, res) => {
    const post = await Post.findById(req.params.id);
    res.render('edit', { post });
};

export const editPost = async (req, res) => {
    await Post.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/');
};

export const deletePost = async (req, res) => {
    await Post.findByIdAndDelete(req.params.id);
    res.redirect("/");
};