const mongoose = require('mongoose');

const Schema = mongoose.Schema;
 
const SubmissionType = new Schema({      

    subName : {
        type : String,
        required : true
    },

    details : {
        type : String,
        required : true
    }
    
});

const submissionType = mongoose.model("SubmissionTypes",SubmissionType) 
module.exports = submissionType