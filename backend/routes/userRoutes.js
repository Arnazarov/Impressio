import express from "express";
import { loginUser, signupUser } from "../controllers/userController.js";

const router = express.Router();

router.route('/login').post(loginUser);
router.route('/signup').post(signupUser);


export default router;