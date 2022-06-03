const mongoose = require('mongoose');

const Schema = mongoose.Schema;
 
const EvaluationSchema = new Schema({      

    group : {
        type : String,
        required : true
    },
    
    topic : {
        type : String,
        required : true
    },

    marks : {
        type : String,
        required: true
    },

    url: {
        type: String,
        required: false
    },
    
});

const EvaluationMarks = mongoose.model("EvaluationMarks",EvaluationSchema) 
module.exports = EvaluationMarks