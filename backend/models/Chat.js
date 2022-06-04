const mongoose = require('mongoose');

const Schema = mongoose.Schema;
 
const ChatSchema = new Schema({      
    group : {
        type : String,
        required : true
    },
    
    topic : {
        type : String,
        required : true
    },

    leader : {
        type : String,
        required : true
    },

    message: {
        type: String,
        required: true
    },

    reply: {
        type: String,
        required: false
    }
    
});

const Chat = mongoose.model("chat",ChatSchema) 
module.exports = Chat