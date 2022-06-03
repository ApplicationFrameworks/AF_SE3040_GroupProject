const router = require("express").Router();
const { addDocument, deleteDocument, updateDocument,viewAllDocument, viewOneDocument } = require('../controllers/researchDocController')
 
//add new research document
router.post('/add', addDocument);
 
//delete existing research document
router.delete('/delete/:id', deleteDocument);
 
//update research document
router.put('/update/:id', updateDocument);
 
//view all research documents
router.get('/',viewAllDocument);


//view one research document
router.get('/one/:id', viewOneDocument);
 
module.exports = router;