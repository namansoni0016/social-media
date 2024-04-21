import { Post } from "../models/postsModel.js";

export const home = async (req, res) => {
    const posts = await Post.find().populate('user').sort({ createdAt: 'desc'});
    res.render('index', { posts });
};

export const getNewPost = (req, res) => {
    res.render('new');
};

export const postNewPost = async(req, res) => {
    try {
        const userId = res.locals.currentUser.userId;
        const newPost = new Post({
            postText: req.body.postText,
            user: userId
        });
        await newPost.save();
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error!')
    }
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