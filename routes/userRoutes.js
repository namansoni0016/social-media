import express from "express";

const router = express.Router();
import { getLogin, 
    getRegister, 
    postRegister, 
    postLogin, 
    logout, 
    getProfile } from "../controllers/userController.js";
import { authenticate } from "../middlewares/authenticate.js";

router.get("/login", getLogin);

router.post("/login", postLogin);

router.get("/register", getRegister);

router.post("/register", postRegister);

router.get('/logout', authenticate, logout);

router.get('/profile', authenticate, getProfile);

export default router;