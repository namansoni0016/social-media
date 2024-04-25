import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

export const getLogin = (req, res) => {
    res.render('login');
};

export const postLogin = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});
        if(!user) {
            return res.status(401).send('Invalid Username or Password!');
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if(!validPassword) {
            return res.status(401).send('Invalid Username or Password!');
        }
        const token = jwt.sign({userId: user._id}, 'secret', {expiresIn: '1h'});
        res.cookie('jwt', token, { httpOnly: true, maxAge: 3600000});
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

export const getRegister = (req, res) => {
    res.render('register');
};
export const postRegister = async(req, res) => {
    const { name, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({name, email, password: hashedPassword});
        res.redirect('/login');
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

export const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if(!user) {
            return res.status(404).send('User not found!');
        }
        res.render('profile', {user});
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error!');
    }
}

export const logout = (req, res) => {
    res.clearCookie('jwt');
    res.redirect('/login');
};
