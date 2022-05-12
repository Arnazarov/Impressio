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
    const {firstName, lastName, email, password, confirmPassword } = req.body;

    try {
        const userExists = await User.findOne({email});

        // Check if user exists in the database
        if (userExists) {
            res.status(400).json({message: 'User already exists!'})
        }

        // Check if both paswwords match
        if (password !== confirmPassword) {
            res.status(400).json({message: 'Passwords DO NOT match!'})
        }

        const passwordDecrypted = await bcrypt.hash(password, 10);

        // Create user
        const user = await User.create({
            name: `${firstName} ${lastName}`,
            email,
            password: passwordDecrypted
        })

        if (user) {
            res.status(201).json({
                name: user.name,
                email: user.email,
                id: user._id,
                token: createToken(user.email, user._id)
            })
        } else {
            res.status(400).json({message: 'Invalid user data'})
        }

    } catch(err) {
        console.log(err);
    }
    
}