const router = require("express").Router();
const { addDocument, deleteDocument, updateDocument,viewAllDocument, viewOneDocument } = require('../controllers/documentcontroller.js')
 
//add new product
router.post('/add', addDocument);
 
//delete existing product
router.delete('/delete/:id', deleteDocument);
 
//update product
router.put('/update/:id', updateDocument);
 
//view all products
router.get('/',viewAllDocument);


//view one product
router.get('/one/:id', viewOneDocument);
 
module.exports = router;