const mongoose = require('mongoose');

const Schema = mongoose.Schema;
 
const DocumentSchema = new Schema({      
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

const Document = mongoose.model("document",DocumentSchema) 
module.exports = Document