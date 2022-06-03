const mongoose = require('mongoose');

const Schema = mongoose.Schema;
 
const MarkingSchema = new Schema({      

    details : {
        type : String,
        required : true
    },

    url: {
        type: String,
        required: false
    },
    
});

const MarkingScheme = mongoose.model("markingScheme",MarkingSchema) 
module.exports = MarkingScheme