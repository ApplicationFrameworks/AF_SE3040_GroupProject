const router = require("express").Router();
const { addSubmissionType, deleteSubmissionType, viewAllSubmissionType} = require('../controllers/submissionTypeController')
 
//add new SubmissionType
router.post('/add', addSubmissionType);

//get new SubmissionType
router.get('/', viewAllSubmissionType);
 
//delete existing SubmissionType
router.delete('/delete/:id', deleteSubmissionType);
 
module.exports = router;