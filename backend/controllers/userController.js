import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import createToken from '../utils/createJWT.js';

// @desc    Sign in user
// @route   POST /users/login
// @access  Public
export const loginUser = async (req, res) => {
    const {email, password} = req.body;
    
    try {
        const userExists = await User.findOne({email});

        if (userExists && (await userExists.matchPassword(password))) {
            res.status(200).json({
                name: userExists.name,
                email: userExists.email,
                id: userExists._id,
                token: createToken(userExists.email, userExists._id)
            })
        } else {
            res.status(404).json({message: 'Invalid username or password'})
        }


    } catch(err) {

    }
}

// @desc    Register user
// @route   POST /users/signup
// @access  Public
export const signupUser = async (req, res) => {
    
}