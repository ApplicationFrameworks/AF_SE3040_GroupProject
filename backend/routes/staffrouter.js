const router=require("express").Router();
const { signinStaff, signupStaff, updateStaff, deleteStaff } =require('../controllers/staffcontroller.js');
const { fetchAll, fetchOne} =require('../controllers/staffcontroller.js');

router.post('/signup',signupStaff);

router.post('/signin',signinStaff);

router.put('/update/:id',updateStaff);

router.delete('/delete/:id', deleteStaff);

router.get('/all',fetchAll);

router.get('/all/:id',fetchOne);

module.exports = router;