const router = require("express").Router();
const { addSubmissionType, deleteSubmissionType} = require('../controllers/submissionTypeController')
 
//add new SubmissionType
router.post('/add', addSubmissionType);
 
//delete existing SubmissionType
router.delete('/delete/:id', deleteSubmissionType);
 
module.exports = router;