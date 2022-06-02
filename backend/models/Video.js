const mongoose = require('mongoose');

const Schema = mongoose.Schema;
 
const VideoSchema = new Schema({      
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

    details : {
        type : String,
        required : true
    },

    url: {
        type: String,
        required: false
    },
    
});

const Video = mongoose.model("video",VideoSchema) 
module.exports = Video