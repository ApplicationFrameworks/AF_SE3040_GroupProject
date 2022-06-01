const router = require("express").Router();
let Topic = require("../models/Topic");

//add new doc
exports.addTopic = async (req, res) => {
 
    //constant variables for the attributes
    const {group,topic,leader} = req.body;
   
    //object
    const newTopic= new Topic({
      group,
      topic,
      leader,
    })
   
    //saving the object to the db 
    newTopic.save().then(() => {
      res.status(200).json({ status: "New Topic Added" });
    }).catch((error) => {
      res.status(500).json({message:"Fail to Add Item",error:error.message})
    })
  }
  
  
  //view Topic
  exports.viewAllTopic = async (req, res) => { 
   
    //calling Topic model
    Topic.find().then((topic) => {
      res.status(200).json(topic)
    }).catch((error) => {
      res.status(500).json({ message: "Error with fetching topics", error: error.message });
    })
  }
   
  
  
  