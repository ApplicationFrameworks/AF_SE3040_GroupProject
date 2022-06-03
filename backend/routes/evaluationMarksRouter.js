const router = require("express").Router();
const { addEvaluationMarks,viewAllEvaluationMarks, viewOneEvaluationMarks } = require('../controllers/evaluationMarksController')
 
//add new EvaluationMarks
router.post('/add', addEvaluationMarks);
 
//view all EvaluationMarks
router.get('/',viewAllEvaluationMarks);

//view one EvaluationMarks
router.get('/one/:id', viewOneEvaluationMarks);
 
module.exports = router;