import { Post } from "../models/postsModel.js";
import { User } from "../models/userModel.js";

export const home = async (req, res) => {
    const posts = await Post.find().populate('user').sort({ createdAt: 'desc'});
    const user = await User.findById(req.userId);
    res.render('index', { posts, user });
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
    try {
        const postId = req.params.id;
        const userId = req.userId;
        const post = await Post.findById(postId);
        if(!post) {
            return res.status(404).send('Posts not found!');
        }
        if(post.user._id.toString() !== userId){
            return res.status(403).send('Unauthorized!');
        }
        await Post.findByIdAndUpdate(postId, req.body);
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error!');
    }
};

export const deletePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.userId;
        const post = await Post.findById(postId);
        if(!post) {
            return res.status(404).send('Posts not found!');
        }
        if(post.user._id.toString() !== userId){
            return res.status(403).send('Unauthorized!');
        }
        await Post.findByIdAndDelete(postId);
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error!');
    }
};