const mongoose = require('mongoose');

const Schema = mongoose.Schema;
 
const TopicSchema = new Schema({      
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

    
});

const Topic = mongoose.model("topic",TopicSchema) 
module.exports = Topic