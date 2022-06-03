const mongoose = require('mongoose');

const Schema = mongoose.Schema;
 
const ResearchDocumentSchema = new Schema({      
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

    url: {
        type: String,
        required: false
    },
    
});

const ResearchDocument = mongoose.model("researchdocument",ResearchDocumentSchema) 
module.exports = ResearchDocument