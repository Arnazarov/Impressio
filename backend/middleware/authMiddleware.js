import jwt from 'jsonwebtoken';
import User from '../models/userModel.js'

const protectApp = async (req, res, next) => {

    let token, verifiedToken;

    try {
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
            const impressioLogin = token.length < 500; 
            
            if (token && impressioLogin) {
                verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
                const user = await User.findById(verifiedToken.id).select('-password');
                req.userId = user._id;
                next();
            } else if (!impressioLogin) {
                verifiedToken = jwt.decode(token);
                req.userId = verifiedToken.sub;
                next();
            }
        }
               
        if (!token) {
            res.status(401).json({message: 'Not authorized -- token failed'}) 
        }
    } catch(err) {
        console.log(err);
    }
} 

export default protectApp;