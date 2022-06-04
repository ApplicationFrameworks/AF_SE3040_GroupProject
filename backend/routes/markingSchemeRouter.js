const router = require("express").Router();
const { addMarkingScheme, deleteMarkingScheme, updateMarkingScheme,viewAllMarkingScheme, viewOneMarkingScheme } = require('../controllers/markingSchemeController')
 
//add new MarkingScheme
router.post('/add', addMarkingScheme);
 
//delete existing MarkingScheme
router.delete('/delete/:id', deleteMarkingScheme);
 
//update MarkingScheme
router.put('/update/:id', updateMarkingScheme);
 
//view all MarkingScheme
router.get('/',viewAllMarkingScheme);


//view one MarkingScheme
router.get('/one/:id', viewOneMarkingScheme);
 
module.exports = router;