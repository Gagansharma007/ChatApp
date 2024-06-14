const Chat = require('../models/chatModel');
const Message = require('../models/messageModel');
const asyncHandler = require('express-async-handler');

const sendMessage = asyncHandler( async ( req, res )=>{
   const { message }  = req.body;
   const { id: receiverId } = req.params;
   const senderId = req.user._id;
   let chat = await Chat.findOne({
    participants : { $all: [ senderId , receiverId ]}
   }) ;
   if( !chat ) {
    chat = await Chat.create({
        participants: [ senderId , receiverId ],
    });
   }
   const newMessage = new Message({
    senderId,
    receiverId,
    message,
   });
   if( newMessage ){
    chat.messages.push(newMessage._id);
   }
   await Promise.all([ chat.save() , newMessage.save()]);
   res.status(201).json(newMessage);
} )
const getMessage = asyncHandler (async ( req, res )=>{
    const { id : userToChatId } = req.params;
    const senderId = req.user._id;
    const chat = await Chat.findOne({
        participants: { $all : [ senderId , userToChatId ]},
    }).populate('messages');
    if( !chat ){
        return res.json([]);
    }
    console.log(chat.messages);
    chat.messages.createdAt = new Date(chat.messages.createdAt).toISOString();
    console.log(chat.messages.createdAt);
    const message = chat.messages;
    res.json(message);
})

module.exports = { sendMessage , getMessage };