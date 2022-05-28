const router = require("express").Router();
const { addVideo, deleteVideo, updateVideo,viewAllVideo, viewOneVideo } = require('../controllers/videoController.js')
 
//Add new Video
router.post('/add', addVideo);
 
//Delete existing Video
router.delete('/delete/:id', deleteVideo);
 
//Update Video
router.put('/update/:id', updateVideo);
 
//View all Video
router.get('/',viewAllVideo);

//View one Video
router.get('/one/:id', viewOneVideo);
 
module.exports = router;