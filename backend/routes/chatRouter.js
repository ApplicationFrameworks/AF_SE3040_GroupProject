const router = require("express").Router();
const { createChat, updateChat,viewAllChats, viewOneChat } = require('../controllers/chatcontroller.js')
 
//add new chat to the forum
router.post('/addchat', createChat);
 
//update message
router.put('/updatechat/:id', updateChat);
 
//view all messages
router.get('/getchats',viewAllChats);


//view one message
router.get('/onechat/:id', viewOneChat);
 
module.exports = router;