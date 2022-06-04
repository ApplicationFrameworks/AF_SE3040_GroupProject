const router = require("express").Router();
const { addTopic, viewAllTopic, updateTopic } = require('../controllers/topiccontroller.js')
 
//add new product
router.post('/add', addTopic);
 
//view all products
router.get('/',viewAllTopic);

router.put('/:id', updateTopic);

 
module.exports = router;