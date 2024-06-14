const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const getAllUsers = asyncHandler( async ( req, res )=>{
    const userId = req.user._id;
    const allUsers = await User.find({ _id : { $ne : userId }}).select("-password");
    res.json(allUsers);
});

module.exports = getAllUsers;