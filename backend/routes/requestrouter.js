const router = require("express").Router();
const { addRequest, viewRequest } = require('../controllers/requestcontroller.js')
const { viewOneRequest } = require('../controllers/requestcontroller.js')

//add new Request
router.post('/add', addRequest);

//view Request
router.get('/:id', viewRequest);

//view one Request
router.get('/view/:id', viewOneRequest);

module.exports = router;