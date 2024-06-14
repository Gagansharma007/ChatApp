const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const protect = asyncHandler( async ( req, res , next )=>{
    let token;
    token = req.cookies.jwt
    if( token ){
        try{
            const decoded = jwt.verify( token , process.env.JWT_SECRET );
            req.user = await User.findById(decoded.userId).select('-password');
            
            next(); 
        } catch( err ){
            console.error(err);
            res.status(401);
            throw new Error('Not authorized, token failed.');
        }
    } else {
        res.status(401);
        throw new Error('Not authorized, No Token.');
    }
});

module.exports = protect;