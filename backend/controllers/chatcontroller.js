const ChatGroup = require('../models/Chat');

//create chat
exports.createChat = async (req, res) => {
 
    //constant variables for the attributes
    const {group, topic, leader, message, reply} = req.body;

    //object
    const newChat= new ChatGroup({
      //initializing properties
      group,
      topic,
      leader,
      message,
      reply
    })
   
    //saving the object to the db 
    newChat.save().then(() => {
      res.status(200).json({ status: "New Message Added" });
    }).catch((error) => {
      res.status(500).json({message:"Fail to Add Message",error:error.message})
    })
  }

//update chat
exports.updateChat = async (req, res) => {
  if (req.params && req.params.id) {
      const {id} = req.params; //id of the chat
      const chat = req.body;

      const updatedChat = await ChatGroup.findByIdAndUpdate(id, chat, {new: true}); //Find & update
      res.json(updatedChat);
  }
}

//view all chats
exports.viewAllChats = async (req,res) => { 
 
  ChatGroup.find().then((chat) => {
      res.status(200).json(chat)
    }).catch((error) => {
      res.status(500).json({ message: "Error with fetching messages", error: error.message });
    })
  }
   
   
  //view one Chat
  exports.viewOneChat = async (req, res) => {
    let chatId = req.params.id;
  
    await ChatGroup.findById(chatId).then((chat) => {
      res.status(200).json({ status: "Chat fetched", chat });
    }).catch((error) => {
      res.status(500).json({ status: "Error with fetching chat", error: error.message });
    })
  }