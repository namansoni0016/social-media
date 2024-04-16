import express from "express";
const router = express.Router();
import { getLogin, 
    getRegister } from "../controllers/userController.js";

router.get("/login", getLogin);

router.get("/register", getRegister);

export default router;