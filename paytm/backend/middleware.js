const { JWT_SECRET } = require('./config');
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) =>{
    const authHeader = req.headers.authorization;
    if(!authHeader){
        return res.status(400).json({message: 'Invalid Token'});
    }
    const token = authHeader.split(' ')[1];
    if(!token){
        return res.status(400).json({message: 'Token is not provided'});
    }
    try{
        const decoded = jwt.verify(token, JWT_SECRET)
        req.userId = decoded.userId;
        next();
    }catch(err){
        return res.status(400).json({message: err});
    }
}

module.exports = {
    authMiddleware
}