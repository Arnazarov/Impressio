import jwt from 'jsonwebtoken';

const createToken = (email, id) => {
    return jwt.sign({email, id}, process.env.JWT_SECRET, {expiresIn: '30d'});
}

export default createToken;