const mongoose = require('mongoose');

const Schema = mongoose.Schema;
 
const SubmissionType = new Schema({      

    weekName : {
        type : String,
        required : true
    },

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