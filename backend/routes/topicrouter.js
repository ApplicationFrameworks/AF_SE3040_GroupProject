const router = require("express").Router();
const { addTopic, viewAllTopic } = require('../controllers/topiccontroller.js')
 
//add new product
router.post('/add', addTopic);
 
//view all products
router.get('/',viewAllTopic);



 
module.exports = router;