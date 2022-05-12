import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true}
}, {timestamps: true});

userSchema.methods.matchPassword = async function(inputPassword) { return await bcrypt.compare(inputPassword, this.password)};

const User = mongoose.model('User', userSchema);

export default User;