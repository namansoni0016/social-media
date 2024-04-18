import express from "express";

const router = express.Router();
import { getLogin, 
    getRegister, 
    postRegister, 
    postLogin, 
    logout } from "../controllers/userController.js";

router.get("/login", getLogin);

router.post("/login", postLogin);

router.get("/register", getRegister);

router.post("/register", postRegister);

router.get('/logout', logout);

export default router;