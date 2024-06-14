const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const generateToken = require('../utils/generateToken');
const authUser = asyncHandler( async ( req, res )=>{
    const { username , password } = req.body;
    const user = await User.findOne({ username });
    if( user && ( await user.matchPassword(password))){
        generateToken(res, user._id);
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
        });
    } else {
        res.status(400);
        throw new Error('Invalid username or Password.');
    }
})

const registerUser = asyncHandler( async ( req, res )=>{
    const { username , password , email } = req.body;
    
    if (password.length < 8) {
        res.status(400);
        throw new Error('Password must be at least 8 characters long.');
    }

    const userExists = await User.findOne({ username });
    if( userExists ){
        res.status(400);
        throw new Error('username already Exists. Please try another username.');
    }
    const emailExists = await User.findOne({ email });
    if( emailExists ){
        res.status(400);
        throw new Error('Email already in use.');
    }
    const user = await User.create({
        username,
        email,
        password,
    })
    if( user ){
        generateToken(res, user._id);
        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
        });
    } else {
        res.status(400);
        throw new Error('Invalid User Data.');
    }
});

const logoutUser = ( req, res )=>{
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({message: 'Logged out Successfully.'});
}

module.exports = { authUser , registerUser , logoutUser };